import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, AlertTriangle, CheckCircle, Droplets, Send } from 'lucide-react';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';
import { EMAIL } from '../constants';

interface Question {
  id: number;
  question: string;
  description: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Does your water feel soft when you wash your hands?",
    description: "Soft water creates a slippery feeling and lathers easily with soap."
  },
  {
    id: 2,
    question: "Are your dishes and glasses spot-free after washing?",
    description: "Hard water leaves white spots and film on dishes and glassware."
  },
  {
    id: 3,
    question: "Is your skin and hair soft after showering?",
    description: "Hard water can leave skin dry and hair dull and brittle."
  },
  {
    id: 4,
    question: "Do your faucets and showerheads stay clean without buildup?",
    description: "Hard water causes white, crusty mineral deposits on fixtures."
  },
  {
    id: 5,
    question: "Does your water heater work efficiently without issues?",
    description: "Hard water causes scale buildup that reduces efficiency and lifespan."
  },
  {
    id: 6,
    question: "Do your clothes stay bright and soft after washing?",
    description: "Hard water makes fabrics stiff and colors fade faster."
  },
  {
    id: 7,
    question: "Is your water free from metallic or unpleasant taste?",
    description: "Hard water often has a mineral or metallic taste."
  }
];

interface FormData {
  name: string;
  phone: string;
  email: string;
}

const WaterQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [showResults, setShowResults] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: ''
  });

  const totalQuestions = questions.length;
  const progress = ((currentStep) / totalQuestions) * 100;
  
  const noCount = Object.values(answers).filter(a => a === false).length;
  const isHighRisk = noCount >= 3;

  const handleAnswer = (answer: boolean) => {
    setAnswers(prev => ({ ...prev, [questions[currentStep].id]: answer }));
    
    if (currentStep < totalQuestions - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Build quiz results summary
      const quizResults = questions.map(q => ({
        question: q.question,
        answer: answers[q.id] ? 'Yes' : 'No'
      }));

      const resultsText = quizResults.map(r => `${r.question}: ${r.answer}`).join('\n');

      // Send email via Web3Forms
      const web3FormData = new FormData();
      web3FormData.append('access_key', 'ae9f9861-8529-4c1f-868b-81da85aa613c');
      web3FormData.append('subject', `Water Quality Quiz Lead - ${isHighRisk ? 'HIGH RISK' : 'Low Risk'} - ${formData.name}`);
      web3FormData.append('from_name', 'PNF Water Heaters Website');
      web3FormData.append('to', EMAIL);
      web3FormData.append('name', formData.name);
      web3FormData.append('phone', formData.phone);
      web3FormData.append('email', formData.email || 'Not provided');
      web3FormData.append('risk_level', isHighRisk ? 'HIGH RISK - Needs Water Softener' : 'Low Risk');
      web3FormData.append('no_answers_count', noCount.toString());
      web3FormData.append('quiz_results', resultsText);
      web3FormData.append('message', `Risk Assessment: ${isHighRisk ? 'HIGH RISK' : 'Low Risk'}\nNo Answers: ${noCount} out of ${totalQuestions}\n\nQuiz Results:\n${resultsText}`);

      const emailResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3FormData
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send');
      }

      // Save to Supabase if configured
      if (supabase) {
        try {
          await supabase
            .from('leads')
            .insert([
              {
                full_name: formData.name,
                phone: formData.phone,
                email: formData.email || null,
                service: 'Water Quality Quiz',
                message: `Risk: ${isHighRisk ? 'HIGH' : 'Low'} | No Answers: ${noCount}/${totalQuestions}`
              }
            ]);
        } catch {
          console.warn('Database save failed');
        }
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setShowForm(false);
    setIsSubmitted(false);
    setFormData({ name: '', phone: '', email: '' });
  };

  // Thank you screen
  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-navy-900 mb-4">Thank You!</h2>
          <p className="text-navy-600 text-lg mb-8">
            Your water quality assessment has been submitted. One of our experts will contact you shortly to discuss solutions for your home.
          </p>
          <button
            onClick={resetQuiz}
            className="text-pnf-red-600 font-semibold hover:underline"
          >
            Take the quiz again
          </button>
        </motion.div>
      </div>
    );
  }

  // Lead capture form after results
  if (showForm) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className={cn(
            "p-6 text-white text-center",
            isHighRisk ? "bg-pnf-red-600" : "bg-amber-500"
          )}>
            {isHighRisk ? (
              <AlertTriangle className="w-12 h-12 mx-auto mb-3" />
            ) : (
              <Droplets className="w-12 h-12 mx-auto mb-3" />
            )}
            <h2 className="text-2xl font-bold">
              {isHighRisk ? "High Risk for Hard Water Problems" : "Confirm Your Water Quality"}
            </h2>
            <p className="text-white/90 mt-2">
              {isHighRisk 
                ? `You answered "No" to ${noCount} questions - a water softener could help.`
                : "A quick professional test reveals what this quiz can't detect."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-navy-900">
                {isHighRisk ? "Get Your Free Water Test" : "Claim Your Free Water Test"}
              </h3>
              <p className="text-navy-600 mt-1">
                {isHighRisk 
                  ? "Enter your details for a free in-home water analysis and custom solution."
                  : "Our technician will test for hardness, chlorine, iron, and other contaminants - all at no cost to you."}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">Full Name</label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:ring-2 focus:ring-pnf-red-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">Phone Number</label>
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                placeholder="(210) 555-0123"
                className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:ring-2 focus:ring-pnf-red-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:ring-2 focus:ring-pnf-red-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pnf-red-600 hover:bg-pnf-red-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Get My Free Water Test</span>
                </>
              )}
            </button>

            <p className="text-xs text-navy-500 text-center">
              By submitting, you agree to be contacted regarding your water quality assessment.
            </p>
          </form>
        </motion.div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className={cn(
            "p-8 md:p-12 text-white text-center",
            isHighRisk ? "bg-gradient-to-br from-pnf-red-600 to-pnf-red-700" : "bg-gradient-to-br from-amber-500 to-amber-600"
          )}>
            {isHighRisk ? (
              <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
            ) : (
              <Droplets className="w-16 h-16 mx-auto mb-4" />
            )}
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              {isHighRisk ? "High Risk" : "Results In"}
            </h2>
            <p className="text-xl text-white/90">
              {isHighRisk
                ? "Your home shows signs of hard water problems"
                : "Only a professional test can confirm your water quality"}
            </p>
          </div>

          <div className="p-6 md:p-8">
            <div className="bg-navy-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-navy-700 font-medium">Your Score</span>
                <span className={cn(
                  "font-bold text-lg",
                  isHighRisk ? "text-pnf-red-600" : "text-amber-600"
                )}>
                  {noCount} / {totalQuestions} potential issues
                </span>
              </div>
              <div className="h-3 bg-navy-200 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    isHighRisk ? "bg-pnf-red-500" : "bg-amber-500"
                  )}
                  style={{ width: `${Math.max((noCount / totalQuestions) * 100, 15)}%` }}
                />
              </div>
              <p className="text-sm text-navy-600 mt-2">
                {isHighRisk
                  ? "3 or more \"No\" answers indicates hard water problems that a water softener can solve."
                  : "Even with good answers, hidden minerals and contaminants can only be detected with professional testing equipment."}
              </p>
            </div>

            {/* Persuasion box - always shown */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <h3 className="font-bold text-navy-900 mb-2">
                {isHighRisk ? "Don't Wait - Hard Water Damage Adds Up" : "Why Get a Free Water Test Anyway?"}
              </h3>
              <ul className="text-sm text-navy-700 space-y-2">
                {isHighRisk ? (
                  <>
                    <li className="flex items-start gap-2">
                      <span className="text-pnf-red-500 font-bold">•</span>
                      Hard water costs homeowners $800+ per year in extra soap, damaged appliances, and energy bills
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pnf-red-500 font-bold">•</span>
                      Scale buildup reduces water heater efficiency by up to 30%
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pnf-red-500 font-bold">•</span>
                      A free test confirms exact hardness levels and the best solution for your home
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      This quiz only measures symptoms - a water test measures actual mineral content
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      San Antonio water averages 15-20 grains of hardness - well above recommended levels
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      Many homeowners don&apos;t notice hard water issues until damage is already done
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      A 5-minute test gives you peace of mind - completely free, no obligation
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-sm font-medium text-navy-700 mb-2">Your Answers:</p>
              {questions.map((q) => (
                <div
                  key={q.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg",
                    answers[q.id] ? "bg-green-50" : "bg-red-50"
                  )}
                >
                  <span className="text-sm text-navy-700 flex-1 pr-4">{q.question}</span>
                  <span className={cn(
                    "text-sm font-semibold shrink-0",
                    answers[q.id] ? "text-green-600" : "text-pnf-red-600"
                  )}>
                    {answers[q.id] ? "Yes" : "No"}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-pnf-red-600 hover:bg-pnf-red-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Droplets className="w-5 h-5" />
              <span>Claim Your Free Water Test</span>
            </button>
            <p className="text-xs text-center text-navy-500 mt-2">
              100% Free - No purchase required - Takes only 5 minutes
            </p>

            <button
              onClick={resetQuiz}
              className="w-full mt-3 text-navy-600 font-medium hover:text-navy-800 py-2"
            >
              Retake Quiz
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Quiz questions
  const currentQuestion = questions[currentStep];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Progress bar */}
        <div className="bg-navy-900 p-4">
          <div className="flex items-center justify-between text-white mb-2">
            <span className="text-sm font-medium">Water Quality Assessment</span>
            <span className="text-sm">
              Question {currentStep + 1} of {totalQuestions}
            </span>
          </div>
          <div className="h-2 bg-navy-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-pnf-red-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center shrink-0">
                  <Droplets className="w-6 h-6 text-navy-600" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-2">
                    {currentQuestion.question}
                  </h2>
                  <p className="text-navy-600">{currentQuestion.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnswer(true)}
                  className={cn(
                    "p-6 rounded-xl border-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]",
                    answers[currentQuestion.id] === true
                      ? "border-green-500 bg-green-50"
                      : "border-navy-200 hover:border-green-400 hover:bg-green-50"
                  )}
                >
                  <CheckCircle className={cn(
                    "w-10 h-10 mx-auto mb-2",
                    answers[currentQuestion.id] === true ? "text-green-500" : "text-navy-400"
                  )} />
                  <span className="text-lg font-bold text-navy-900">Yes</span>
                </button>

                <button
                  onClick={() => handleAnswer(false)}
                  className={cn(
                    "p-6 rounded-xl border-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]",
                    answers[currentQuestion.id] === false
                      ? "border-pnf-red-500 bg-red-50"
                      : "border-navy-200 hover:border-pnf-red-400 hover:bg-red-50"
                  )}
                >
                  <AlertTriangle className={cn(
                    "w-10 h-10 mx-auto mb-2",
                    answers[currentQuestion.id] === false ? "text-pnf-red-500" : "text-navy-400"
                  )} />
                  <span className="text-lg font-bold text-navy-900">No</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-navy-100">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
                currentStep === 0
                  ? "text-navy-300 cursor-not-allowed"
                  : "text-navy-600 hover:bg-navy-100"
              )}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="flex gap-1.5">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all",
                    index === currentStep
                      ? "bg-pnf-red-500 w-6"
                      : index < currentStep
                      ? "bg-navy-400"
                      : "bg-navy-200"
                  )}
                />
              ))}
            </div>

            <button
              onClick={() => currentStep < totalQuestions - 1 && setCurrentStep(prev => prev + 1)}
              disabled={currentStep === totalQuestions - 1 || answers[currentQuestion.id] === undefined}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
                (currentStep === totalQuestions - 1 || answers[currentQuestion.id] === undefined)
                  ? "text-navy-300 cursor-not-allowed"
                  : "text-navy-600 hover:bg-navy-100"
              )}
            >
              Skip
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterQuiz;

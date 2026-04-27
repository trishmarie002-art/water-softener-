import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { supabase } from '../lib/supabase';
import { 
  Home, Briefcase, Image, HelpCircle, Star, LogOut, Save, 
  RotateCcw, Plus, Trash2, AlertCircle, CheckCircle,
  Loader2, Settings, ExternalLink, Info, Phone, MapPin, FileText, Lock
} from 'lucide-react';

type TabType = 'home' | 'about' | 'services' | 'gallery' | 'faq' | 'reviews' | 'contact' | 'service-areas' | 'settings';

interface PageContent {
  id: string;
  page: string;
  section: string;
  content: Record<string, unknown>;
}

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  sort_order: number;
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  sort_order: number;
}

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  sort_order: number;
}

interface Review {
  id: string;
  name: string;
  location: string;
  date: string;
  text: string;
  service: string;
  rating: number;
  sort_order: number;
}

export default function Admin() {
  const { isAuthenticated, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Content state
  const [pageContent, setPageContent] = useState<PageContent[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    if (!supabase) return;
    setIsLoading(true);

    try {
      const [contentRes, servicesRes, galleryRes, faqRes, reviewsRes] = await Promise.all([
        supabase.from('page_content').select('*'),
        supabase.from('services').select('*').order('sort_order'),
        supabase.from('gallery_images').select('*').order('sort_order'),
        supabase.from('faq_items').select('*').order('sort_order'),
        supabase.from('reviews').select('*').order('sort_order'),
      ]);

      if (contentRes.data) setPageContent(contentRes.data);
      if (servicesRes.data) setServices(servicesRes.data);
      if (galleryRes.data) setGalleryImages(galleryRes.data);
      if (faqRes.data) setFaqItems(faqRes.data);
      if (reviewsRes.data) setReviews(reviewsRes.data);
    } catch (error) {
      console.error('Error loading content:', error);
      showNotification('error', 'Failed to load content');
    }

    setIsLoading(false);
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = async () => {
    if (!supabase) return;
    setIsSaving(true);

    try {
      switch (activeTab) {
        case 'home':
        case 'about':
        case 'contact':
        case 'service-areas':
          // Save page content for the current page
          const pageItems = pageContent.filter(p => p.page === activeTab || (activeTab === 'home' && p.page === 'global'));
          for (const item of pageItems) {
            await supabase.from('page_content').upsert(item, { onConflict: 'id' });
          }
          break;
        case 'services':
          await supabase.from('services').delete().neq('id', '');
          if (services.length > 0) {
            await supabase.from('services').insert(services);
          }
          break;
        case 'gallery':
          await supabase.from('gallery_images').delete().neq('id', '00000000-0000-0000-0000-000000000000');
          if (galleryImages.length > 0) {
            await supabase.from('gallery_images').insert(galleryImages.map(img => ({
              src: img.src,
              alt: img.alt,
              category: img.category,
              sort_order: img.sort_order
            })));
          }
          break;
        case 'faq':
          await supabase.from('faq_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
          if (faqItems.length > 0) {
            await supabase.from('faq_items').insert(faqItems.map(item => ({
              category: item.category,
              question: item.question,
              answer: item.answer,
              sort_order: item.sort_order
            })));
          }
          break;
        case 'reviews':
          await supabase.from('reviews').delete().neq('id', '00000000-0000-0000-0000-000000000000');
          if (reviews.length > 0) {
            await supabase.from('reviews').insert(reviews.map(r => ({
              name: r.name,
              location: r.location,
              date: r.date,
              text: r.text,
              service: r.service,
              rating: r.rating,
              sort_order: r.sort_order
            })));
          }
          break;
      }
      showNotification('success', 'Changes saved successfully!');
      await loadContent();
    } catch (error) {
      console.error('Error saving:', error);
      showNotification('error', 'Failed to save changes');
    }

    setIsSaving(false);
  };

  const handleResetToDefault = async () => {
    if (!supabase) return;
    if (!confirm('Are you sure you want to reset this section to default? This will overwrite your current changes.')) {
      return;
    }

    setIsResetting(true);

    try {
      let tableName = '';
      switch (activeTab) {
        case 'home':
        case 'about':
        case 'contact':
        case 'service-areas':
          tableName = 'page_content';
          break;
        case 'services': tableName = 'services'; break;
        case 'gallery': tableName = 'gallery_images'; break;
        case 'faq': tableName = 'faq_items'; break;
        case 'reviews': tableName = 'reviews'; break;
      }

      const { data: defaults } = await supabase
        .from('default_content')
        .select('content')
        .eq('table_name', tableName)
        .single();

      if (defaults && defaults.content) {
        if (tableName === 'page_content') {
          // Only reset content for the current page
          const defaultData = defaults.content as PageContent[];
          const pageDefaults = defaultData.filter(d => d.page === activeTab || (activeTab === 'home' && d.page === 'global'));
          for (const item of pageDefaults) {
            await supabase.from('page_content').upsert(item, { onConflict: 'id' });
          }
        } else {
          await supabase.from(tableName).delete().neq('id', '');
          const defaultData = defaults.content as unknown[];
          if (defaultData.length > 0) {
            await supabase.from(tableName).insert(defaultData);
          }
        }

        await loadContent();
        showNotification('success', 'Reset to default successfully!');
      } else {
        showNotification('error', 'No default content found');
      }
    } catch (error) {
      console.error('Error resetting:', error);
      showNotification('error', 'Failed to reset to default');
    }

    setIsResetting(false);
  };

  const updatePageContent = (id: string, field: string, value: unknown) => {
    setPageContent(prev => 
      prev.map(item => {
        if (item.id === id) {
          return { ...item, content: { ...item.content, [field]: value } };
        }
        return item;
      })
    );
  };

  const handlePasswordChange = async () => {
    if (!supabase) return;
    if (newPassword !== confirmPassword) {
      showNotification('error', 'Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      showNotification('error', 'Password must be at least 6 characters');
      return;
    }

    try {
      await supabase.from('admin_settings').update({ password_hash: newPassword }).eq('id', 1);
      showNotification('success', 'Password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      showNotification('error', 'Failed to update password');
    }
  };

  const tabs = [
    { id: 'home' as TabType, label: 'Home Page', icon: Home },
    { id: 'about' as TabType, label: 'About Page', icon: Info },
    { id: 'services' as TabType, label: 'Services', icon: Briefcase },
    { id: 'gallery' as TabType, label: 'Gallery', icon: Image },
    { id: 'faq' as TabType, label: 'FAQ', icon: HelpCircle },
    { id: 'reviews' as TabType, label: 'Reviews', icon: Star },
    { id: 'contact' as TabType, label: 'Contact', icon: Phone },
    { id: 'service-areas' as TabType, label: 'Service Areas', icon: MapPin },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Site
              </a>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Action Buttons */}
            {activeTab !== 'settings' && (
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleSave}
                  disabled={isSaving || isLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={handleResetToDefault}
                  disabled={isResetting || isLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {isResetting ? <Loader2 className="w-5 h-5 animate-spin" /> : <RotateCcw className="w-5 h-5" />}
                  {isResetting ? 'Resetting...' : 'Reset to Default'}
                </button>
              </div>
            )}
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                {activeTab === 'home' && (
                  <HomePageEditor content={pageContent} onUpdate={updatePageContent} />
                )}
                {activeTab === 'about' && (
                  <AboutPageEditor content={pageContent} onUpdate={updatePageContent} />
                )}
                {activeTab === 'services' && (
                  <ServicesEditor services={services} setServices={setServices} />
                )}
                {activeTab === 'gallery' && (
                  <GalleryEditor images={galleryImages} setImages={setGalleryImages} />
                )}
                {activeTab === 'faq' && (
                  <FAQEditor items={faqItems} setItems={setFaqItems} />
                )}
                {activeTab === 'reviews' && (
                  <ReviewsEditor reviews={reviews} setReviews={setReviews} />
                )}
                {activeTab === 'contact' && (
                  <ContactPageEditor content={pageContent} onUpdate={updatePageContent} />
                )}
                {activeTab === 'service-areas' && (
                  <ServiceAreasEditor content={pageContent} onUpdate={updatePageContent} />
                )}
                {activeTab === 'settings' && (
                  <SettingsEditor 
                    newPassword={newPassword}
                    confirmPassword={confirmPassword}
                    setNewPassword={setNewPassword}
                    setConfirmPassword={setConfirmPassword}
                    onPasswordChange={handlePasswordChange}
                  />
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// Home Page Editor
function HomePageEditor({ content, onUpdate }: { content: PageContent[]; onUpdate: (id: string, field: string, value: unknown) => void }) {
  const heroContent = content.find(c => c.id === 'hero');
  const trustBadges = content.find(c => c.id === 'trust_badges');
  const problemSection = content.find(c => c.id === 'problem_section');
  const statsSection = content.find(c => c.id === 'stats_section');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Home Page Content</h2>
        <p className="text-gray-600">Edit the content on your home page including the hero section, trust badges, and more.</p>
      </div>

      {/* Hero Section */}
      {heroContent && (
        <ContentSection title="Hero Section">
          <div className="space-y-4">
            <InputField
              label="Badge Text"
              value={(heroContent.content.badge as string) || ''}
              onChange={(v) => onUpdate('hero', 'badge', v)}
            />
            <TextAreaField
              label="Headline (HTML supported)"
              value={(heroContent.content.headline as string) || ''}
              onChange={(v) => onUpdate('hero', 'headline', v)}
              rows={2}
            />
            <TextAreaField
              label="Subheadline"
              value={(heroContent.content.subheadline as string) || ''}
              onChange={(v) => onUpdate('hero', 'subheadline', v)}
              rows={3}
            />
            <TextAreaField
              label="Features (one per line)"
              value={Array.isArray(heroContent.content.features) ? (heroContent.content.features as string[]).join('\n') : ''}
              onChange={(v) => onUpdate('hero', 'features', v.split('\n').filter(f => f.trim()))}
              rows={4}
            />
            <TextAreaField
              label="Hero Images (one URL per line)"
              value={Array.isArray(heroContent.content.images) ? (heroContent.content.images as string[]).join('\n') : ''}
              onChange={(v) => onUpdate('hero', 'images', v.split('\n').filter(f => f.trim()))}
              rows={4}
              mono
            />
          </div>
        </ContentSection>
      )}

      {/* Trust Badges */}
      {trustBadges && (
        <ContentSection title="Trust Badges">
          <TextAreaField
            label="Trust Badge Items (one per line)"
            value={Array.isArray(trustBadges.content.items) ? (trustBadges.content.items as string[]).join('\n') : ''}
            onChange={(v) => onUpdate('trust_badges', 'items', v.split('\n').filter(f => f.trim()))}
            rows={4}
          />
        </ContentSection>
      )}

      {/* Problem Section */}
      {problemSection && (
        <ContentSection title="Problem Section (Hard Water Issues)">
          <div className="space-y-4">
            <InputField
              label="Section Title"
              value={(problemSection.content.title as string) || ''}
              onChange={(v) => onUpdate('problem_section', 'title', v)}
            />
            <TextAreaField
              label="Description"
              value={(problemSection.content.description as string) || ''}
              onChange={(v) => onUpdate('problem_section', 'description', v)}
              rows={3}
            />
          </div>
        </ContentSection>
      )}

      {/* Stats Section */}
      {statsSection && (
        <ContentSection title="Statistics Section">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Stat 1 Value"
              value={(statsSection.content.stat1_value as string) || ''}
              onChange={(v) => onUpdate('stats_section', 'stat1_value', v)}
            />
            <InputField
              label="Stat 1 Label"
              value={(statsSection.content.stat1_label as string) || ''}
              onChange={(v) => onUpdate('stats_section', 'stat1_label', v)}
            />
            <InputField
              label="Stat 2 Value"
              value={(statsSection.content.stat2_value as string) || ''}
              onChange={(v) => onUpdate('stats_section', 'stat2_value', v)}
            />
            <InputField
              label="Stat 2 Label"
              value={(statsSection.content.stat2_label as string) || ''}
              onChange={(v) => onUpdate('stats_section', 'stat2_label', v)}
            />
            <InputField
              label="Stat 3 Value"
              value={(statsSection.content.stat3_value as string) || ''}
              onChange={(v) => onUpdate('stats_section', 'stat3_value', v)}
            />
            <InputField
              label="Stat 3 Label"
              value={(statsSection.content.stat3_label as string) || ''}
              onChange={(v) => onUpdate('stats_section', 'stat3_label', v)}
            />
          </div>
        </ContentSection>
      )}

      {content.filter(c => c.page === 'home' || c.page === 'global').length === 0 && (
        <EmptyState message="No home page content found. The database may need to be seeded with default content." />
      )}
    </div>
  );
}

// About Page Editor
function AboutPageEditor({ content, onUpdate }: { content: PageContent[]; onUpdate: (id: string, field: string, value: unknown) => void }) {
  const aboutHero = content.find(c => c.id === 'about_hero');
  const aboutStory = content.find(c => c.id === 'about_story');
  const aboutMission = content.find(c => c.id === 'about_mission');
  const aboutTeam = content.find(c => c.id === 'about_team');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">About Page Content</h2>
        <p className="text-gray-600">Edit the content on your about page.</p>
      </div>

      {aboutHero && (
        <ContentSection title="Hero Section">
          <div className="space-y-4">
            <InputField
              label="Page Title"
              value={(aboutHero.content.title as string) || ''}
              onChange={(v) => onUpdate('about_hero', 'title', v)}
            />
            <TextAreaField
              label="Subtitle"
              value={(aboutHero.content.subtitle as string) || ''}
              onChange={(v) => onUpdate('about_hero', 'subtitle', v)}
              rows={2}
            />
          </div>
        </ContentSection>
      )}

      {aboutStory && (
        <ContentSection title="Our Story">
          <div className="space-y-4">
            <InputField
              label="Section Title"
              value={(aboutStory.content.title as string) || ''}
              onChange={(v) => onUpdate('about_story', 'title', v)}
            />
            <TextAreaField
              label="Story Content (HTML supported)"
              value={(aboutStory.content.content as string) || ''}
              onChange={(v) => onUpdate('about_story', 'content', v)}
              rows={6}
            />
            <InputField
              label="Image URL"
              value={(aboutStory.content.image as string) || ''}
              onChange={(v) => onUpdate('about_story', 'image', v)}
            />
          </div>
        </ContentSection>
      )}

      {aboutMission && (
        <ContentSection title="Mission & Values">
          <div className="space-y-4">
            <InputField
              label="Mission Title"
              value={(aboutMission.content.title as string) || ''}
              onChange={(v) => onUpdate('about_mission', 'title', v)}
            />
            <TextAreaField
              label="Mission Statement"
              value={(aboutMission.content.mission as string) || ''}
              onChange={(v) => onUpdate('about_mission', 'mission', v)}
              rows={3}
            />
            <TextAreaField
              label="Values (one per line)"
              value={Array.isArray(aboutMission.content.values) ? (aboutMission.content.values as string[]).join('\n') : ''}
              onChange={(v) => onUpdate('about_mission', 'values', v.split('\n').filter(f => f.trim()))}
              rows={4}
            />
          </div>
        </ContentSection>
      )}

      {aboutTeam && (
        <ContentSection title="Team Section">
          <div className="space-y-4">
            <InputField
              label="Section Title"
              value={(aboutTeam.content.title as string) || ''}
              onChange={(v) => onUpdate('about_team', 'title', v)}
            />
            <TextAreaField
              label="Team Description"
              value={(aboutTeam.content.description as string) || ''}
              onChange={(v) => onUpdate('about_team', 'description', v)}
              rows={3}
            />
          </div>
        </ContentSection>
      )}

      {content.filter(c => c.page === 'about').length === 0 && (
        <EmptyState message="No about page content found. The database may need to be seeded with default content." />
      )}
    </div>
  );
}

// Contact Page Editor
function ContactPageEditor({ content, onUpdate }: { content: PageContent[]; onUpdate: (id: string, field: string, value: unknown) => void }) {
  const contactInfo = content.find(c => c.id === 'contact_info');
  const contactHero = content.find(c => c.id === 'contact_hero');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Contact Page Content</h2>
        <p className="text-gray-600">Edit your contact information and page content.</p>
      </div>

      {contactHero && (
        <ContentSection title="Page Header">
          <div className="space-y-4">
            <InputField
              label="Page Title"
              value={(contactHero.content.title as string) || ''}
              onChange={(v) => onUpdate('contact_hero', 'title', v)}
            />
            <TextAreaField
              label="Subtitle"
              value={(contactHero.content.subtitle as string) || ''}
              onChange={(v) => onUpdate('contact_hero', 'subtitle', v)}
              rows={2}
            />
          </div>
        </ContentSection>
      )}

      {contactInfo && (
        <ContentSection title="Contact Information">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Phone Display"
              value={(contactInfo.content.phone as string) || ''}
              onChange={(v) => onUpdate('contact_info', 'phone', v)}
            />
            <InputField
              label="Phone Raw (digits only)"
              value={(contactInfo.content.phone_raw as string) || ''}
              onChange={(v) => onUpdate('contact_info', 'phone_raw', v)}
            />
            <div className="col-span-2">
              <InputField
                label="Email Address"
                value={(contactInfo.content.email as string) || ''}
                onChange={(v) => onUpdate('contact_info', 'email', v)}
              />
            </div>
            <div className="col-span-2">
              <InputField
                label="Address"
                value={(contactInfo.content.address as string) || ''}
                onChange={(v) => onUpdate('contact_info', 'address', v)}
              />
            </div>
            <InputField
              label="Business Hours"
              value={(contactInfo.content.hours as string) || ''}
              onChange={(v) => onUpdate('contact_info', 'hours', v)}
            />
            <InputField
              label="Emergency Hours"
              value={(contactInfo.content.emergency_hours as string) || ''}
              onChange={(v) => onUpdate('contact_info', 'emergency_hours', v)}
            />
          </div>
        </ContentSection>
      )}

      {content.filter(c => c.page === 'contact' || c.id === 'contact_info').length === 0 && (
        <EmptyState message="No contact page content found. The database may need to be seeded with default content." />
      )}
    </div>
  );
}

// Service Areas Editor
function ServiceAreasEditor({ content, onUpdate }: { content: PageContent[]; onUpdate: (id: string, field: string, value: unknown) => void }) {
  const serviceAreasContent = content.find(c => c.id === 'service_areas');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Service Areas</h2>
        <p className="text-gray-600">Edit the list of areas you serve.</p>
      </div>

      {serviceAreasContent && (
        <ContentSection title="Service Areas List">
          <div className="space-y-4">
            <InputField
              label="Section Title"
              value={(serviceAreasContent.content.title as string) || ''}
              onChange={(v) => onUpdate('service_areas', 'title', v)}
            />
            <TextAreaField
              label="Description"
              value={(serviceAreasContent.content.description as string) || ''}
              onChange={(v) => onUpdate('service_areas', 'description', v)}
              rows={2}
            />
            <TextAreaField
              label="Areas (one per line)"
              value={Array.isArray(serviceAreasContent.content.areas) ? (serviceAreasContent.content.areas as string[]).join('\n') : ''}
              onChange={(v) => onUpdate('service_areas', 'areas', v.split('\n').filter(f => f.trim()))}
              rows={10}
            />
          </div>
        </ContentSection>
      )}

      {content.filter(c => c.page === 'service-areas').length === 0 && (
        <EmptyState message="No service areas content found. The database may need to be seeded with default content." />
      )}
    </div>
  );
}

// Services Editor
function ServicesEditor({ services, setServices }: { services: Service[]; setServices: React.Dispatch<React.SetStateAction<Service[]>> }) {
  const addService = () => {
    setServices([...services, {
      id: `service-${Date.now()}`,
      title: 'New Service',
      description: 'Service description',
      features: ['Feature 1'],
      image: '/placeholder.svg?height=400&width=600',
      sort_order: services.length + 1,
    }]);
  };

  const updateService = (id: string, field: keyof Service, value: unknown) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Services</h2>
          <p className="text-gray-600">Manage your service offerings.</p>
        </div>
        <button
          onClick={addService}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Service ID"
                    value={service.id}
                    onChange={(v) => updateService(service.id, 'id', v)}
                  />
                  <InputField
                    label="Sort Order"
                    value={service.sort_order.toString()}
                    onChange={(v) => updateService(service.id, 'sort_order', parseInt(v) || 0)}
                    type="number"
                  />
                </div>
                <InputField
                  label="Title"
                  value={service.title}
                  onChange={(v) => updateService(service.id, 'title', v)}
                />
                <TextAreaField
                  label="Description"
                  value={service.description}
                  onChange={(v) => updateService(service.id, 'description', v)}
                  rows={3}
                />
                <TextAreaField
                  label="Features (one per line)"
                  value={service.features.join('\n')}
                  onChange={(v) => updateService(service.id, 'features', v.split('\n').filter(f => f.trim()))}
                  rows={4}
                />
                <InputField
                  label="Image URL"
                  value={service.image}
                  onChange={(v) => updateService(service.id, 'image', v)}
                />
              </div>
              <button
                onClick={() => removeService(service.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <EmptyState message="No services yet. Click 'Add Service' to create one." />
      )}
    </div>
  );
}

// Gallery Editor
function GalleryEditor({ images, setImages }: { images: GalleryImage[]; setImages: React.Dispatch<React.SetStateAction<GalleryImage[]>> }) {
  const addImage = () => {
    setImages([...images, {
      id: `image-${Date.now()}`,
      src: '/placeholder.svg?height=400&width=400',
      alt: 'New image',
      category: 'General',
      sort_order: images.length + 1,
    }]);
  };

  const updateImage = (id: string, field: keyof GalleryImage, value: unknown) => {
    setImages(images.map(img => img.id === id ? { ...img, [field]: value } : img));
  };

  const removeImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Gallery</h2>
          <p className="text-gray-600">Manage your gallery images.</p>
        </div>
        <button
          onClick={addImage}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((image) => (
          <div key={image.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex gap-4">
              <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg?height=100&width=100'; }}
                />
              </div>
              <div className="flex-1 space-y-2">
                <InputField
                  label="Image URL"
                  value={image.src}
                  onChange={(v) => updateImage(image.id, 'src', v)}
                  small
                />
                <InputField
                  label="Alt Text"
                  value={image.alt}
                  onChange={(v) => updateImage(image.id, 'alt', v)}
                  small
                />
                <div className="flex gap-2">
                  <div className="flex-1">
                    <InputField
                      label="Category"
                      value={image.category}
                      onChange={(v) => updateImage(image.id, 'category', v)}
                      small
                    />
                  </div>
                  <button
                    onClick={() => removeImage(image.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors self-end"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <EmptyState message="No gallery images yet. Click 'Add Image' to create one." />
      )}
    </div>
  );
}

// FAQ Editor
function FAQEditor({ items, setItems }: { items: FAQItem[]; setItems: React.Dispatch<React.SetStateAction<FAQItem[]>> }) {
  const addItem = () => {
    setItems([...items, {
      id: `faq-${Date.now()}`,
      category: 'General',
      question: 'New question?',
      answer: 'Answer here...',
      sort_order: items.length + 1,
    }]);
  };

  const updateItem = (id: string, field: keyof FAQItem, value: unknown) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const categories = [...new Set(items.map(item => item.category))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">FAQ</h2>
          <p className="text-gray-600">Manage frequently asked questions.</p>
        </div>
        <button
          onClick={addItem}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Question
        </button>
      </div>

      {categories.map(category => (
        <div key={category} className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">{category}</h3>
          {items.filter(item => item.category === category).map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <InputField
                      label="Category"
                      value={item.category}
                      onChange={(v) => updateItem(item.id, 'category', v)}
                      small
                    />
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <InputField
                  label="Question"
                  value={item.question}
                  onChange={(v) => updateItem(item.id, 'question', v)}
                />
                <TextAreaField
                  label="Answer"
                  value={item.answer}
                  onChange={(v) => updateItem(item.id, 'answer', v)}
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      ))}

      {items.length === 0 && (
        <EmptyState message="No FAQ items yet. Click 'Add Question' to create one." />
      )}
    </div>
  );
}

// Reviews Editor
function ReviewsEditor({ reviews, setReviews }: { reviews: Review[]; setReviews: React.Dispatch<React.SetStateAction<Review[]>> }) {
  const addReview = () => {
    setReviews([...reviews, {
      id: `review-${Date.now()}`,
      name: 'New Customer',
      location: 'San Antonio',
      date: 'Just now',
      text: 'Review text here...',
      service: 'General',
      rating: 5,
      sort_order: reviews.length + 1,
    }]);
  };

  const updateReview = (id: string, field: keyof Review, value: unknown) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const removeReview = (id: string) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
          <p className="text-gray-600">Manage customer reviews.</p>
        </div>
        <button
          onClick={addReview}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Review
        </button>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <InputField
                    label="Customer Name"
                    value={review.name}
                    onChange={(v) => updateReview(review.id, 'name', v)}
                  />
                  <InputField
                    label="Location"
                    value={review.location}
                    onChange={(v) => updateReview(review.id, 'location', v)}
                  />
                  <InputField
                    label="Date"
                    value={review.date}
                    onChange={(v) => updateReview(review.id, 'date', v)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Service"
                    value={review.service}
                    onChange={(v) => updateReview(review.id, 'service', v)}
                  />
                  <InputField
                    label="Rating (1-5)"
                    value={review.rating.toString()}
                    onChange={(v) => updateReview(review.id, 'rating', parseInt(v) || 5)}
                    type="number"
                  />
                </div>
                <TextAreaField
                  label="Review Text"
                  value={review.text}
                  onChange={(v) => updateReview(review.id, 'text', v)}
                  rows={3}
                />
              </div>
              <button
                onClick={() => removeReview(review.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <EmptyState message="No reviews yet. Click 'Add Review' to create one." />
      )}
    </div>
  );
}

// Settings Editor
function SettingsEditor({ 
  newPassword, 
  confirmPassword, 
  setNewPassword, 
  setConfirmPassword, 
  onPasswordChange 
}: { 
  newPassword: string;
  confirmPassword: string;
  setNewPassword: (v: string) => void;
  setConfirmPassword: (v: string) => void;
  onPasswordChange: () => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Settings</h2>
        <p className="text-gray-600">Manage your admin panel settings.</p>
      </div>

      <ContentSection title="Change Admin Password">
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter new password"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm new password"
              />
            </div>
          </div>
          <button
            onClick={onPasswordChange}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Update Password
          </button>
        </div>
      </ContentSection>
    </div>
  );
}

// Helper Components
function ContentSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function InputField({ 
  label, 
  value, 
  onChange, 
  type = 'text',
  small = false,
  mono = false
}: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void;
  type?: string;
  small?: boolean;
  mono?: boolean;
}) {
  return (
    <div>
      <label className={`block font-medium text-gray-700 mb-1 ${small ? 'text-xs' : 'text-sm'}`}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${small ? 'text-sm py-1.5' : ''} ${mono ? 'font-mono text-sm' : ''}`}
      />
    </div>
  );
}

function TextAreaField({ 
  label, 
  value, 
  onChange, 
  rows = 3,
  mono = false
}: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void;
  rows?: number;
  mono?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${mono ? 'font-mono text-sm' : ''}`}
      />
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-lg">
      <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
      <p>{message}</p>
    </div>
  );
}

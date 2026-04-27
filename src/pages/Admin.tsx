import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { supabase } from '../lib/supabase';
import { 
  Home, Briefcase, Image, HelpCircle, Star, LogOut, Save, 
  RotateCcw, Plus, Trash2, AlertCircle, CheckCircle,
  Loader2, Settings, ExternalLink
} from 'lucide-react';

type TabType = 'general' | 'services' | 'gallery' | 'faq' | 'reviews';

interface SiteContentRow {
  id: string;
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
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Content state
  const [siteContent, setSiteContent] = useState<SiteContentRow[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        supabase.from('site_content').select('*'),
        supabase.from('services').select('*').order('sort_order'),
        supabase.from('gallery_images').select('*').order('sort_order'),
        supabase.from('faq_items').select('*').order('sort_order'),
        supabase.from('reviews').select('*').order('sort_order'),
      ]);

      if (contentRes.data) setSiteContent(contentRes.data);
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
        case 'general':
          for (const item of siteContent) {
            await supabase.from('site_content').upsert(item, { onConflict: 'id' });
          }
          break;
        case 'services':
          // Delete all and re-insert
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
      // Reload content to get fresh data with new IDs
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
        case 'general': tableName = 'site_content'; break;
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
        // Delete current data
        await supabase.from(tableName).delete().neq('id', '');
        
        // Insert default data
        const defaultData = defaults.content as unknown[];
        if (defaultData.length > 0) {
          await supabase.from(tableName).insert(defaultData);
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

  const updateSiteContent = (id: string, field: string, value: unknown) => {
    setSiteContent(prev => 
      prev.map(item => {
        if (item.id === id) {
          return { ...item, content: { ...item.content, [field]: value } };
        }
        return item;
      })
    );
  };

  const tabs = [
    { id: 'general' as TabType, label: 'General', icon: Home },
    { id: 'services' as TabType, label: 'Services', icon: Briefcase },
    { id: 'gallery' as TabType, label: 'Gallery', icon: Image },
    { id: 'faq' as TabType, label: 'FAQ', icon: HelpCircle },
    { id: 'reviews' as TabType, label: 'Reviews', icon: Star },
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
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                {activeTab === 'general' && (
                  <GeneralEditor content={siteContent} onUpdate={updateSiteContent} />
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
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// General Content Editor
function GeneralEditor({ content, onUpdate }: { content: SiteContentRow[]; onUpdate: (id: string, field: string, value: unknown) => void }) {
  const heroContent = content.find(c => c.id === 'hero');
  const contactContent = content.find(c => c.id === 'contact_info');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">General Content</h2>
        <p className="text-gray-600 mb-6">Edit the main text content across your website. Changes will reflect in real-time after saving.</p>
      </div>

      {heroContent && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Hero Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
              <input
                type="text"
                value={(heroContent.content.badge as string) || ''}
                onChange={(e) => onUpdate('hero', 'badge', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Headline (HTML supported)</label>
              <textarea
                value={(heroContent.content.headline as string) || ''}
                onChange={(e) => onUpdate('hero', 'headline', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subheadline (HTML supported)</label>
              <textarea
                value={(heroContent.content.subheadline as string) || ''}
                onChange={(e) => onUpdate('hero', 'subheadline', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Features (one per line)</label>
              <textarea
                value={Array.isArray(heroContent.content.features) ? (heroContent.content.features as string[]).join('\n') : ''}
                onChange={(e) => onUpdate('hero', 'features', e.target.value.split('\n').filter(f => f.trim()))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Images (one URL per line)</label>
              <textarea
                value={Array.isArray(heroContent.content.images) ? (heroContent.content.images as string[]).join('\n') : ''}
                onChange={(e) => onUpdate('hero', 'images', e.target.value.split('\n').filter(f => f.trim()))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {contactContent && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Display</label>
              <input
                type="text"
                value={(contactContent.content.phone as string) || ''}
                onChange={(e) => onUpdate('contact_info', 'phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Raw (digits only)</label>
              <input
                type="text"
                value={(contactContent.content.phoneRaw as string) || ''}
                onChange={(e) => onUpdate('contact_info', 'phoneRaw', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={(contactContent.content.email as string) || ''}
                onChange={(e) => onUpdate('contact_info', 'email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {content.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No content found. Run the database seed script to initialize default content.</p>
        </div>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service ID</label>
                    <input
                      type="text"
                      value={service.id}
                      onChange={(e) => updateService(service.id, 'id', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., water-softeners"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                    <input
                      type="number"
                      value={service.sort_order}
                      onChange={(e) => updateService(service.id, 'sort_order', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => updateService(service.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={service.description}
                    onChange={(e) => updateService(service.id, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={service.image}
                    onChange={(e) => updateService(service.id, 'image', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Features (one per line)</label>
                  <textarea
                    value={service.features.join('\n')}
                    onChange={(e) => updateService(service.id, 'features', e.target.value.split('\n').filter(f => f.trim()))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={() => removeService(service.id)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Gallery Editor
function GalleryEditor({ images, setImages }: { images: GalleryImage[]; setImages: React.Dispatch<React.SetStateAction<GalleryImage[]>> }) {
  const addImage = () => {
    setImages([...images, {
      id: crypto.randomUUID(),
      src: '/placeholder.svg?height=400&width=600',
      alt: 'New Image',
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
          <p className="text-gray-600">Manage your project gallery images.</p>
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
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg?height=400&width=600'; }}
              />
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={image.src}
                  onChange={(e) => updateImage(image.id, 'src', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                <input
                  type="text"
                  value={image.alt}
                  onChange={(e) => updateImage(image.id, 'alt', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={image.category}
                    onChange={(e) => updateImage(image.id, 'category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={image.sort_order}
                    onChange={(e) => updateImage(image.id, 'sort_order', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={() => removeImage(image.id)}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Remove Image
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// FAQ Editor
function FAQEditor({ items, setItems }: { items: FAQItem[]; setItems: React.Dispatch<React.SetStateAction<FAQItem[]>> }) {
  const addItem = () => {
    setItems([...items, {
      id: crypto.randomUUID(),
      category: 'General',
      question: 'New Question',
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

  const categories = [...new Set(items.map(i => i.category))];

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

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                      type="text"
                      value={item.category}
                      onChange={(e) => updateItem(item.id, 'category', e.target.value)}
                      list="faq-categories"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <datalist id="faq-categories">
                      {categories.map(cat => <option key={cat} value={cat} />)}
                    </datalist>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                    <input
                      type="number"
                      value={item.sort_order}
                      onChange={(e) => updateItem(item.id, 'sort_order', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) => updateItem(item.id, 'question', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                  <textarea
                    value={item.answer}
                    onChange={(e) => updateItem(item.id, 'answer', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Reviews Editor
function ReviewsEditor({ reviews, setReviews }: { reviews: Review[]; setReviews: React.Dispatch<React.SetStateAction<Review[]>> }) {
  const addReview = () => {
    setReviews([...reviews, {
      id: crypto.randomUUID(),
      name: 'New Customer',
      location: 'San Antonio',
      date: 'Just now',
      text: 'Review text here...',
      service: 'Water Softener',
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
          <p className="text-gray-600">Manage customer reviews and testimonials.</p>
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
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={review.name}
                      onChange={(e) => updateReview(review.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={review.location}
                      onChange={(e) => updateReview(review.id, 'location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="text"
                      value={review.date}
                      onChange={(e) => updateReview(review.id, 'date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 2 weeks ago"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review Text</label>
                  <textarea
                    value={review.text}
                    onChange={(e) => updateReview(review.id, 'text', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                    <input
                      type="text"
                      value={review.service}
                      onChange={(e) => updateReview(review.id, 'service', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <select
                      value={review.rating}
                      onChange={(e) => updateReview(review.id, 'rating', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {[5, 4, 3, 2, 1].map(n => (
                        <option key={n} value={n}>{n} Star{n !== 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                    <input
                      type="number"
                      value={review.sort_order}
                      onChange={(e) => updateReview(review.id, 'sort_order', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeReview(review.id)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

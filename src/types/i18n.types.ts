/**
 * Dil Tipleri
 * 
 * Tüm çeviri sisteminin tip güvenliğini sağlar.
 * Yeni bir dil eklendiğinde burada tanımlanmalıdır.
 */

// Desteklenen diller
export type Locale = 'tr' | 'en';

// Navigation menü öğeleri
export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

/**
 * Proje Detaylı Bilgi Tipi
 * Proje modalında gösterilecek detaylı içerik
 */
export interface ProjectDetailedInfo {
  overview: string;
  features: string[];
  techDetails: Record<string, string[]>;
  learningOutcomes: string[];
}

/**
 * Proje Verisi Tipi
 * Her bir proje için tüm bilgileri içerir
 */
export interface ProjectData {
  key: string;
  title: string;
  description: string[];
  categories: string[];
  technologies: string[];
  youtubeUrl?: string;
  images: string[];
  demoUrl?: string | null;
  githubUrl?: string | null;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  detailedInfo: ProjectDetailedInfo;
}

// Çeviri yapısı - Tüm dillerdeki içerik
export interface Translations {
  // Genel metinler
  common: {
    loading: string;
    error: string;
    retry: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    close: string;
    submit: string;
  };
  
  // Navigation - AppBar için
  navigation: {
    home: string;
    education: string;
    projects: string;
    skills: string;
    experience: string;
    personalInfo: string;
  };
  
  // Sayfa başlıkları
  pageTitle: {
    home: string;
    education: string;
    projects: string;
    skills: string;
    experience: string;
    personalInfo: string;
  };
  
  // Sayfa açıklamaları (SEO için)
  pageDescription: {
    home: string;
    education: string;
    projects: string;
    skills: string;
    experience: string;
    personalInfo: string;
  };

  /** Ana sayfa kartları ve buton metinleri */
  home: {
    name: string;
    subtitle: string;
    explore: string;
    cards: {
      personalInfo: string;
      experience: string;
      projects: string;
      skills: string;
      education: string;
    };
  };

  // Eğitim bilgileri
  education: {
    current: string;
    completed: string;
    achievements: string;
    schools: Array<{
      degree: string;
      school: string;
      period: string;
      location: string;
      status: string;
      description: string;
      achievements: string[];
    }>;
  };

  // İş deneyimi bilgileri
  experience: {
    responsibilities: string;
    technologies: string;
    positions: Array<{
      title: string;
      company: string;
      period: string;
      location: string;
      type: 'internship' | 'competition' | 'freelance' | 'fulltime';
      description: string[];
      technologies: string[];
    }>;
  };

  // Kişisel bilgiler sayfası
  personalInfo: {
    aboutMe: string;
    name: string;
    title: string;
    bio: string;
    socialLinks: string;
    contactInfo: string;
    email: string;
    phone: string;
    contactMe: string;
    contactDescription: string;
    downloadCV: string;
    sendMessage: string;
    emailSubject: string;
    emailBody: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      subjectPlaceholder: string;
      messagePlaceholder: string;
    };
  };

  // Projeler sayfası
  projects: {
    viewProject: string;
    sourceCode: string;
    liveDemo: string;
    technologies: string;
    status: string;
    category: string;
    allProjects: string;
    filterByCategory: string;
    clickToViewDetails: string;
    viewDetails: string;
    modal: {
      overview: string;
      features: string;
      techDetails: string;
      learningOutcomes: string;
    };
    statusLabels: {
      completed: string;
      inProgress: string;
      planned: string;
    };
    categoryLabels: {
      web: string;
      backend: string;
      mobile: string;
      all: string;
    };
    projectData: Record<string, ProjectData>;
    projectList: Array<{
      title: string;
      description: string;
      longDescription?: string;
      category: string;
      technologies: string[];
      status: string;
      github?: string;
      demo?: string;
      image?: string;
      highlights?: string[];
    }>;
  };

  /** Skills page */
  skills: {
    sectionTitles: {
      allSkills: string;
    };
    categories: SkillCategory[];
  };
}

/**
 * Skill Kategorisi Tipi
 */
export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: Skill[];
}

/**
 * Tekil Skill Tipi
 */
export interface Skill {
  name: string;
}

// Dil sözlüğü tipi
export type TranslationDictionary = Record<Locale, Translations>;

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const SECTION_IDS = NAV_ITEMS.map((n) => n.href.slice(1));

export const PROFILE = {
  name: 'Udit Gurjar',
  title: 'Android App Developer',
  location: 'Indore, M.P.',
  phone: '+91 9685295771',
  phoneHref: 'tel:+919685295771',
  email: 'uditpatidar009@gmail.com',
  emailHref: 'mailto:uditpatidar009@gmail.com',
  linkedin: 'https://linkedin.com/in/udit-gurjar-98a39b294',
  linkedinLabel: 'linkedin.com/in/udit-gurjar-98a39b294',
  tagline:
    'Results-driven Android Developer building scalable, production-grade mobile apps using Kotlin, Java & Jetpack Compose.',
  roles: ['Android Developer', 'Kotlin Enthusiast', 'Mobile App Builder'],
};

export interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: 20, suffix: '+', label: 'Bugs Resolved' },
  { value: 15, suffix: '%', label: 'Crash-Rate Improvement' },
  { value: 4, suffix: '+', label: 'Live Projects' },
  { value: 1, suffix: '+', label: 'Years Experience' },
];

export interface SkillGroup {
  category: string;
  icon: string; // lucide icon name
  skills: { name: string; icon: string }[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Languages',
    icon: 'Code2',
    skills: [
      { name: 'Kotlin', icon: 'K' },
      { name: 'Java', icon: 'J' },
      { name: 'C', icon: 'C' },
    ],
  },
  {
    category: 'Android',
    icon: 'Smartphone',
    skills: [
      { name: 'Jetpack Compose', icon: 'Jetpack' },
      { name: 'XML', icon: 'XML' },
      { name: 'ViewPager2', icon: 'Layers' },
      { name: 'ExoPlayer', icon: 'Play' },
      { name: 'Data Binding', icon: 'Link' },
    ],
  },
  {
    category: 'Architecture',
    icon: 'Building2',
    skills: [
      { name: 'MVVM', icon: 'MVVM' },
      { name: 'MVC', icon: 'MVC' },
      { name: 'Clean Architecture', icon: 'Clean' },
    ],
  },
  {
    category: 'Networking',
    icon: 'Network',
    skills: [
      { name: 'Retrofit', icon: 'Retrofit' },
      { name: 'REST API', icon: 'API' },
      { name: 'JSON', icon: 'JSON' },
      { name: 'Postman', icon: 'Postman' },
    ],
  },
  {
    category: 'Database',
    icon: 'Database',
    skills: [
      { name: 'SQLite', icon: 'SQLite' },
      { name: 'Room', icon: 'Room' },
    ],
  },
  {
    category: 'Tools',
    icon: 'Wrench',
    skills: [
      { name: 'Android Studio', icon: 'AS' },
      { name: 'Git / GitHub', icon: 'Git' },
      { name: 'Firebase Auth', icon: 'Firebase' },
      { name: 'Gradle', icon: 'Gradle' },
      { name: 'Socket.io', icon: 'Socket' },
      { name: 'Stream SDK', icon: 'Stream' },
      { name: 'Cashfree', icon: 'Cashfree' },
    ],
  },
];

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Dollop Infotech Pvt. Ltd.',
    role: 'Android App Developer',
    period: 'Dec 2024 – Present',
    location: 'Indore, M.P.',
    points: [
      'Resolved 20+ production bugs and improved app crash-rate by 15% through systematic stabilization and defensive coding.',
      'Implemented local persistence with Room and SQLite, enabling offline-first features and faster data access.',
      'Collaborated with the design team on UI/UX refinements that lifted user engagement by 10%.',
      'Applied MVVM and MVC clean-code practices to keep modules testable, modular, and easy to maintain.',
    ],
  },
];

export interface Project {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  category: string;
  icon: string; // lucide icon name
  accent: string; // tailwind gradient classes
}

export const PROJECTS: Project[] = [
  {
    name: 'Open Network',
    tagline: 'Networking & marketplace app',
    description:
      'Real-time chat and video calls powered by Socket.io and Stream SDK, with Cashfree payments and a full booking system wrapped in a Jetpack Compose UI.',
    tags: ['Kotlin', 'Jetpack Compose', 'Socket.io', 'Stream SDK', 'Cashfree'],
    category: 'Marketplace',
    icon: 'Network',
    accent: 'from-android-400 to-emerald-500',
  },
  {
    name: 'VestorGrow',
    tagline: 'Social media app',
    description:
      'Complete auth flow with OTP verification, multi-image and video uploads, smooth ExoPlayer playback, and Retrofit-driven networking throughout.',
    tags: ['Kotlin', 'ExoPlayer', 'Retrofit', 'OTP Auth'],
    category: 'Social',
    icon: 'Users',
    accent: 'from-electric-400 to-blue-500',
  },
  {
    name: 'Carguu',
    tagline: 'Logistics & shipping user app',
    description:
      'Google Places API for address search, Firebase Auth for onboarding, and a custom camera and image picker for shipment documentation.',
    tags: ['Kotlin', 'Google Places API', 'Firebase Auth', 'Camera'],
    category: 'Logistics',
    icon: 'Truck',
    accent: 'from-amber-400 to-orange-500',
  },
  {
    name: 'NinjaMap',
    tagline: 'Location & navigation app',
    description:
      'Real-time location tracking with turn-by-turn navigation, built on an MVC architecture with OTP-based authentication for secure access.',
    tags: ['Java', 'MVC', 'Maps', 'OTP Auth'],
    category: 'Navigation',
    icon: 'MapPin',
    accent: 'from-rose-400 to-pink-500',
  },
];

export interface EducationItem {
  degree: string;
  org: string;
  period: string;
  detail: string;
}

export const EDUCATION: EducationItem[] = [
  {
    degree: 'Bachelor of Computer Applications (BCA) — In Progress',
    org: 'Makhanlal Chaturvedi National University, Bhopal',
    period: '2023 – Expected June 2026',
    detail: 'Building strong foundations in software development, data structures, and application engineering.',
  },
  {
    degree: 'Senior Secondary (12th)',
    org: 'MP Board',
    period: '2022 – 2023',
    detail: 'Completed with 70% — focused on computer science and mathematics fundamentals.',
  },
];

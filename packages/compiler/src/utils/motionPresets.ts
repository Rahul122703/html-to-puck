import type { MotionConfig, MotionPreset } from "../types";

export const COMPONENT_MOTION: Record<string, keyof typeof MOTION_PRESETS> = {
  // Layout
  section: "fade",
  container: "fade",
  grid: "fade",
  column: "fade",
  row: "fade",
  stack: "fade",

  // Content
  hero: "fadeUp",
  heading: "fadeUp",
  title: "fadeUp",
  subtitle: "fadeUp",
  text: "fade",
  paragraph: "fade",
  description: "fade",
  badge: "fadeDown",

  // Cards
  card: "fadeUp",
  feature: "fadeUp",
  featureCard: "fadeUp",
  pricingCard: "fadeUp",
  testimonial: "fadeUp",
  teamMember: "fadeUp",

  // Images
  image: "zoomIn",
  gallery: "fadeUp",
  galleryItem: "zoomIn",
  logo: "fade",
  avatar: "zoomIn",

  // Buttons
  button: "fadeUp",
  cta: "fadeUp",
  iconButton: "fade",

  // Navigation
  navbar: "fadeDown",
  nav: "fadeDown",
  menu: "fadeDown",
  mobileMenu: "slideRight",
  breadcrumb: "fade",

  // Forms
  form: "fadeUp",
  input: "fade",
  textarea: "fade",
  select: "fade",
  checkbox: "fade",
  radio: "fade",
  switch: "fade",

  // Marketing
  stats: "fadeUp",
  stat: "fadeUp",
  timeline: "slideUp",
  faq: "slideUp",
  accordion: "slideUp",
  tabs: "fade",
  pricing: "fadeUp",

  // Media
  video: "fade",
  iframe: "fade",
  map: "fade",

  // Footer
  footer: "fade",
  copyright: "fade",

  // Misc
  icon: "zoomIn",
  divider: "fade",
  spacer: "none",
};

export const DEFAULT_ANIMATE: MotionConfig["animate"] = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  rotate: 0,
  blur: 0,
};

export const DEFAULT_TRANSITION: MotionConfig["transition"] = {
  duration: 0.6,
  easing: "ease-out",
};

export const MOTION_PRESETS: Record<string, MotionPreset> = {
  fadeUp: {
    initial: {
      opacity: 0,
      y: 40,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  },

  fadeDown: {
    initial: {
      opacity: 0,
      y: -40,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  },

  fadeLeft: {
    initial: {
      opacity: 0,
      x: -40,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
  },

  fadeRight: {
    initial: {
      opacity: 0,
      x: 40,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
  },

  zoomIn: {
    initial: {
      opacity: 0,
      scale: 0.9,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
  },

  rotateIn: {
    initial: {
      opacity: 0,
      rotate: -15,
    },
    animate: {
      opacity: 1,
      rotate: 0,
    },
  },

  blurIn: {
    initial: {
      opacity: 0,
      blur: 8,
    },
    animate: {
      opacity: 1,
      blur: 0,
    },
  },
};

// data/projects.js
var PROJECTS_DATA = [
  // --- iOS Projects ---
  {
    id: "lingua-quest",
    title: "Lingua Quest",
    tagline: "Gamified AI-Powered Language Learning App",
    category: "ios",
    featured: true,
    badges: ["iOS", "SwiftUI", "Clean Architecture", "AI"],
    themeColor: "#98C1D9",
    githubUrl: "https://github.com/Emad-Ayad",
    youtubeUrl: "",
    coverImage: "assets/projects/lingua-quest/1.png",
    gallery: [
      "assets/projects/lingua-quest/1.png",
      "assets/projects/lingua-quest/6.png",
      "assets/projects/lingua-quest/9.png",
      "assets/projects/lingua-quest/10.png",
      "assets/projects/lingua-quest/13.png"
    ],
    techStack: ["Swift", "SwiftUI", "Clean Architecture", "Swinject DI", "REST APIs", "WebSockets", "Gemini AI", "DeepSeek"],
    summary: "A gamified, AI-powered language-learning iOS app featuring real-time voice role-play, AI word insights, image validation, and a localized, rewards-based UI.",
    highlights: [
      "Built real-time voice role-play with AI.",
      "Integrated AI word insights and image validation.",
      "Developed a localized, rewards-based user interface."
    ],
    architecture: {
      pattern: "Clean Architecture",
      layers: "Presentation (SwiftUI) -> Domain (UseCases) -> Data (Repositories, API, AI)",
      keyDecisions: "Utilized Swinject for Dependency Injection, WebSockets for real-time interactions, and Clean Architecture for testability and separation of concerns."
    }
  },
  {
    id: "drape",
    title: "Drape",
    tagline: "Modern E-Commerce iOS Application",
    category: "ios",
    featured: true,
    badges: ["iOS", "SwiftUI", "SwiftData", "Firebase"],
    themeColor: "#EE6C4D",
    githubUrl: "https://github.com/Emad-Ayad",
    youtubeUrl: "",
    coverImage: "assets/projects/drape/title.webp",
    gallery: ["assets/projects/drape/title.webp"],
    techStack: ["Swift", "SwiftUI", "Clean Architecture", "Shopify API", "Firebase Auth", "SwiftData"],
    summary: "An e-commerce iOS app featuring product browsing, filtering, infinite scroll, and a favorites system, complete with a full checkout flow.",
    highlights: [
      "Developed a full checkout flow with address management and draft order carts.",
      "Integrated Paymob for secure payment processing.",
      "Implemented infinite scroll and real-time filtering for product browsing."
    ],
    architecture: {
      pattern: "Clean Architecture",
      layers: "Presentation (SwiftUI) -> Domain -> Data (Shopify API, SwiftData, Firebase)",
      keyDecisions: "Leveraged SwiftData for local persistence and Shopify API for e-commerce integration."
    }
  },
  {
    id: "leegoo",
    title: "Leegoo",
    tagline: "Sports Application with Responsive Layouts",
    category: "ios",
    featured: false,
    badges: ["iOS", "UIKit", "MVP", "Core Data"],
    themeColor: "#3D5A80",
    githubUrl: "https://github.com/Emad-Ayad",
    youtubeUrl: "",
    coverImage: "assets/projects/leegoo/page.PNG",
    gallery: [
      "assets/projects/leegoo/page.PNG",
      "assets/projects/leegoo/page1.PNG",
      "assets/projects/leegoo/page2.PNG"
    ],
    techStack: ["Swift", "UIKit", "MVP", "Core Data", "REST APIs", "Auto Layout"],
    summary: "A Swift/UIKit sports app with responsive layouts, reusable UI components, and a user-friendly experience.",
    highlights: [
      "Built reusable UI components for responsive layouts using Auto Layout.",
      "Implemented MVP architecture to ensure maintainability.",
      "Integrated Core Data for local data persistence and REST APIs for remote data."
    ],
    architecture: {
      pattern: "MVP (Model-View-Presenter)",
      layers: "View (UIKit) <-> Presenter <-> Model (Core Data, API)",
      keyDecisions: "Chose MVP over MVC to improve testability of UIKit components."
    }
  },
  
  // --- Flutter Projects ---
  {
    id: "honeycomp",
    title: "HoneyComp",
    tagline: "Feature-First Clean Architecture E-commerce App",
    category: "flutter",
    featured: true,
    badges: ["Flutter", "Clean Architecture", "Bloc (Cubit)"],
    themeColor: "#f59e0b", // Amber/Honey color
    githubUrl: "https://github.com/Emad-Ayad",
    youtubeUrl: "",
    coverImage: "assets/projects/honeycomp/title.webp",
    gallery: ["assets/projects/honeycomp/title.webp"],
    techStack: ["Flutter", "Dart", "Bloc (Cubit)", "Firebase Auth", "Cloud Firestore", "Get-it", "Paymob"],
    summary: "An e-commerce app for selling honey products featuring seamless payment integration and real-time database syncing.",
    highlights: [
      "Built with a feature-first Clean Architecture approach for highly scalable code.",
      "Integrated Paymob for secure and reliable payment processing.",
      "Implemented Bloc (Cubit) for predictable state management."
    ],
    architecture: {
      pattern: "Feature-First Clean Architecture",
      layers: "Presentation (Bloc/UI) -> Domain (Entities/Use Cases) -> Data (Repositories/DataSources)",
      keyDecisions: "Utilized Get-it for dependency injection and separated features into isolated modules."
    }
  },
  {
    id: "event-booker",
    title: "Event-Booker",
    tagline: "Event Discovery & Booking App",
    category: "flutter",
    featured: true,
    badges: ["Flutter", "Dio", "SQLite", "Bloc"],
    themeColor: "#8b5cf6", // Purple
    githubUrl: "https://github.com/Emad-Ayad",
    youtubeUrl: "",
    coverImage: "assets/projects/event-booker/title.webp",
    gallery: ["assets/projects/event-booker/title.webp"],
    techStack: ["Flutter", "Bloc (Cubit)", "Dio", "Ticketmaster API", "SQLite", "Secure Storage"],
    summary: "An event discovery and booking mobile app using the Ticketmaster API with robust local storage and session handling.",
    highlights: [
      "Integrated Ticketmaster API using the Dio package for network requests.",
      "Implemented SQLite for fast local storage and offline capabilities.",
      "Managed user sessions safely using Secure Storage."
    ],
    architecture: {
      pattern: "Bloc Pattern",
      layers: "UI -> Cubit -> Repository -> API/Database",
      keyDecisions: "Chose Dio over Http for advanced interceptors and global error handling."
    }
  },
  {
    id: "chitchat",
    title: "ChitChat",
    tagline: "Real-time Messaging App",
    category: "flutter",
    featured: false,
    badges: ["Flutter", "Firebase", "Firestore"],
    themeColor: "#10b981", // Emerald
    githubUrl: "https://github.com/Emad-Ayad",
    youtubeUrl: "",
    coverImage: "assets/projects/chitchat/title.webp",
    gallery: ["assets/projects/chitchat/title.webp"],
    techStack: ["Flutter", "Firebase Authentication", "Cloud Firestore", "Bloc (Cubit)"],
    summary: "A ChatApp featuring real-time messaging, secure user authentication, and responsive state management.",
    highlights: [
      "Designed and implemented real-time messaging using Cloud Firestore.",
      "Integrated Firebase Authentication for secure user sign-up and login.",
      "Used Bloc (Cubit) to efficiently manage chat and user states."
    ],
    architecture: {
      pattern: "Bloc Pattern",
      layers: "UI -> Cubit -> Firebase Services",
      keyDecisions: "Relied on Firestore's real-time streams paired with Cubit to instantly update the UI."
    }
  },
  {
    id: "bookwormhub",
    title: "BookWormHub",
    tagline: "Free Programming Books Explorer",
    category: "flutter",
    featured: false,
    badges: ["Flutter", "API Integration", "Get-it"],
    themeColor: "#3b82f6", // Blue
    githubUrl: "https://github.com/Emad-Ayad",
    youtubeUrl: "",
    coverImage: "assets/projects/bookwormhub/title.webp",
    gallery: ["assets/projects/bookwormhub/title.webp"],
    techStack: ["Flutter", "Dio", "Bloc (Cubit)", "Get-it"],
    summary: "An app for discovering and viewing free Google programming books via external API integration.",
    highlights: [
      "Fetched and parsed book data using the Dio package for API integration.",
      "Managed application state smoothly with Bloc (Cubit).",
      "Structured dependency injection cleanly using Get-it."
    ],
    architecture: {
      pattern: "Bloc Pattern",
      layers: "UI -> Cubit -> Repository -> External API",
      keyDecisions: "Used Get-it to ensure singleton access to repositories and network clients across the app."
    }
  }
];

if (typeof window !== "undefined") {
  window.PROJECTS_DATA = PROJECTS_DATA;
}

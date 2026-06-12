import fallbackData from "../data/portfolioData.json";

// Initialize local storage if not already present
const initLocalStorage = () => {
  if (!localStorage.getItem("portfolio_personal")) {
    localStorage.setItem("portfolio_personal", JSON.stringify(fallbackData.personal));
  }
  if (!localStorage.getItem("portfolio_skills")) {
    localStorage.setItem("portfolio_skills", JSON.stringify(fallbackData.skills));
  }
  if (!localStorage.getItem("portfolio_achievements")) {
    localStorage.setItem("portfolio_achievements", JSON.stringify(fallbackData.achievements));
  }
  if (!localStorage.getItem("portfolio_experience")) {
    localStorage.setItem("portfolio_experience", JSON.stringify(fallbackData.experience));
  }
  if (!localStorage.getItem("portfolio_projects")) {
    localStorage.setItem("portfolio_projects", JSON.stringify(fallbackData.projects));
  }
  if (!localStorage.getItem("portfolio_questions")) {
    localStorage.setItem("portfolio_questions", JSON.stringify(fallbackData.questions));
  }
};

// Execute initialization
initLocalStorage();

// Admin Authentication Configuration
const ADMIN_EMAIL = "admin@portfolio.com";
const ADMIN_PASSWORD = "admin123";

export const dataStore = {
  // Auth
  login: (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("portfolio_admin_session", "true");
      return true;
    }
    return false;
  },
  logout: () => {
    localStorage.removeItem("portfolio_admin_session");
  },
  isAuthenticated: () => {
    return localStorage.getItem("portfolio_admin_session") === "true";
  },

  // Personal Info
  getProfile: () => {
    initLocalStorage();
    const personal = JSON.parse(localStorage.getItem("portfolio_personal"));
    const skills = JSON.parse(localStorage.getItem("portfolio_skills"));
    const achievements = JSON.parse(localStorage.getItem("portfolio_achievements"));
    return { personal, skills, achievements };
  },
  saveProfile: (personal, skills, achievements) => {
    localStorage.setItem("portfolio_personal", JSON.stringify(personal));
    localStorage.setItem("portfolio_skills", JSON.stringify(skills));
    localStorage.setItem("portfolio_achievements", JSON.stringify(achievements));
    return true;
  },

  // Experiences
  getExperiences: () => {
    initLocalStorage();
    const list = JSON.parse(localStorage.getItem("portfolio_experience")) || [];
    return list.sort((a, b) => (a.order || 0) - (b.order || 0));
  },
  saveExperience: (exp) => {
    const list = dataStore.getExperiences();
    const idx = list.findIndex((item) => item.id === exp.id);
    if (idx !== -1) {
      list[idx] = exp;
    } else {
      list.push(exp);
    }
    localStorage.setItem("portfolio_experience", JSON.stringify(list));
    return true;
  },
  deleteExperience: (id) => {
    const list = dataStore.getExperiences();
    const filtered = list.filter((item) => item.id !== id);
    localStorage.setItem("portfolio_experience", JSON.stringify(filtered));
    return true;
  },

  // Projects
  getProjects: () => {
    initLocalStorage();
    const list = JSON.parse(localStorage.getItem("portfolio_projects")) || [];
    return list.sort((a, b) => (a.order || 0) - (b.order || 0));
  },
  saveProject: (proj) => {
    const list = dataStore.getProjects();
    const idx = list.findIndex((item) => item.id === proj.id);
    if (idx !== -1) {
      list[idx] = proj;
    } else {
      list.push(proj);
    }
    localStorage.setItem("portfolio_projects", JSON.stringify(list));
    return true;
  },
  deleteProject: (id) => {
    const list = dataStore.getProjects();
    const filtered = list.filter((item) => item.id !== id);
    localStorage.setItem("portfolio_projects", JSON.stringify(filtered));
    return true;
  },

  // Questions & Answers
  getQuestions: () => {
    initLocalStorage();
    const list = JSON.parse(localStorage.getItem("portfolio_questions")) || [];
    return list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  },
  saveQuestion: (qa) => {
    const list = dataStore.getQuestions();
    const idx = list.findIndex((item) => item.id === qa.id);
    if (idx !== -1) {
      list[idx] = qa;
    } else {
      list.push(qa);
    }
    localStorage.setItem("portfolio_questions", JSON.stringify(list));
    return true;
  },
  deleteQuestion: (id) => {
    const list = dataStore.getQuestions();
    const filtered = list.filter((item) => item.id !== id);
    localStorage.setItem("portfolio_questions", JSON.stringify(filtered));
    return true;
  }
};

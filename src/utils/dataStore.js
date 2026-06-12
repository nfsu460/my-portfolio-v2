import { 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  collection, 
  deleteDoc 
} from "firebase/firestore";
import { 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { db, auth } from "../firebase";
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

// Execute initialization for offline fallback
initLocalStorage();

// Admin Authentication Configuration for local fallback
const ADMIN_EMAIL = "admin@portfolio.com";
const ADMIN_PASSWORD = "admin123";

export const dataStore = {
  // Auth
  login: async (email, password) => {
    if (auth) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return !!userCredential.user;
      } catch (error) {
        console.error("Firebase Login Error:", error);
        throw error;
      }
    } else {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("portfolio_admin_session", "true");
        return true;
      }
      return false;
    }
  },
  logout: async () => {
    if (auth) {
      await signOut(auth);
    } else {
      localStorage.removeItem("portfolio_admin_session");
    }
  },
  isAuthenticated: () => {
    if (auth) {
      return !!auth.currentUser;
    }
    return localStorage.getItem("portfolio_admin_session") === "true";
  },

  // Personal Info
  getProfile: async () => {
    if (db) {
      try {
        const docSnap = await getDoc(doc(db, "resume_data", "profile"));
        if (docSnap.exists()) {
          return docSnap.data();
        }
        // If firestore document doesn't exist yet, return default schema
        return {
          personal: fallbackData.personal,
          skills: fallbackData.skills,
          achievements: fallbackData.achievements
        };
      } catch (err) {
        console.error("Firestore getProfile error:", err);
      }
    }
    // Fallback to LocalStorage
    initLocalStorage();
    const personal = JSON.parse(localStorage.getItem("portfolio_personal"));
    const skills = JSON.parse(localStorage.getItem("portfolio_skills"));
    const achievements = JSON.parse(localStorage.getItem("portfolio_achievements"));
    return { personal, skills, achievements };
  },
  saveProfile: async (personal, skills, achievements) => {
    if (db) {
      await setDoc(doc(db, "resume_data", "profile"), { personal, skills, achievements });
      return true;
    }
    localStorage.setItem("portfolio_personal", JSON.stringify(personal));
    localStorage.setItem("portfolio_skills", JSON.stringify(skills));
    localStorage.setItem("portfolio_achievements", JSON.stringify(achievements));
    return true;
  },

  // Experiences
  getExperiences: async () => {
    if (db) {
      try {
        const snap = await getDocs(collection(db, "experience"));
        const list = [];
        snap.forEach(d => list.push(d.data()));
        return list.sort((a, b) => (a.order || 0) - (b.order || 0));
      } catch (err) {
        console.error("Firestore getExperiences error:", err);
      }
    }
    // Fallback
    initLocalStorage();
    const list = JSON.parse(localStorage.getItem("portfolio_experience")) || [];
    return list.sort((a, b) => (a.order || 0) - (b.order || 0));
  },
  saveExperience: async (exp) => {
    if (db) {
      await setDoc(doc(db, "experience", exp.id), exp);
      return true;
    }
    const list = JSON.parse(localStorage.getItem("portfolio_experience")) || [];
    const idx = list.findIndex((item) => item.id === exp.id);
    if (idx !== -1) {
      list[idx] = exp;
    } else {
      list.push(exp);
    }
    localStorage.setItem("portfolio_experience", JSON.stringify(list));
    return true;
  },
  deleteExperience: async (id) => {
    if (db) {
      await deleteDoc(doc(db, "experience", id));
      return true;
    }
    const list = JSON.parse(localStorage.getItem("portfolio_experience")) || [];
    const filtered = list.filter((item) => item.id !== id);
    localStorage.setItem("portfolio_experience", JSON.stringify(filtered));
    return true;
  },

  // Projects
  getProjects: async () => {
    if (db) {
      try {
        const snap = await getDocs(collection(db, "projects"));
        const list = [];
        snap.forEach(d => list.push(d.data()));
        return list.sort((a, b) => (a.order || 0) - (b.order || 0));
      } catch (err) {
        console.error("Firestore getProjects error:", err);
      }
    }
    // Fallback
    initLocalStorage();
    const list = JSON.parse(localStorage.getItem("portfolio_projects")) || [];
    return list.sort((a, b) => (a.order || 0) - (b.order || 0));
  },
  saveProject: async (proj) => {
    if (db) {
      await setDoc(doc(db, "projects", proj.id), proj);
      return true;
    }
    const list = JSON.parse(localStorage.getItem("portfolio_projects")) || [];
    const idx = list.findIndex((item) => item.id === proj.id);
    if (idx !== -1) {
      list[idx] = proj;
    } else {
      list.push(proj);
    }
    localStorage.setItem("portfolio_projects", JSON.stringify(list));
    return true;
  },
  deleteProject: async (id) => {
    if (db) {
      await deleteDoc(doc(db, "projects", id));
      return true;
    }
    const list = JSON.parse(localStorage.getItem("portfolio_projects")) || [];
    const filtered = list.filter((item) => item.id !== id);
    localStorage.setItem("portfolio_projects", JSON.stringify(filtered));
    return true;
  },

  // Questions & Answers
  getQuestions: async () => {
    if (db) {
      try {
        const snap = await getDocs(collection(db, "questions"));
        const list = [];
        snap.forEach(d => list.push(d.data()));
        return list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      } catch (err) {
        console.error("Firestore getQuestions error:", err);
      }
    }
    // Fallback
    initLocalStorage();
    const list = JSON.parse(localStorage.getItem("portfolio_questions")) || [];
    return list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  },
  saveQuestion: async (qa) => {
    if (db) {
      await setDoc(doc(db, "questions", qa.id), qa);
      return true;
    }
    const list = JSON.parse(localStorage.getItem("portfolio_questions")) || [];
    const idx = list.findIndex((item) => item.id === qa.id);
    if (idx !== -1) {
      list[idx] = qa;
    } else {
      list.push(qa);
    }
    localStorage.setItem("portfolio_questions", JSON.stringify(list));
    return true;
  },
  deleteQuestion: async (id) => {
    if (db) {
      await deleteDoc(doc(db, "questions", id));
      return true;
    }
    const list = JSON.parse(localStorage.getItem("portfolio_questions")) || [];
    const filtered = list.filter((item) => item.id !== id);
    localStorage.setItem("portfolio_questions", JSON.stringify(filtered));
    return true;
  }
};

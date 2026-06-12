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

export const dataStore = {
  // Auth
  login: async (email, password) => {
    if (!auth) throw new Error("Firebase Authentication is not initialized.");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return !!userCredential.user;
    } catch (error) {
      console.error("Firebase Login Error:", error);
      throw error;
    }
  },
  logout: async () => {
    if (!auth) throw new Error("Firebase Authentication is not initialized.");
    await signOut(auth);
  },
  isAuthenticated: () => {
    if (!auth) return false;
    return !!auth.currentUser;
  },

  // Personal Info
  getProfile: async () => {
    if (!db) throw new Error("Firestore is not initialized.");
    try {
      const docSnap = await getDoc(doc(db, "resume_data", "profile"));
      if (docSnap.exists()) {
        return docSnap.data();
      }
    } catch (err) {
      console.error("Firestore getProfile error:", err);
    }
    // Safe mock return so the page doesn't crash if Firestore document is missing
    return {
      personal: fallbackData.personal,
      skills: fallbackData.skills,
      achievements: fallbackData.achievements
    };
  },
  saveProfile: async (personal, skills, achievements) => {
    if (!db) throw new Error("Firestore is not initialized.");
    await setDoc(doc(db, "resume_data", "profile"), { personal, skills, achievements });
    return true;
  },

  // Experiences
  getExperiences: async () => {
    if (!db) throw new Error("Firestore is not initialized.");
    const snap = await getDocs(collection(db, "experience"));
    const list = [];
    snap.forEach(d => list.push(d.data()));
    return list.sort((a, b) => (a.order || 0) - (b.order || 0));
  },
  saveExperience: async (exp) => {
    if (!db) throw new Error("Firestore is not initialized.");
    await setDoc(doc(db, "experience", exp.id), exp);
    return true;
  },
  deleteExperience: async (id) => {
    if (!db) throw new Error("Firestore is not initialized.");
    await deleteDoc(doc(db, "experience", id));
    return true;
  },

  // Projects
  getProjects: async () => {
    if (!db) throw new Error("Firestore is not initialized.");
    const snap = await getDocs(collection(db, "projects"));
    const list = [];
    snap.forEach(d => list.push(d.data()));
    return list.sort((a, b) => (a.order || 0) - (b.order || 0));
  },
  saveProject: async (proj) => {
    if (!db) throw new Error("Firestore is not initialized.");
    await setDoc(doc(db, "projects", proj.id), proj);
    return true;
  },
  deleteProject: async (id) => {
    if (!db) throw new Error("Firestore is not initialized.");
    await deleteDoc(doc(db, "projects", id));
    return true;
  },

  // Questions & Answers
  getQuestions: async () => {
    if (!db) throw new Error("Firestore is not initialized.");
    const snap = await getDocs(collection(db, "questions"));
    const list = [];
    snap.forEach(d => list.push(d.data()));
    return list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  },
  saveQuestion: async (qa) => {
    if (!db) throw new Error("Firestore is not initialized.");
    await setDoc(doc(db, "questions", qa.id), qa);
    return true;
  },
  deleteQuestion: async (id) => {
    if (!db) throw new Error("Firestore is not initialized.");
    await deleteDoc(doc(db, "questions", id));
    return true;
  }
};

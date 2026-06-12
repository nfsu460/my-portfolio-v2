import React, { useState, useEffect } from "react";
import { dataStore } from "../utils/dataStore";
import Navbar from "../components/navbar/navbar";
import { FaLock, FaSignOutAlt, FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { auth as firebaseAuth } from "../firebase";
import "./AdminPage.css";

function AdminPage() {
  const [user, setUser] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Tab State: 'resume' | 'experience' | 'projects' | 'qa'
  const [activeTab, setActiveTab] = useState("resume");

  // State for data
  const [loadingData, setLoadingData] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  // Resume State
  const [resumeData, setResumeData] = useState({
    personal: { name: "", email: "", phone: "", github: "", linkedin: "", leetcode: "", hackerrank: "", tagline: "", about: "" },
    skills: {},
    achievements: []
  });
  const [newSkillCategory, setNewSkillCategory] = useState("");
  const [newSkillNames, setNewSkillNames] = useState({}); // mapped by category: "Java, Spring"
  const [newAchievement, setNewAchievement] = useState("");

  // Experience State
  const [experiences, setExperiences] = useState([]);
  const [editingExp, setEditingExp] = useState(null); // exp object or null (for new)
  const [expForm, setExpForm] = useState({ id: "", company: "", role: "", location: "", duration: "", highlights: [], order: 1 });
  const [newHighlight, setNewHighlight] = useState("");

  // Projects State
  const [projects, setProjects] = useState([]);
  const [editingProj, setEditingProj] = useState(null); // proj object or null (for new)
  const [projForm, setProjForm] = useState({ id: "", title: "", description: "", gitLink: "", imgUrl: "", order: 1 });

  // Q&A State
  const [questions, setQuestions] = useState([]);
  const [editingQA, setEditingQA] = useState(null); // QA object or null (for new)
  const [qaForm, setQaForm] = useState({ id: "", question: "", answer: "", tags: [] });
  const [newQATag, setNewQATag] = useState("");

  // Handle Authentication status
  useEffect(() => {
    if (firebaseAuth) {
      const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
        setUser(!!currentUser);
        setAuthLoading(false);
      });
      return unsubscribe;
    } else {
      setUser(dataStore.isAuthenticated());
      setAuthLoading(false);
    }
  }, []);

  // Fetch data based on active tab
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoadingData(true);
      showFeedback("", "");
      try {
        if (activeTab === "resume") {
          const profile = await dataStore.getProfile();
          setResumeData(profile);
        } else if (activeTab === "experience") {
          const list = await dataStore.getExperiences();
          setExperiences(list);
        } else if (activeTab === "projects") {
          const list = await dataStore.getProjects();
          setProjects(list);
        } else if (activeTab === "qa") {
          const list = await dataStore.getQuestions();
          setQuestions(list);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        showFeedback("error", "Failed to load records.");
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [user, activeTab]);

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    if (type === "success") {
      setTimeout(() => setFeedback({ type: "", message: "" }), 3000);
    }
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      const success = await dataStore.login(email, password);
      if (success) {
        if (!firebaseAuth) {
          setUser(true);
        }
      } else {
        setAuthError("Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      setAuthError(err.message || "Failed to log in. Check your credentials.");
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await dataStore.logout();
      if (!firebaseAuth) {
        setUser(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* RESUME OPERATIONS */
  const handleSaveResumePersonal = async (e) => {
    e.preventDefault();
    try {
      await dataStore.saveProfile(resumeData.personal, resumeData.skills, resumeData.achievements);
      showFeedback("success", "Profile saved successfully!");
    } catch (err) {
      console.error(err);
      showFeedback("error", "Error saving profile.");
    }
  };

  const handleAddSkillCategory = () => {
    if (!newSkillCategory.trim()) return;
    const cat = newSkillCategory.trim();
    if (resumeData.skills[cat]) return;

    setResumeData({
      ...resumeData,
      skills: { ...resumeData.skills, [cat]: [] }
    });
    setNewSkillCategory("");
  };

  const handleAddSkill = (category) => {
    const text = newSkillNames[category] || "";
    if (!text.trim()) return;

    const skillsToAdd = text.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
    const existing = resumeData.skills[category] || [];
    const updated = [...new Set([...existing, ...skillsToAdd])];

    setResumeData({
      ...resumeData,
      skills: { ...resumeData.skills, [category]: updated }
    });

    setNewSkillNames({ ...newSkillNames, [category]: "" });
  };

  const handleDeleteSkill = (category, idx) => {
    const updated = [...resumeData.skills[category]];
    updated.splice(idx, 1);

    setResumeData({
      ...resumeData,
      skills: { ...resumeData.skills, [category]: updated }
    });
  };

  const handleDeleteSkillCategory = (category) => {
    const updated = { ...resumeData.skills };
    delete updated[category];

    setResumeData({
      ...resumeData,
      skills: updated
    });
  };

  const handleAddAchievement = () => {
    if (!newAchievement.trim()) return;
    setResumeData({
      ...resumeData,
      achievements: [...resumeData.achievements, newAchievement.trim()]
    });
    setNewAchievement("");
  };

  const handleDeleteAchievement = (idx) => {
    const updated = [...resumeData.achievements];
    updated.splice(idx, 1);
    setResumeData({
      ...resumeData,
      achievements: updated
    });
  };

  /* EXPERIENCE OPERATIONS */
  const startEditExp = (exp) => {
    if (exp) {
      setEditingExp(exp);
      setExpForm({ ...exp });
    } else {
      setEditingExp("new");
      setExpForm({ id: `exp_${Date.now()}`, company: "", role: "", location: "", duration: "", highlights: [], order: experiences.length + 1 });
    }
  };

  const handleSaveExperience = async (e) => {
    e.preventDefault();
    if (!expForm.id.trim() || !expForm.company.trim()) {
      showFeedback("error", "ID and Company fields are required.");
      return;
    }

    try {
      await dataStore.saveExperience(expForm);
      showFeedback("success", "Work experience saved!");
      setEditingExp(null);
      // reload
      setActiveTab("");
      setTimeout(() => setActiveTab("experience"), 50);
    } catch (err) {
      console.error(err);
      showFeedback("error", "Error saving work experience.");
    }
  };

  const handleDeleteExperience = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience record?")) return;
    try {
      await dataStore.deleteExperience(id);
      showFeedback("success", "Experience deleted.");
      setExperiences(experiences.filter((exp) => exp.id !== id));
    } catch (err) {
      console.error(err);
      showFeedback("error", "Failed to delete record.");
    }
  };

  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    setExpForm({
      ...expForm,
      highlights: [...expForm.highlights, newHighlight.trim()]
    });
    setNewHighlight("");
  };

  const handleDeleteHighlight = (idx) => {
    const updated = [...expForm.highlights];
    updated.splice(idx, 1);
    setExpForm({ ...expForm, highlights: updated });
  };

  /* PROJECTS OPERATIONS */
  const startEditProj = (proj) => {
    if (proj) {
      setEditingProj(proj);
      setProjForm({ ...proj });
    } else {
      setEditingProj("new");
      setProjForm({ id: `proj_${Date.now()}`, title: "", description: "", gitLink: "", imgUrl: "", order: projects.length + 1 });
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projForm.id.trim() || !projForm.title.trim()) {
      showFeedback("error", "ID and Title are required.");
      return;
    }

    try {
      await dataStore.saveProject(projForm);
      showFeedback("success", "Project entry saved!");
      setEditingProj(null);
      // reload
      setActiveTab("");
      setTimeout(() => setActiveTab("projects"), 50);
    } catch (err) {
      console.error(err);
      showFeedback("error", "Error saving project.");
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete this project entry?")) return;
    try {
      await dataStore.deleteProject(id);
      showFeedback("success", "Project deleted.");
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      showFeedback("error", "Failed to delete project.");
    }
  };

  /* Q&A OPERATIONS */
  const startEditQA = (qa) => {
    if (qa) {
      setEditingQA(qa);
      setQaForm({ ...qa });
    } else {
      setEditingQA("new");
      setQaForm({ id: `q${Date.now()}`, question: "", answer: "", tags: [] });
    }
  };

  const handleSaveQA = async (e) => {
    e.preventDefault();
    if (!qaForm.question.trim() || !qaForm.answer.trim()) {
      showFeedback("error", "Question and Answer fields are required.");
      return;
    }

    try {
      const payload = {
        ...qaForm,
        createdAt: qaForm.createdAt || new Date().toISOString()
      };
      await dataStore.saveQuestion(payload);
      showFeedback("success", "Q&A saved!");
      setEditingQA(null);
      // reload
      setActiveTab("");
      setTimeout(() => setActiveTab("qa"), 50);
    } catch (err) {
      console.error(err);
      showFeedback("error", "Error saving Q&A.");
    }
  };

  const handleDeleteQA = async (id) => {
    if (!window.confirm("Delete this Q&A?")) return;
    try {
      await dataStore.deleteQuestion(id);
      showFeedback("success", "Q&A deleted.");
      setQuestions(questions.filter((q) => q.id !== id));
    } catch (err) {
      console.error(err);
      showFeedback("error", "Failed to delete Q&A.");
    }
  };

  const handleAddQATag = () => {
    if (!newQATag.trim()) return;
    const tag = newQATag.trim();
    if (qaForm.tags.includes(tag)) return;
    setQaForm({
      ...qaForm,
      tags: [...qaForm.tags, tag]
    });
    setNewQATag("");
  };

  const handleDeleteQATag = (tag) => {
    setQaForm({
      ...qaForm,
      tags: qaForm.tags.filter((t) => t !== tag)
    });
  };

  if (authLoading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading Admin Dashboard Session...</p>
      </div>
    );
  }

  // RENDER LOGIN SCREEN IF NOT AUTHENTICATED
  if (!user) {
    return (
      <div className="admin-login-container">
        <Navbar />
        <div className="admin-login-card">
          <div className="admin-lock-icon">
            <FaLock />
          </div>
          <h2>Admin Login</h2>
          <p>Sign in to manage resume details, work experience, projects, and Q&As locally.</p>
          
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@portfolio.com"
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
              />
            </div>
            
            {authError && <div className="auth-error">{authError}</div>}
            
            <button type="submit" className="login-btn">Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  // RENDER DASHBOARD IF AUTHENTICATED
  return (
    <div className="admin-dashboard-container">
      <Navbar />
      
      <div className="admin-header section__padding">
        <div className="admin-header-flex">
          <div>
            <span className="admin-badge">Management Portal</span>
            <h1 className="gradient__text">Dashboard</h1>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </div>

      <div className="admin-body section__margin">
        {/* Navigation Tabs */}
        <div className="admin-tabs">
          <button className={`tab-btn ${activeTab === "resume" ? "active" : ""}`} onClick={() => { setActiveTab("resume"); setEditingExp(null); setEditingProj(null); setEditingQA(null); }}>
            Resume Profile
          </button>
          <button className={`tab-btn ${activeTab === "experience" ? "active" : ""}`} onClick={() => { setActiveTab("experience"); setEditingExp(null); }}>
            Work Experience
          </button>
          <button className={`tab-btn ${activeTab === "projects" ? "active" : ""}`} onClick={() => { setActiveTab("projects"); setEditingProj(null); }}>
            Projects
          </button>
          <button className={`tab-btn ${activeTab === "qa" ? "active" : ""}`} onClick={() => { setActiveTab("qa"); setEditingQA(null); }}>
            Q&A Topics
          </button>
        </div>

        {feedback.message && (
          <div className={`feedback-alert ${feedback.type}`}>
            {feedback.message}
          </div>
        )}

        {loadingData ? (
          <div className="admin-loading-data">
            <div className="spinner"></div>
            <p>Fetching collection from storage...</p>
          </div>
        ) : (
          <div className="admin-tab-content">
            
            {/* 1. RESUME TAB */}
            {activeTab === "resume" && (
              <div className="resume-tab-view">
                <form onSubmit={handleSaveResumePersonal} className="admin-form">
                  <h3>Personal Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" value={resumeData.personal.name} onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, name: e.target.value}})} />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="text" value={resumeData.personal.phone} onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, phone: e.target.value}})} />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" value={resumeData.personal.email} onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, email: e.target.value}})} />
                    </div>
                    <div className="form-group">
                      <label>Tagline</label>
                      <input type="text" value={resumeData.personal.tagline} onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, tagline: e.target.value}})} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Github</label>
                      <input type="text" value={resumeData.personal.github} onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, github: e.target.value}})} />
                    </div>
                    <div className="form-group">
                      <label>LinkedIn</label>
                      <input type="text" value={resumeData.personal.linkedin} onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, linkedin: e.target.value}})} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Leetcode</label>
                      <input type="text" value={resumeData.personal.leetcode || ""} onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, leetcode: e.target.value}})} />
                    </div>
                    <div className="form-group">
                      <label>HackerRank</label>
                      <input type="text" value={resumeData.personal.hackerrank || ""} onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, hackerrank: e.target.value}})} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>About Bio</label>
                    <textarea rows="6" value={resumeData.personal.about} onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, about: e.target.value}})}></textarea>
                  </div>

                  <div className="admin-skills-editor">
                    <h3>Technical Skills</h3>
                    <div className="add-cat-row">
                      <input type="text" placeholder="New Skill Category (e.g. Databases)" value={newSkillCategory} onChange={(e) => setNewSkillCategory(e.target.value)} />
                      <button type="button" onClick={handleAddSkillCategory} className="add-cat-btn"><FaPlus /> Category</button>
                    </div>

                    {Object.keys(resumeData.skills).map((cat) => (
                      <div key={cat} className="skill-cat-card">
                        <div className="skill-cat-header">
                          <h4>{cat}</h4>
                          <button type="button" onClick={() => handleDeleteSkillCategory(cat)} className="delete-cat-btn"><FaTrash /></button>
                        </div>
                        <div className="skill-tags">
                          {resumeData.skills[cat].map((skill, idx) => (
                            <span key={idx} className="skill-tag">
                              {skill}
                              <button type="button" onClick={() => handleDeleteSkill(cat, idx)} className="remove-skill-btn">×</button>
                            </span>
                          ))}
                        </div>
                        <div className="add-skill-row">
                          <input 
                            type="text" 
                            placeholder="Add skill(s), comma separated" 
                            value={newSkillNames[cat] || ""} 
                            onChange={(e) => setNewSkillNames({...newSkillNames, [cat]: e.target.value})} 
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill(cat))}
                          />
                          <button type="button" onClick={() => handleAddSkill(cat)} className="add-skill-btn"><FaPlus /></button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="admin-achievements-editor">
                    <h3>Achievements</h3>
                    <ul className="admin-achievements-list">
                      {resumeData.achievements.map((ach, idx) => (
                        <li key={idx}>
                          <span>{ach}</span>
                          <button type="button" onClick={() => handleDeleteAchievement(idx)} className="delete-ach-btn"><FaTrash /></button>
                        </li>
                      ))}
                    </ul>
                    <div className="add-ach-row">
                      <input type="text" placeholder="Add new achievement..." value={newAchievement} onChange={(e) => setNewAchievement(e.target.value)} />
                      <button type="button" onClick={handleAddAchievement} className="add-ach-btn"><FaPlus /> Add</button>
                    </div>
                  </div>

                  <button type="submit" className="save-all-btn"><FaSave /> Save Profile Details</button>
                </form>
              </div>
            )}

            {/* 2. EXPERIENCE TAB */}
            {activeTab === "experience" && (
              <div className="experience-tab-view">
                {!editingExp ? (
                  <div>
                    <div className="section-tab-header">
                      <h3>Work History</h3>
                      <button onClick={() => startEditExp(null)} className="add-new-btn"><FaPlus /> Add Experience</button>
                    </div>
                    
                    <div className="admin-items-list">
                      {experiences.map((exp) => (
                        <div key={exp.id} className="admin-item-card">
                          <div>
                            <h4>{exp.role}</h4>
                            <p>{exp.company} | {exp.duration}</p>
                          </div>
                          <div className="item-actions">
                            <button onClick={() => startEditExp(exp)} className="edit-action-btn"><FaEdit /></button>
                            <button onClick={() => handleDeleteExperience(exp.id)} className="delete-action-btn"><FaTrash /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSaveExperience} className="admin-form">
                    <div className="form-modal-header">
                      <h3>{editingExp === "new" ? "Add Work Experience" : "Edit Work Experience"}</h3>
                      <button type="button" onClick={() => setEditingExp(null)} className="close-form-btn"><FaTimes /></button>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Doc ID (unique, lowercase, e.g. oracle)</label>
                        <input type="text" disabled={editingExp !== "new"} value={expForm.id} onChange={(e) => setExpForm({...expForm, id: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>Order (e.g. 1 for present, 2 for past)</label>
                        <input type="number" value={expForm.order} onChange={(e) => setExpForm({...expForm, order: parseInt(e.target.value) || 1})} />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Company Name</label>
                        <input type="text" value={expForm.company} onChange={(e) => setExpForm({...expForm, company: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>Role / Position</label>
                        <input type="text" value={expForm.role} onChange={(e) => setExpForm({...expForm, role: e.target.value})} />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Location</label>
                        <input type="text" value={expForm.location} onChange={(e) => setExpForm({...expForm, location: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>Duration (e.g. Nov 2024 - Present)</label>
                        <input type="text" value={expForm.duration} onChange={(e) => setExpForm({...expForm, duration: e.target.value})} />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Job Highlights (Bullet points)</label>
                      <ul className="form-highlights-list">
                        {expForm.highlights.map((hl, idx) => (
                          <li key={idx}>
                            <span>{hl}</span>
                            <button type="button" onClick={() => handleDeleteHighlight(idx)} className="delete-hl-btn">×</button>
                          </li>
                        ))}
                      </ul>
                      <div className="add-hl-row">
                        <input type="text" placeholder="Add work highlight..." value={newHighlight} onChange={(e) => setNewHighlight(e.target.value)} />
                        <button type="button" onClick={handleAddHighlight} className="add-hl-btn"><FaPlus /></button>
                      </div>
                    </div>

                    <button type="submit" className="save-form-btn"><FaSave /> Save Experience</button>
                  </form>
                )}
              </div>
            )}

            {/* 3. PROJECTS TAB */}
            {activeTab === "projects" && (
              <div className="projects-tab-view">
                {!editingProj ? (
                  <div>
                    <div className="section-tab-header">
                      <h3>Projects List</h3>
                      <button onClick={() => startEditProj(null)} className="add-new-btn"><FaPlus /> Add Project</button>
                    </div>
                    
                    <div className="admin-items-list">
                      {projects.map((proj) => (
                        <div key={proj.id} className="admin-item-card">
                          <div>
                            <h4>{proj.title}</h4>
                            <p>{proj.description.substring(0, 100)}...</p>
                          </div>
                          <div className="item-actions">
                            <button onClick={() => startEditProj(proj)} className="edit-action-btn"><FaEdit /></button>
                            <button onClick={() => handleDeleteProject(proj.id)} className="delete-action-btn"><FaTrash /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSaveProject} className="admin-form">
                    <div className="form-modal-header">
                      <h3>{editingProj === "new" ? "Add Project" : "Edit Project"}</h3>
                      <button type="button" onClick={() => setEditingProj(null)} className="close-form-btn"><FaTimes /></button>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>ID (unique, e.g. tracker)</label>
                        <input type="text" disabled={editingProj !== "new"} value={projForm.id} onChange={(e) => setProjForm({...projForm, id: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>Order</label>
                        <input type="number" value={projForm.order} onChange={(e) => setProjForm({...projForm, order: parseInt(e.target.value) || 1})} />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Project Title</label>
                      <input type="text" value={projForm.title} onChange={(e) => setProjForm({...projForm, title: e.target.value})} />
                    </div>

                    <div className="form-group">
                      <label>Github URL Link</label>
                      <input type="text" value={projForm.gitLink} onChange={(e) => setProjForm({...projForm, gitLink: e.target.value})} />
                    </div>

                    <div className="form-group">
                      <label>Image URL Path (optional)</label>
                      <input type="text" placeholder="/src/assets/images/..." value={projForm.imgUrl} onChange={(e) => setProjForm({...projForm, imgUrl: e.target.value})} />
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea rows="4" value={projForm.description} onChange={(e) => setProjForm({...projForm, description: e.target.value})}></textarea>
                    </div>

                    <button type="submit" className="save-form-btn"><FaSave /> Save Project</button>
                  </form>
                )}
              </div>
            )}

            {/* 4. Q&A TAB */}
            {activeTab === "qa" && (
              <div className="qa-tab-view">
                {!editingQA ? (
                  <div>
                    <div className="section-tab-header">
                      <h3>Q&As Database</h3>
                      <button onClick={() => startEditQA(null)} className="add-new-btn"><FaPlus /> Add Q&A</button>
                    </div>
                    
                    <div className="admin-items-list">
                      {questions.map((q) => (
                        <div key={q.id} className="admin-item-card">
                          <div style={{ flex: 1, paddingRight: "1rem" }}>
                            <h4>{q.question}</h4>
                            <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
                              {q.tags && q.tags.map(t => (
                                <span key={t} className="qa-card-tag" style={{ padding: "1px 5px", fontSize: "0.7rem" }}>{t}</span>
                              ))}
                            </div>
                          </div>
                          <div className="item-actions">
                            <button onClick={() => startEditQA(q)} className="edit-action-btn"><FaEdit /></button>
                            <button onClick={() => handleDeleteQA(q.id)} className="delete-action-btn"><FaTrash /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSaveQA} className="admin-form">
                    <div className="form-modal-header">
                      <h3>{editingQA === "new" ? "Add Q&A Item" : "Edit Q&A Item"}</h3>
                      <button type="button" onClick={() => setEditingQA(null)} className="close-form-btn"><FaTimes /></button>
                    </div>

                    <div className="form-group">
                      <label>Question Topic/Text</label>
                      <input type="text" value={qaForm.question} onChange={(e) => setQaForm({...qaForm, question: e.target.value})} placeholder="e.g. How does Kafka scale?" />
                    </div>

                    <div className="form-group">
                      <label>Detailed Answer (Supports newlines)</label>
                      <textarea rows="10" value={qaForm.answer} onChange={(e) => setQaForm({...qaForm, answer: e.target.value})} placeholder="Write details here... Use double-newlines for paragraphs."></textarea>
                    </div>

                    <div className="form-group">
                      <label>Topic Tags</label>
                      <div className="qa-tags-edit">
                        {qaForm.tags && qaForm.tags.map((tag) => (
                          <span key={tag} className="skill-tag">
                            {tag}
                            <button type="button" onClick={() => handleDeleteQATag(tag)} className="remove-skill-btn">×</button>
                          </span>
                        ))}
                      </div>
                      <div className="add-tag-row" style={{ marginTop: "0.5rem" }}>
                        <input type="text" placeholder="Add tag..." value={newQATag} onChange={(e) => setNewQATag(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddQATag())} />
                        <button type="button" onClick={handleAddQATag} className="add-tag-btn"><FaPlus /></button>
                      </div>
                    </div>

                    <button type="submit" className="save-form-btn"><FaSave /> Save Q&A</button>
                  </form>
                )}
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;

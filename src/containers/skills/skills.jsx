import React, { useState, useEffect } from "react";
import { 
  FaJava, FaPython, FaDocker, FaAws, FaJenkins, FaGitAlt, FaGithub, FaBitbucket, 
  FaDatabase, FaNetworkWired, FaProjectDiagram, FaServer, FaCodeBranch 
} from "react-icons/fa";
import { 
  SiSpring, SiSpringboot, SiKubernetes, SiApachekafka, SiElasticsearch, 
  SiMongodb, SiPostgresql, SiMysql, SiOracle, SiScala, SiGradle, 
  SiApachemaven, SiYaml, SiApachegroovy, SiOpensearch, 
  SiAmazondynamodb, SiLiquibase, SiAmazoncloudwatch, SiGithubactions, SiHibernate 
} from "react-icons/si";
import { AiOutlineApi } from "react-icons/ai";
import { dataStore } from "../../utils/dataStore";
import "./skills.css";

const getSkillIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes("spring boot")) return <SiSpringboot />;
  if (n.includes("spring")) return <SiSpring />;
  if (n.includes("java")) return <FaJava />;
  if (n.includes("scala")) return <SiScala />;
  if (n.includes("python")) return <FaPython />;
  if (n.includes("docker")) return <FaDocker />;
  if (n.includes("kubernetes")) return <SiKubernetes />;
  if (n.includes("kafka")) return <SiApachekafka />;
  if (n.includes("postgresql")) return <SiPostgresql />;
  if (n.includes("mysql")) return <SiMysql />;
  if (n.includes("oracle")) return <SiOracle />;
  if (n.includes("mongodb")) return <SiMongodb />;
  if (n.includes("dynamodb")) return <SiAmazondynamodb />;
  if (n.includes("liquibase")) return <SiLiquibase />;
  if (n.includes("elasticsearch")) return <SiElasticsearch />;
  if (n.includes("opensearch")) return <SiOpensearch />;
  if (n.includes("cloudwatch")) return <SiAmazoncloudwatch />;
  if (n.includes("aws")) return <FaAws />;
  if (n.includes("jenkins")) return <FaJenkins />;
  if (n.includes("git") || n.includes("github")) return <FaGitAlt />;
  if (n.includes("bitbucket")) return <FaBitbucket />;
  if (n.includes("maven")) return <SiApachemaven />;
  if (n.includes("gradle")) return <SiGradle />;
  if (n.includes("yaml")) return <SiYaml />;
  if (n.includes("groovy")) return <SiApachegroovy />;
  if (n.includes("akka")) return <FaServer />;
  if (n.includes("hibernate")) return <SiHibernate />;
  if (n.includes("jpa")) return <FaDatabase />;
  if (n.includes("sql") || n.includes("pl/sql")) return <FaDatabase />;
  if (n.includes("microservices")) return <FaNetworkWired />;
  if (n.includes("rest api") || n.includes("api")) return <AiOutlineApi />;
  if (n.includes("design pattern")) return <FaProjectDiagram />;
  if (n.includes("ci/cd") || n.includes("pipeline")) return <FaCodeBranch />;
  return <FaServer />; // default fallback
};

function Skills() {
  const [skillsObj, setSkillsObj] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await dataStore.getProfile();
        if (profile && profile.skills) {
          setSkillsObj(profile.skills);
        }
      } catch (err) {
        console.error("Error fetching skills:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = ["ALL", ...Object.keys(skillsObj)];

  // Flatten the skills object to a list of { name, category }
  const allSkillsList = [];
  Object.entries(skillsObj).forEach(([cat, list]) => {
    if (Array.isArray(list)) {
      list.forEach((name) => {
        allSkillsList.push({ name, category: cat });
      });
    }
  });

  const filteredSkills = activeCategory === "ALL" 
    ? allSkillsList 
    : allSkillsList.filter((s) => s.category === activeCategory);

  return (
    <div className="rr__skills section__margin" id="skills">
      <div className="rr__skills-heading">
        <h1>Skills & Expertise</h1>
      </div>

      {loading ? (
        <div className="skills-loading">
          <div className="spinner"></div>
          <p>Loading skills...</p>
        </div>
      ) : allSkillsList.length === 0 ? (
        <p className="skills-empty">No skills listed.</p>
      ) : (
        <>
          <div className="rr__skills-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`rr__skills-filter-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="rr__skills-grid">
            {filteredSkills.map((skill, index) => (
              <div className="rr__skills-card" key={index}>
                <div className="rr__skills-card-icon">
                  {getSkillIcon(skill.name)}
                </div>
                <div className="rr__skills-card-info">
                  <h3>{skill.name}</h3>
                  <span className="rr__skills-card-category">{skill.category}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Skills;

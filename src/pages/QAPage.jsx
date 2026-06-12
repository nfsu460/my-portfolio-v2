import React, { useState, useEffect } from "react";
import { dataStore } from "../utils/dataStore";
import Navbar from "../components/navbar/navbar";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./QAPage.css";

function QAPage() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [tags, setTags] = useState(["All"]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch questions from dataStore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await dataStore.getQuestions();
        const fetched = [];
        const allTags = new Set(["All"]);

        list.forEach((item) => {
          fetched.push(item);
          if (item.tags && Array.isArray(item.tags)) {
            item.tags.forEach((tag) => allTags.add(tag));
          }
        });

        setQuestions(fetched);
        setFilteredQuestions(fetched);
        setTags(Array.from(allTags));
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter questions based on search query and selected tag
  useEffect(() => {
    let result = questions;

    // Filter by tag
    if (selectedTag !== "All") {
      result = result.filter(
        (q) => q.tags && q.tags.includes(selectedTag)
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const queryLower = searchQuery.toLowerCase();
      result = result.filter(
        (q) =>
          q.question.toLowerCase().includes(queryLower) ||
          q.answer.toLowerCase().includes(queryLower)
      );
    }

    setFilteredQuestions(result);
  }, [searchQuery, selectedTag, questions]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Helper to render answers with basic paragraph formatting
  const renderAnswer = (text) => {
    if (!text) return null;
    return text.split("\n\n").map((paragraph, index) => {
      // Check if it's a list item
      if (paragraph.startsWith("1. ") || paragraph.startsWith("- ") || paragraph.startsWith("• ")) {
        const items = paragraph.split("\n");
        return (
          <ul key={index} className="qa-answer-list">
            {items.map((item, i) => (
              <li key={i}>{item.replace(/^(1\.\s*|-\s*|•\s*)/, "")}</li>
            ))}
          </ul>
        );
      }
      // Return simple paragraph
      return (
        <p key={index} className="qa-answer-p">
          {paragraph.split("\n").map((line, lineIdx) => (
            <React.Fragment key={lineIdx}>
              {line}
              {lineIdx < paragraph.split("\n").length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      );
    });
  };

  return (
    <div className="qa-page-container">
      <Navbar />
      
      <div className="qa-header section__padding content-width">
        <div className="qa-header-content">
          <span className="qa-badge">Knowledge Hub</span>
          <h1 className="gradient__text">Field Notes</h1>
          <p>
            An interactive repository of technical questions, explanations, and key concepts in software engineering, system design, databases, and frontend development.
          </p>
        </div>
      </div>

      <div className="qa-body section__margin content-width">
        {/* Search and Filters */}
        <div className="qa-controls">
          <div className="qa-search-box">
            <FaSearch className="qa-search-icon" />
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="qa-tags-container">
            {tags.map((tag) => (
              <button
                key={tag}
                className={`qa-tag-btn ${selectedTag === tag ? "active" : ""}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Q&A Items Accordion */}
        {loading ? (
          <div className="qa-loading">
            <div className="spinner"></div>
            <p>Loading questions...</p>
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="qa-empty">
            <h3>No questions found</h3>
            <p>Try adjusting your search filters or tags.</p>
          </div>
        ) : (
          <div className="qa-accordion-list">
            {filteredQuestions.map((q) => {
              const isExpanded = expandedId === q.id;
              return (
                <div
                  key={q.id}
                  className={`qa-card ${isExpanded ? "expanded" : ""}`}
                >
                  <div
                    className="qa-card-header"
                    onClick={() => toggleExpand(q.id)}
                  >
                    <div className="qa-card-header-left">
                      <h3 className="qa-question-text">{q.question}</h3>
                      <div className="qa-card-tags">
                        {q.tags &&
                          q.tags.map((tag) => (
                            <span key={tag} className="qa-card-tag">
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                    <div className="qa-card-header-right">
                      {isExpanded ? (
                        <FaChevronUp className="qa-toggle-icon" />
                      ) : (
                        <FaChevronDown className="qa-toggle-icon" />
                      )}
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="qa-card-body">
                      <div className="qa-divider"></div>
                      <div className="qa-answer-content">
                        {renderAnswer(q.answer)}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default QAPage;

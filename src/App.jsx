import React, { useState } from "react";
import "./App.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="portfolio-navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <span className="navbar-avatar">GA</span>
          <span className="navbar-name">Gamze Aydın</span>
        </div>
        <button
          className="hamburger-menu"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          ☰
        </button>
        <ul className={`navbar-links${menuOpen ? " menu-open" : ""}`}>
          <li>
            <a href="#about">About Me</a>
          </li>
          <li>
            <a href="#experiences">Experience</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#education">Education</a>
          </li>
        </ul>
        <div className="navbar-socials">
          <a
            href="https://github.com/gamzeaydinnn"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-social-icon"
            aria-label="GitHub"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="#bfc7d5"
              strokeWidth="1.7"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/feed/"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-social-icon"
            aria-label="LinkedIn"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="#bfc7d5"
              strokeWidth="1.7"
              viewBox="0 0 24 24"
            >
              <path d="M7 10v6M7 7v.01M12 10v6m0 0v-3a2 2 0 1 1 4 0v3" />
            </svg>
          </a>
          <a
            href="mailto:gamzeaydin945@gmail.com"
            className="navbar-social-icon"
            aria-label="Mail"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="#bfc7d5"
              strokeWidth="1.7"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="M3 7l9 6 9-6" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

function App() {
  const [showStokModal, setShowStokModal] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [showHepsiburadaModal, setShowHepsiburadaModal] = useState(false);

  return (
    <>
      <Navbar />
      {/* Modal for Stok Takip Sistemi */}
      {showStokModal && (
        <div className="modal-overlay" onClick={() => setShowStokModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* BAŞLIK VE KAPATMA BUTONU İÇİN CONTAINER */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <h2 style={{ color: "#7c4dff", margin: 0, flex: 1 }}>
                Stock Tracking System
              </h2>
              <button
                aria-label="Close"
                style={{
                  background: "none",
                  border: "none",
                  color: "#bfc7d5",
                  fontSize: "2.5rem",
                  cursor: "pointer",
                  padding: 0,
                  lineHeight: 1,
                  marginLeft: "1.2rem",
                }}
                onClick={() => setShowStokModal(false)}
              >
                &times;
              </button>
            </div>
            {/* GÖRSEL GALERİSİ */}
            <div
              style={{
                position: "relative",
                marginBottom: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Sadece video gösterilecek */}
              <iframe
                width="420"
                height="236"
                src="https://www.youtube.com/embed/cEb-CkA6qQA?si=A0p9PSRhafK70Bh6"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{
                  borderRadius: 18,
                  boxShadow: "0 4px 18px 0 rgba(78, 161, 247, 0.18)",
                  border: "2px solid #232b3a",
                  background: "#181922",
                  margin: "0 auto",
                  display: "block",
                  transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
                }}
              />
            </div>
            {/* PROJECT DESCRIPTION */}
            <div
              style={{
                color: "#bfc7d5",
                fontSize: "1.08rem",
                marginBottom: 12,
              }}
            >
              In the fast fashion industry, stocks of popular products and
              certain sizes can run out in seconds. This forces consumers to
              manually check websites to access the products they want. This
              project was developed as a solution to this problem, focusing on
              user experience as an automation tool.
              <br />
              <br />
              The system automatically tracks products from Inditex group (Zara,
              Bershka, Stradivarius, etc.) brands at user-defined intervals.
              When the desired product and size is in stock, it sends an instant
              WhatsApp notification to the user, ensuring they do not miss the
              purchase opportunity.
            </div>

            {/* PROJE ETİKETLERİ */}
            <div className="project-tags">
              <span>JavaScript</span>
              <span>Node.js</span>
              <span>Playwright</span>
            </div>

            {/* GITHUB VE DEMO BUTONLARI */}
            <div
              style={{ display: "flex", gap: "0.5rem", marginTop: "1.2rem" }}
            >
              <a
                href="https://github.com/gamzeaydinnn/stok-takip"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                </svg>
                GitHub
              </a>
              <button
                className="portfolio-main-btn"
                style={{
                  padding: "0.4rem 1.2rem",
                  fontSize: "1rem",
                  background: "#4ea1f7", // Mavi renk
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 0 8px #4ea1f799",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={() => setShowStokModal(true)}
              >
                Demo
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal for Todo App */}
      {showTodoModal && (
        <div className="modal-overlay" onClick={() => setShowTodoModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <h2 style={{ color: "#7c4dff", margin: 0, flex: 1 }}>
                Todo Application
              </h2>
              <button
                aria-label="Close"
                style={{
                  background: "none",
                  border: "none",
                  color: "#bfc7d5",
                  fontSize: "2.5rem",
                  cursor: "pointer",
                  padding: 0,
                  lineHeight: 1,
                  marginLeft: "1.2rem",
                }}
                onClick={() => setShowTodoModal(false)}
              >
                &times;
              </button>
            </div>
            <img
              src="public/images/todo-uygulamasi-ss.png"
              alt="Todo Uygulaması Ekran Görüntüsü"
              style={{
                width: "100%",
                maxWidth: 420,
                height: "auto",
                display: "block",
                margin: "0 auto 1.5rem auto",
                borderRadius: 22,
                boxShadow: "0 8px 32px 0 rgba(78, 161, 247, 0.18)",
                border: "3px solid #232b3a",
                background: "#f5f7fa",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                color: "#bfc7d5",
                fontSize: "1.08rem",
                marginBottom: 12,
              }}
            >
              This project is a full-stack task management (Todo) application
              developed to implement backend services and database operations
              from A to Z, forming the foundation of a modern web application.
              Beyond being just a "to-do list," this project demonstrates my
              skills in building a robust API architecture, managing database
              operations, and testing the API with industry-standard tools.
              <br />
              <br />
              The application allows users to create, view, update, and delete
              tasks. All these operations are performed via a RESTful API
              between the frontend (user interface) and backend (server), and
              data is persistently stored in MongoDB.
            </div>
            <div className="project-tags">
              <span>JavaScript</span>
              <span>Node.js</span>
              <span>MongoDB</span>
              <span>RESTful API</span>
            </div>
            <div
              style={{ display: "flex", gap: "0.5rem", marginTop: "1.2rem" }}
            >
              <a
                href="https://github.com/gamzeaydinnn/inventory-takip"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://demo-link.com/inventory"
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-main-btn"
                style={{ padding: "0.4rem 1.2rem", fontSize: "1rem" }}
              >
                Demo
              </a>
            </div>
          </div>
        </div>
      )}
      {/* Modal for Hepsiburada Automation */}
      {showHepsiburadaModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowHepsiburadaModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <h2 style={{ color: "#7c4dff", margin: 0, flex: 1 }}>
                Hepsiburada Shopping Automation
              </h2>
              <button
                aria-label="Close"
                style={{
                  background: "none",
                  border: "none",
                  color: "#bfc7d5",
                  fontSize: "2.5rem",
                  cursor: "pointer",
                  padding: 0,
                  lineHeight: 1,
                  marginLeft: "1.2rem",
                }}
                onClick={() => setShowHepsiburadaModal(false)}
              >
                &times;
              </button>
            </div>
            <img
              src="public/images/hepsiburada-otomasyon-ss.png"
              alt="Hepsiburada Otomasyonu Ekran Görüntüsü"
              style={{
                width: "100%",
                maxWidth: 420,
                height: "auto",
                display: "block",
                margin: "0 auto 1.5rem auto",
                borderRadius: 22,
                boxShadow: "0 8px 32px 0 rgba(78, 161, 247, 0.18)",
                border: "3px solid #232b3a",
                background: "#f5f7fa",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                color: "#bfc7d5",
                fontSize: "1.08rem",
                marginBottom: 12,
              }}
            >
              Using Node.js-based Playwright, an end-to-end shopping scenario is
              simulated on Hepsiburada. The project validates critical
              e-commerce functions with automated tests.
              <br />
              <br />
              The automation tests product search, adding to cart, and payment
              steps with Playwright, ensuring the security and accuracy of
              e-commerce processes.
            </div>
            <div className="project-tags">
              <span>Playwright</span>
              <span>Node.js</span>
              <span>JavaScript</span>
              <span>Test Otomasyonu</span>
            </div>
            <div
              style={{ display: "flex", gap: "0.5rem", marginTop: "1.2rem" }}
            >
              <a
                href="https://github.com/gamzeaydinnn/hepsiburada"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      )}
      <div className="portfolio-bg">
        <div className="portfolio-container">
          <button className="portfolio-opportunity">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                verticalAlign: "middle",
                marginRight: "0.6rem",
              }}
            >
              {/* Professional Feature Card Style SVG Icon (Star badge, purple theme) */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ verticalAlign: "middle" }}
              >
                <circle cx="16" cy="16" r="14" fill="#7c4dff" />
                <polygon
                  points="16,7 19,14 27,14 20.5,18.5 23,26 16,21.5 9,26 11.5,18.5 5,14 13,14"
                  fill="#fff"
                />
              </svg>
            </span>
            <span style={{ verticalAlign: "middle" }}>
              Open to new opportunities
            </span>
          </button>
          {/* Profil Fotoğrafı */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "1.2rem 0 0.5rem 0",
            }}
          >
            <img
              src="public/images/gamze-profil.jpg"
              alt="Gamze Aydın Profil Fotoğrafı"
              style={{
                width: "170px",
                height: "170px",
                objectFit: "cover",
                objectPosition: "center top",
                borderRadius: "18px",
                boxShadow: "0 4px 24px #232b3a44",
                border: "3px solid #232b3a",
                background: "#181922",
                marginTop: "-0.7rem",
              }}
            />
          </div>
          <h1 className="portfolio-title" style={{ marginTop: "1.2rem" }}>
            Gamze{" "}
            <span className="portfolio-title-highlight portfolio-title-white">
              Aydın
            </span>
          </h1>
          <p className="portfolio-desc">
            A computer engineering student who develops{" "}
            <span className="portfolio-strong">impressive solutions</span> using
            modern programming languages.
          </p>
          <div className="portfolio-tags">
            <span>Java</span>
            <span>C</span>
            <span>JavaScript</span>
            <span>React</span>
            <span>Node.js</span>
          </div>
          <div className="portfolio-buttons">
            <button className="portfolio-main-btn">Explore My Projects</button>
            <a
              className="portfolio-cv-btn"
              href="/GAMZE AYDIN (6).pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="portfolio-cv-icon">⬇</span> CV
            </a>
          </div>
          {/* Hakkımda Bölümü */}
          <section
            className="about-section"
            id="about"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "1.5rem",
              marginTop: "1.2rem",
              marginBottom: "0.5rem",
            }}
          >
            <div
              className="about-card about-fade-in"
              style={{
                maxWidth: "380px",
                background: "#2A3047",
                borderRadius: "28px",
                boxShadow: "0 4px 24px #232b3a44",
                padding: "1.2rem 1.2rem 1rem 1.2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.1rem",
                marginTop: "2.5rem",
              }}
            >
              <h2
                className="about-title"
                style={{
                  color: " #fff",
                  textAlign: "center",
                  fontSize: "2.1rem",
                  fontWeight: 700,
                  letterSpacing: "-0.5px",
                  lineHeight: 1.18,
                  marginBottom: "0.2rem",
                }}
              >
                About Me
              </h2>
              <p
                className="about-text"
                style={{
                  textAlign: "center",
                  color: "#bfc7d5",
                  fontSize: "1.13rem",
                  fontWeight: 400,
                  lineHeight: 1.6,
                  margin: "0 0.2rem",
                }}
              >
                Hi! I'm Gamze Aydın. I love creating modern and innovative
                software solutions with a user-centric and detail-oriented
                approach. I develop projects using Java, JavaScript, React, and
                Node.js. I'm a team player, always eager to learn and open to
                new technologies.In my free time, I work on mobile apps and
                enhance my backend and frontend development skills.
              </p>
            </div>
            <div className="about-feature-list">
              {/* ...feature cards... */}
              <div
                className="feature-card feature-anim"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="feature-icon">
                  {/* Modern Clean Code Icon */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="4"
                      y="8"
                      width="24"
                      height="16"
                      rx="4"
                      fill="#7c4dff"
                    />
                    <rect
                      x="8"
                      y="12"
                      width="16"
                      height="2"
                      rx="1"
                      fill="#fff"
                    />
                    <rect
                      x="8"
                      y="16"
                      width="10"
                      height="2"
                      rx="1"
                      fill="#fff"
                    />
                    <rect
                      x="8"
                      y="20"
                      width="6"
                      height="2"
                      rx="1"
                      fill="#fff"
                    />
                  </svg>
                </span>
                <h3 className="feature-title">Clean Code</h3>
                <p className="feature-desc">
                  Passionate about writing clean, readable, and maintainable
                  code.
                </p>
              </div>
              <div
                className="feature-card feature-anim"
                style={{ animationDelay: "0.2s" }}
              >
                <span className="feature-icon">
                  {/* Modern UI/UX Icon */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="6"
                      y="8"
                      width="20"
                      height="16"
                      rx="5"
                      fill="#7c4dff"
                    />
                    <rect
                      x="10"
                      y="12"
                      width="12"
                      height="2"
                      rx="1"
                      fill="#fff"
                    />
                    <rect
                      x="10"
                      y="16"
                      width="8"
                      height="2"
                      rx="1"
                      fill="#fff"
                    />
                    <circle cx="16" cy="22" r="2" fill="#fff" />
                  </svg>
                </span>
                <h3 className="feature-title">UI/UX Design</h3>
                <p className="feature-desc">
                  Design approach that prioritizes user experience
                </p>
              </div>
              <div
                className="feature-card feature-anim"
                style={{ animationDelay: "0.3s" }}
              >
                <span className="feature-icon">
                  {/* Modern Performance Icon */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polygon points="16,4 28,28 16,22 4,28" fill="#7c4dff" />
                    <circle cx="16" cy="16" r="3" fill="#fff" />
                  </svg>
                </span>
                <h3 className="feature-title">Performance</h3>
                <p className="feature-desc">
                  Developing fast and optimized applications
                </p>
              </div>
              <div
                className="feature-card feature-anim"
                style={{ animationDelay: "0.4s" }}
              >
                <span className="feature-icon">
                  {/* Modern Team Work Icon */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="10" cy="12" r="4" fill="#7c4dff" />
                    <circle cx="22" cy="20" r="4" fill="#7c4dff" />
                    <rect
                      x="10"
                      y="16"
                      width="12"
                      height="2"
                      rx="1"
                      fill="#fff"
                    />
                  </svg>
                </span>
                <h3 className="feature-title">Team Work</h3>
                <p className="feature-desc">
                  Skilled in teamwork and strong communication
                </p>
              </div>
              <div
                className="feature-card feature-anim"
                style={{ animationDelay: "0.5s" }}
              >
                <span className="feature-icon">
                  {/* Modern Passion Icon */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 28s-10-7.5-10-14.5C6 8.5 9 6 12 6c2 0 4 1.5 4 4 0-2.5 2-4 4-4 3 0 6 2.5 6 7.5C26 20.5 16 28 16 28z"
                      fill="#7c4dff"
                    />
                  </svg>
                </span>
                <h3 className="feature-title">Passion</h3>
                <p className="feature-desc">
                  Passionate about technology and continuous learning
                </p>
              </div>
              <div
                className="feature-card feature-anim"
                style={{ animationDelay: "0.6s" }}
              >
                <span className="feature-icon">
                  {/* Modern Goal Oriented Icon */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="16" cy="16" r="12" fill="#7c4dff" />
                    <circle cx="16" cy="16" r="7" fill="#222b3a" />
                    <circle cx="16" cy="16" r="3" fill="#7c4dff" />
                  </svg>
                </span>
                <h3 className="feature-title">Goal Oriented</h3>
                <p className="feature-desc">
                  Goal-oriented work and achievement skills
                </p>
              </div>
            </div>
          </section>
          {/* Deneyimlerim Bölümü */}
          <section className="experiences-section" id="experiences">
            <h2 className="experiences-title">Experiences</h2>
            <p className="experiences-desc">
              Professional experiences that contributed to my growth
            </p>
            <div className="experiences-list">
              {/* Deneyim Kartı 1 */}
              <div
                className="experience-card experience-anim"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="experience-header">
                  <span className="experience-icon">
                    {/* Atakum Belediyesi Logo */}
                    <img
                      src="public/images/atakum-belediyesi-logo.jpg"
                      alt="Atakum Belediyesi"
                      style={{
                        width: "2.2rem",
                        height: "2.2rem",
                        borderRadius: "50%",
                        objectFit: "cover",
                        background: "#fff",
                        boxShadow: "0 2px 8px #222b3a22",
                      }}
                    />
                  </span>
                  <span className="experience-company">Atakum Belediyesi</span>
                  <span className="experience-date">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ verticalAlign: "middle", marginRight: 2 }}
                    >
                      <rect
                        x="2"
                        y="3"
                        width="12"
                        height="11"
                        rx="2"
                        fill="#b39ddb"
                      />
                      <rect
                        x="4"
                        y="6"
                        width="8"
                        height="1.5"
                        rx="0.75"
                        fill="#fff"
                      />
                    </svg>
                    June 2025 - August 2025
                  </span>
                  <span
                    className="experience-type"
                    style={{ marginTop: "0.3rem", display: "inline-block" }}
                  >
                    Internship
                  </span>
                  <span className="experience-location">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ verticalAlign: "middle", marginRight: 2 }}
                    >
                      <circle cx="7" cy="7" r="6" fill="#e57373" />
                      <circle cx="7" cy="7" r="2" fill="#fff" />
                    </svg>
                    Samsun
                  </span>
                </div>
                <div className="experience-role">
                  Fullstack Developer Intern
                </div>
                <div className="experience-content">
                  <p style={{ marginTop: "1rem" }}>
                    I developed a React-based stock tracking application,
                    working on both backend and frontend.
                  </p>
                  <div className="experience-achievements">
                    <span style={{ color: "#4ea1f7", fontWeight: 600 }}>
                      Achievements:
                    </span>
                    <ul>
                      <li>
                        Developed a React-based stock tracking application
                      </li>
                      <li>
                        Actively participated in backend and frontend
                        development processes
                      </li>
                      <li>Developed stock management and reporting modules</li>
                    </ul>
                  </div>
                  <div
                    className="experience-techs"
                    style={{ marginTop: "1.1rem" }}
                  >
                    <span>JavaScript</span>
                    <span>Node.js</span>
                    <span>Playwright</span>
                  </div>
                </div>
              </div>
              {/* Deneyim Kartı 2 */}
              <div
                className="experience-card experience-anim"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="experience-header">
                  <span className="experience-icon">
                    {/* SecureComputing Logo */}
                    <img
                      src="public/images/securecomputing-logo.jpg"
                      alt="SecureComputing"
                      style={{
                        width: "2.2rem",
                        height: "2.2rem",
                        borderRadius: "50%",
                        objectFit: "cover",
                        background: "#fff",
                        boxShadow: "0 2px 8px #222b3a22",
                      }}
                    />
                  </span>
                  <span className="experience-company">SecureComputing</span>
                  <span className="experience-date">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ verticalAlign: "middle", marginRight: 2 }}
                    >
                      <rect
                        x="2"
                        y="3"
                        width="12"
                        height="11"
                        rx="2"
                        fill="#b39ddb"
                      />
                      <rect
                        x="4"
                        y="6"
                        width="8"
                        height="1.5"
                        rx="0.75"
                        fill="#fff"
                      />
                    </svg>
                    March 2025 - June 2025
                    <span
                      className="experience-type"
                      style={{ marginTop: "0.3rem", display: "inline-block" }}
                    >
                      Internship
                    </span>
                  </span>
                  <span
                    className="experience-location"
                    style={{ marginTop: "0.3rem", display: "inline-block" }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ verticalAlign: "middle", marginRight: 2 }}
                    >
                      <circle cx="7" cy="7" r="6" fill="#e57373" />
                      <circle cx="7" cy="7" r="2" fill="#fff" />
                    </svg>
                    Remote
                  </span>
                </div>
                <div className="experience-role">Software Developer Intern</div>
                <div className="experience-content">
                  <p>
                    I worked on web application development processes, including
                    frontend and backend development, test automation, and user
                    interface improvements.
                  </p>
                  <div className="experience-achievements">
                    <span style={{ color: "4ea1f7", fontWeight: 600 }}>
                      Achievements:
                    </span>
                    <ul>
                      <li>Developed a React-based todo app</li>
                      <li>Improved test automation processes</li>
                      <li>Enhanced user interface performance</li>
                    </ul>
                  </div>
                  <div className="experience-techs">
                    <span>React</span>
                    <span>Node.js</span>
                    <span>Jest</span>
                    <span>MongoDB</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Projeler Bölümü */}
          <section className="projects-section" id="projects">
            <h2 className="projects-title">Projects</h2>
            <p className="projects-desc">
              Projects developed with JavaScript and Node.js
            </p>
            <h3 className="projects-featured">Featured Projects</h3>
            <div className="projects-list">
              {/* Proje Kartı 1 */}
              <div
                className="project-card project-anim"
                style={{ animationDelay: "0.1s" }}
              >
                <div
                  className="project-icon-bg"
                  style={{
                    background: "#222b3a",
                    borderRadius: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    minHeight: "120px",
                    marginBottom: "1.1rem",
                  }}
                >
                  {/* Stok Takip Sistemi Geniş Görsel */}
                  <img
                    src="public/images/inditex-stok-takip-paneli-ss.png"
                    alt="Inditex Stok Takip Paneli Ekran Görüntüsü"
                    style={{
                      width: "100%",
                      maxWidth: "100%",
                      height: "auto",
                      display: "block",
                      margin: "0 auto",
                      borderRadius: "16px",
                      boxShadow: "0 8px 32px 0 rgba(78, 161, 247, 0.18)",
                      border: "2px solid #232b3a",
                      background: "#181922",
                      objectFit: "contain",
                      objectPosition: "center",
                    }}
                  />
                </div>
                <div className="project-content">
                  <h4 className="project-title">Stok Tracking System</h4>
                  <p className="project-desc">
                    An automation system that automatically tracks stocks of
                    products from Inditex group (Zara, Bershka, Stradivarius,
                    etc.) brands and sends notifications via WhatsApp.
                  </p>
                  <div className="project-tags">
                    <span>JavaScript</span>
                    <span>Node.js</span>
                    <span>Playwright</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginTop: "1rem",
                    }}
                  >
                    <a
                      href="https://github.com/gamzeaydinnn/stok-takip"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub"
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                      </svg>
                      GitHub
                    </a>
                    <button
                      className="portfolio-main-btn"
                      style={{
                        padding: "0.4rem 1.2rem",
                        fontSize: "1rem",
                        background: "#4ea1f7", // Mavi renk
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 0 8px #4ea1f799",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                      onClick={() => setShowStokModal(true)}
                    >
                      Demo
                    </button>
                  </div>
                </div>
              </div>
              {/* Proje Kartı 2 */}
              <div
                className="project-card project-anim"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="project-icon-bg">
                  {/* Todo Uygulaması Ekran Görüntüsü */}
                  <img
                    src="public/images/todo-uygulamasi-ss.png"
                    alt="Todo Uygulaması Ekran Görüntüsü"
                    style={{
                      width: "100%",
                      maxWidth: "420px",
                      height: "auto",
                      display: "block",
                      margin: "0 auto",
                      borderRadius: "22px",
                      boxShadow: "0 8px 32px 0 rgba(78, 161, 247, 0.18)",
                      border: "3px solid #232b3a",
                      background: "#f5f7fa",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="project-content">
                  <h4 className="project-title">To Do App</h4>
                  <p className="project-desc">
                    A full-stack todo application designed to implement backend
                    and database operations end-to-end in modern web
                    applications, providing task management.
                  </p>
                  <div className="project-tags">
                    <span>JavaScript</span>
                    <span>Node.js</span>
                    <span>MongoDB</span>
                    <span>RESTful API</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginTop: "1rem",
                    }}
                  >
                    <a
                      href="https://github.com/gamzeaydinnn/to-do-app"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub"
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                      </svg>
                      GitHub
                    </a>
                    <button
                      className="portfolio-main-btn"
                      style={{
                        padding: "0.4rem 1.2rem",
                        fontSize: "1rem",
                        background: "#4ea1f7", // Mavi renk
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 0 8px #4ea1f799",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                      onClick={() => setShowTodoModal(true)}
                    >
                      Demo
                    </button>
                  </div>
                </div>
              </div>
              {/* Proje Kartı 3 - Hepsiburada Otomasyon Projesi */}
              <div
                className="project-card project-anim"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="project-icon-bg">
                  {/* Not: 'src' kısmına yüklediğin görselin dosya yolunu yazmalısın. */}
                  <img
                    src="public/images/hepsiburada-otomasyon-ss.png"
                    alt="Hepsiburada Otomasyonu Ekran Görüntüsü"
                    style={{
                      width: "100%",
                      maxWidth: "420px",
                      height: "auto",
                      display: "block",
                      margin: "0 auto",
                      borderRadius: "22px",
                      boxShadow: "0 8px 32px 0 rgba(78, 161, 247, 0.18)",
                      border: "3px solid #232b3a",
                      background: "#f5f7fa",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="project-content">
                  <h4 className="project-title">
                    Hepsiburada Shopping Automation
                  </h4>
                  <p className="project-desc">
                    An end-to-end shopping scenario is simulated on Hepsiburada
                    using Node.js-based Playwright. The project validates
                    critical e-commerce functions with automated tests.
                  </p>
                  <div className="project-tags">
                    <span>Playwright</span>
                    <span>Node.js</span>
                    <span>JavaScript</span>
                    <span>Test Otomasyonu</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginTop: "1rem",
                    }}
                  >
                    <a
                      href="https://github.com/gamzeaydinnn/hepsiburada" // GITHUB LİNKİNİ GÜNCELLE
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub"
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                      </svg>
                      GitHub
                    </a>
                    <button
                      className="portfolio-main-btn"
                      style={{
                        padding: "0.4rem 1.2rem",
                        fontSize: "1rem",
                        background: "#4ea1f7", // Mavi renk
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 0 8px #4ea1f799",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                      onClick={() => setShowHepsiburadaModal(true)} // Bu fonksiyon modal'ı açacak
                    >
                      Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2.5rem",
              }}
            >
              <a
                href="https://github.com/gamzeaydinnn"
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-main-btn github-animated-btn"
                style={{
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                </svg>
                Check Out My GitHub For More Projects.
              </a>
            </div>
          </section>
          {/* Eğitim Bilgilerim Bölümü */}
          <section
            className="education-section"
            id="education"
            style={{ marginTop: "2rem", marginBottom: "1.5rem" }}
          >
            <h2
              className="education-title"
              style={{
                textAlign: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: "2.5rem",
                marginBottom: "0.8rem",
              }}
            >
              Education
            </h2>
            <style>{`
              @media (max-width: 768px) {
                .education-card {
                  min-width: 0 !important;
                  max-width: 99vw !important;
                  padding: 5.5rem 1.2rem 2.2rem 1.2rem !important;
                  min-height: 520px !important;
                  gap: 2.2rem !important;
                  background: #222b3a !important;
                }
                .portfolio-buttons {
                  display: flex !important;
                  flex-direction: column !important;
                  gap: 1rem !important;
                  width: 100% !important;
                  align-items: center !important;
                }
                .portfolio-main-btn, .portfolio-cv-btn {
                  width: 100% !important;
                  min-width: 0 !important;
                  margin: 0 !important;
                  box-sizing: border-box !important;
                }
              }
            `}</style>
            <div
              className="education-card"
              style={{
                maxWidth: 1100,
                minWidth: 700,
                margin: "0 auto",
                background: "rgba(34,43,58,0.97)",
                borderRadius: 32,
                boxShadow: "0 6px 40px 0 #222b3a44",
                padding: "4rem 4rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.7rem",
                minHeight: "370px",
                height: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  flexWrap: "wrap",
                  gap: "1.1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.1rem",
                  }}
                >
                  <span
                    style={{
                      background: "#232b3a",
                      borderRadius: "50%",
                      width: "2.7rem",
                      height: "2.7rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 8px #222b3a22",
                      overflow: "hidden",
                    }}
                  >
                    {/* Ankara Medipol Üniversitesi Logo */}
                    <img
                      src="public/images/ankara-medipol-logo.jpg"
                      alt="Ankara Medipol Üniversitesi"
                      style={{
                        width: "2.2rem",
                        height: "2.2rem",
                        objectFit: "contain",
                      }}
                    />
                  </span>
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "1.35rem",
                        color: "#fff",
                      }}
                    >
                      Ankara Medipol University
                    </div>
                    <div
                      style={{
                        color: "#7c4dff",
                        fontWeight: 500,
                        fontSize: "1.1rem",
                        marginTop: 2,
                      }}
                    >
                      Computer Engineering (Bachelor's)
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.2rem",
                  }}
                >
                  <span
                    style={{
                      color: "#bdbdbd",
                      fontSize: "1.05rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      fill="#bdbdbd"
                      viewBox="0 0 24 24"
                      style={{ marginRight: 2 }}
                    >
                      <path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zm12 6v12H5V8h14zm-7 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10z" />
                    </svg>
                    2022 - 2027
                  </span>
                  <span
                    style={{
                      background: "#223",
                      color: "#7c4dff",
                      borderRadius: 8,
                      padding: "0.35rem 1rem",
                      fontWeight: 600,
                      fontSize: "1rem",
                    }}
                  >
                    GPA: 3.05/4.00
                  </span>
                </div>
              </div>
              <div
                style={{
                  color: "#bdbdbd",
                  fontSize: "1.08rem",
                  marginTop: "0.5rem",
                  marginBottom: "0.2rem",
                }}
              >
                I received comprehensive education in web technologies, software
                development, data structures, and algorithm analysis. Focused on
                frontend and backend technologies with intensive Java-based
                training.
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.7rem",
                  marginTop: "0.2rem",
                }}
              >
                <span
                  style={{
                    background: "#232b3a",
                    color: "#7c4dff",
                    borderRadius: 8,
                    padding: "0.32rem 0.9rem",
                    fontWeight: 500,
                    fontSize: "0.98rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  {/* Grup/Kulüp SVG ikonu */}
                  <svg
                    width="16"
                    height="16"
                    fill="#7c4dff"
                    viewBox="0 0 24 24"
                    style={{ marginRight: 2 }}
                  >
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05C17.16 13.4 19 14.28 19 15.5V19h5v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                  MedCodes Club Member
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
  return (
    <>
      <Navbar />
      <main>
        <div className="portfolio-bg">
          <div className="portfolio-container">
            <h1 className="portfolio-title">
              Gamze{" "}
              <span className="portfolio-title-highlight portfolio-title-white">
                Aydın
              </span>
            </h1>
            <p className="portfolio-desc">
              Computer engineering student passionate about building{" "}
              <span className="portfolio-strong">impactful solutions</span> with
              modern programming languages.
            </p>
            <div className="portfolio-tags">
              <span>Java</span>
              <span>C</span>
              <span>JavaScript</span>
              <span>React</span>
              <span>Node.js</span>
            </div>
            <div className="portfolio-buttons">
              <button className="portfolio-main-btn">View My Portfolio</button>
              <button className="portfolio-cv-btn">
                <span className="portfolio-cv-icon">⬇</span> Download CV
              </button>
            </div>
          </div>
        </div>
        {/* About Section */}
        <section className="about-section" id="about">
          <div className="about-card about-fade-in">
            <h2 className="about-title" style={{ color: "#7c4dff" }}>
              About Me
            </h2>
            <p className="about-text">
              Hi! I'm Gamze Aydın. I love creating modern and innovative
              software solutions with a user-centric and detail-oriented
              approach. I develop projects using Java, JavaScript, React, and
              Node.js. I'm a team player, always eager to learn and open to new
              technologies.
            </p>
          </div>
        </section>
        {/* Experiences Section */}
        <section className="experiences-section" id="experiences">
          <h2 className="experiences-title">Experience</h2>
          <p className="experiences-desc">
            Professional experiences that contributed to my growth
          </p>
          {/* Add experience cards here */}
        </section>
        {/* Projects Section */}
        <section className="projects-section" id="projects">
          <h2 className="projects-title">Projects</h2>
          <p className="projects-desc">
            Projects developed with JavaScript and Node.js
          </p>
          {/* Add project cards here */}
        </section>
        {/* Education Section */}
        <section className="education-section" id="education">
          <h2 className="education-title">Education</h2>
          {/* Add education details here */}
        </section>
      </main>
    </>
  );
}

export default App;

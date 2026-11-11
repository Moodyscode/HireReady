
import { useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000";

function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze(event) {
    event.preventDefault();
    setError("");
    setResult(null);

    if (!file) {
      setError("Please select your CV.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);
    formData.append("jobDescription", jobDescription);

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Analysis failed.");
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "Unable to connect to the API.");
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(event) {
    const selected = event.target.files?.[0] || null;
    setError("");
    setResult(null);

    if (!selected) {
      setFile(null);
      return;
    }

    const extension = selected.name.split(".").pop()?.toLowerCase();

    if (!["pdf", "docx"].includes(extension)) {
      setFile(null);
      event.target.value = "";
      setError("Only PDF and DOCX files are supported.");
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setFile(null);
      event.target.value = "";
      setError("Your CV must be smaller than 5MB.");
      return;
    }

    setFile(selected);
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">
          <span className="brand-icon">H</span>
          <span>HireReady</span>
        </div>
        <span className="nav-label">CV Intelligence Platform</span>
      </header>

      <main className="container">
        <section className="hero">
          <span className="eyebrow">YOUR CAREER, ANALYZED</span>
          <h1>
            Get your CV <span>job-ready.</span>
          </h1>
          <p>
            Compare your CV against a job description, discover
            matching skills, and identify areas to improve.
          </p>
        </section>

        <form className="form-grid" onSubmit={handleAnalyze}>
          <section className="panel">
            <div className="panel-heading">
              <span className="step-number">01</span>
              <div>
                <h2>Upload your CV</h2>
                <p>Choose your latest resume.</p>
              </div>
            </div>

            <label className="upload-area" htmlFor="cv-upload">
              <span className="upload-symbol">↑</span>
              <strong>
                {file ? file.name : "Choose a PDF or DOCX file"}
              </strong>
              <span>Maximum file size: 5MB</span>
            </label>

            <input
              id="cv-upload"
              className="file-input"
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
            />
          </section>

          <section className="panel">
            <div className="panel-heading">
              <span className="step-number">02</span>
              <div>
                <h2>Job description</h2>
                <p>Paste the role you want to apply for.</p>
              </div>
            </div>

            <textarea
              value={jobDescription}
              onChange={(event) => {
                setJobDescription(event.target.value);
                setResult(null);
              }}
              placeholder="Example: We're looking for a Junior Software Developer experienced in React, JavaScript, Python, SQL, Git and Docker..."
              rows={8}
            />
          </section>

          <div className="form-actions">
            {error && <p className="error-message" role="alert">{error}</p>}
            <button className="analyze-button" disabled={loading}>
              {loading ? "Analyzing your CV..." : "Analyze My CV →"}
            </button>
          </div>
        </form>

        {result && (
          <section className="results" aria-live="polite">
            <div className="results-header">
              <div>
                <span className="eyebrow">ANALYSIS COMPLETE</span>
                <h2>Your Match Report</h2>
                <p>{result.filename}</p>
              </div>
              <div className="score">
                <strong>
                  {result.matchPercentage === null
                    ? "N/A"
                    : `${result.matchPercentage}%`}
                </strong>
                <span>Skill match</span>
              </div>
            </div>

            {result.matchPercentage !== null ? (
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${result.matchPercentage}%` }}
                />
              </div>
            ) : (
              <p className="notice">
                No recognized skills were found in the job description.
                Try adding specific technologies or tools.
              </p>
            )}

            <div className="results-grid">
              <div className="result-card">
                <h3>✓ Matched Skills</h3>
                <div className="skills">
                  {result.matchedSkills.length ? (
                    result.matchedSkills.map((skill) => (
                      <span className="skill matched" key={skill}>
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>No matching skills detected.</p>
                  )}
                </div>
              </div>

              <div className="result-card">
                <h3>✕ Missing Skills</h3>
                <div className="skills">
                  {result.missingSkills.length ? (
                    result.missingSkills.map((skill) => (
                      <span className="skill missing" key={skill}>
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>No missing skills detected.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="result-card recommendations">
              <h3>Recommendations</h3>
              {result.recommendations.length ? (
                <ul>
                  {result.recommendations.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>
                  No additional skill recommendations were identified.
                </p>
              )}
            </div>

            <p className="disclaimer">
              Results are based on recognized skill keywords, not
              verified proficiency or overall hiring suitability.
            </p>
          </section>
        )}
      </main>

      <footer className="footer">
        HireReady © {new Date().getFullYear()} · Built for better career decisions
      </footer>
    </div>
  );
}

export default App;

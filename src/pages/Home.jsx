import React from 'react';
import { Link } from 'react-router-dom';
import "../css/home.css"

function Home() {

  const courses = [
    "📚 JavaScript Essentials",
    "💻 Python for Beginners",
    "🔧 Data Structures & Algorithms",
    "🌐 Web Development Bootcamp",
    "🧠 Machine Learning Basics",
  ];

  return (
    <main role="main">
      <section className="hero-content" aria-labelledby="hero-title">
        <h1 id="hero-title">
          Find a job ? Ready to get hired !!
        </h1>
        <p>
          Ready to build a career ? Browse your favourite jobs. Chat among other job-seekers !!
        </p>
        <Link to="/jobs">
          <button className="hero-button">Get Started</button>
        </Link>

        <div className="features" aria-label="Features">
          
          <Link to="/jobs" style={{ textDecoration: 'none', color: 'inherit' }}>
          <article className="card" tabIndex="0">
            <div className="card-icon" aria-hidden="true">💼</div>
            <h3 className="card-title">Browse Jobs</h3>
            <p className="card-description">Easily find and apply to jobs that match your skills.</p>
          </article>
          </Link>

          <Link to="/post-job" style={{ textDecoration: 'none', color: 'inherit' }}>
          <article className="card" tabIndex="0">
            <div className="card-icon" aria-hidden="true">📝</div>
            <h3 className="card-title">Post a Job</h3>
            <p className="card-description">Quickly post job listings and reach the right candidates.</p>
          </article>
          </Link>

          <Link to="/saved-jobs" style={{ textDecoration: 'none', color: 'inherit' }}>
          <article className="card" tabIndex="0">
            <div className="card-icon" aria-hidden="true">⭐</div>
            <h3 className="card-title">Save Favorites</h3>
            <p className="card-description">Keep track of your preferred job listings and come back later.</p>
          </article>
          </Link>
        </div>
        <div className="sliding-courses-container">
          <h3 className="sliding-title">👨‍🎓 Boost Your Skills with These Courses:</h3>
          <div className="sliding-wrapper">
            <div className="sliding-track">
              {courses.map((course, index) => (
                <div key={index} className="course-slide">
                  {course}
                </div>
              ))}
              {courses.map((course, index) => (
                <div key={index + courses.length} className="course-slide">
                  {course}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="manual-slider-container">
  <h3 className="article-title">📖 Tech Trends & Job Insights:</h3>
  <div className="manual-slider" tabIndex="0">
    {[
      {
        title: "The Rise of AI in the Workplace",
        url: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential-at-work",
        desc: "How AI is reshaping hiring and job roles."
      },
      {
        title: "Why Full-Stack Developers Are in Demand",
        url: "https://www.upgrad.com/blog/full-stack-developer-demand-india/",
        desc: "An overview of skills and salary trends."
      },
      {
        title: "Cloud Computing Careers",
        url: "https://www.coursera.org/articles/cloud-computing-career-path?msockid=00de66418ab96cd11e5f73488bdb6df7",
        desc: "Explore career paths in cloud technologies."
      },
      {
        title: "Cybersecurity Job Market Boom",
        url: "https://www.cyberseek.org/pathway.html",
        desc: "Why cybersecurity is a hot field to consider."
      },
      {
        title: "Data Science Career Outlook",
        url: "https://365datascience.com/career-advice/the-future-of-data-science/",
        desc: "Future trends in data-related roles."
      }
    ].map((article, i) => (
      <a
        className="article-card"
        key={i}
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h4>{article.title}</h4>
        <p>{article.desc}</p>
      </a>
    ))}
  </div>
</div>


      </section>
    </main>
  );
}

export default Home;
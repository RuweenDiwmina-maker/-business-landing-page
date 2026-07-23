import { ArrowRight, BarChart3, Globe, Shield, Zap } from 'lucide-react';

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="logo">Nexus<span className="text-gradient">.</span></div>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#testimonials">Testimonials</a>
          </div>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-glow"></div>
        <div className="container">
          <div className="hero-content">
            <h1>Elevate Your Business to the <span className="text-gradient">Next Level</span></h1>
            <p>We provide cutting-edge solutions to help your business scale faster, operate smoother, and dominate your industry.</p>
            <div className="hero-btns">
              <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Start Free Trial <ArrowRight size={18} />
              </button>
              <button className="btn btn-outline">View Portfolio</button>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <h2>Our Core Services</h2>
            <p>Everything you need to build, launch, and scale your digital presence.</p>
          </div>
          <div className="grid">
            <div className="card">
              <div className="card-icon">
                <Globe size={24} />
              </div>
              <h3>Digital Strategy</h3>
              <p>Comprehensive roadmaps tailored to your unique business goals and market position.</p>
            </div>
            <div className="card">
              <div className="card-icon">
                <Zap size={24} />
              </div>
              <h3>Performance Marketing</h3>
              <p>Data-driven campaigns that maximize ROI and bring high-quality leads to your door.</p>
            </div>
            <div className="card">
              <div className="card-icon">
                <Shield size={24} />
              </div>
              <h3>Enterprise Security</h3>
              <p>Bank-grade protection for your digital assets and customer data.</p>
            </div>
            <div className="card">
              <div className="card-icon">
                <BarChart3 size={24} />
              </div>
              <h3>Analytics & Insights</h3>
              <p>Actionable metrics and beautiful dashboards to track your growth in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to transform your business?</h2>
            <p>Join hundreds of forward-thinking companies building the future with Nexus.</p>
            <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              Let's Talk
            </button>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="logo" style={{ marginBottom: '1rem' }}>Nexus<span className="text-gradient">.</span></div>
              <p>Building the next generation of digital experiences for forward-thinking brands.</p>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">News</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Newsletter</a></li>
                <li><a href="#">Help Center</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            &copy; {new Date().getFullYear()} Nexus Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}

export default App

// App.jsx
import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const projects = [
  'BMI Calculator',
  'Age Calculator',
  'To-Do List App',
  // 'Notes App',
  'Expense Tracker',
  'Weather App',
  'Quiz App',
  'Calculator App',
  // 'Portfolio Builder',
  'Movie Search App',
  'Currency Converter',
  'AI Chatbot App',
  'Student Management System',
  'Employee Attendance App',
  'E-Commerce Mini App',
  'Invoice Generator',
  'Library Management System',
  'Hospital Appointment App'
];

const faqs = [
  {
    question: 'Do I need prior coding experience?',
    answer: 'No prior coding experience is required. This course is designed for beginners and will guide you from basics to building real-world applications.'
  },
  {
    question: 'What tools will I learn?',
    answer: 'You\'ll learn modern AI tools, frontend technologies (HTML, CSS, JavaScript), and full-stack development frameworks.'
  },
  {
    question: 'Will I get a certificate?',
    answer: 'Yes! Upon successful completion of the course and projects, you\'ll receive a certificate of completion.'
  },
  {
    question: 'Is there placement assistance?',
    answer: 'Yes, we provide 95% placement support with resume building, interview preparation, and job placement assistance.'
  }
];

function Course() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  let nav = useNavigate()

  function projectNavigation(project){
    setSelectedProject(project)
    let pro = project.slice(0,4)
    nav(`/${pro}`)

  }

  return (
    <div className="App">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 text-sm text-purple-300">
              <span className="font-semibold">15 DAYS</span>
              <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
              <span className="font-semibold">HANDS-ON</span>
              <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
              <span className="font-semibold">PROJECT BASED</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
              Build 15 Real-World<br />
              <span className="gradient-text">AI Powered Apps</span>
            </h1>

            <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
              A practical 15-day AI Bootcamp to learn, build and launch amazing apps – from frontend to full-stack with AI.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="feature-icon-bg w-14 h-14 rounded-xl flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400 leading-tight">No Prior<br />Coding Required</p>
              </div>
              <div className="text-center space-y-3">
                <div className="feature-icon-bg w-14 h-14 rounded-xl flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400 leading-tight">AI Tools<br />Guided Learning</p>
              </div>
              <div className="text-center space-y-3">
                <div className="feature-icon-bg w-14 h-14 rounded-xl flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400 leading-tight">15+ Projects<br />for Strong Portfolio</p>
              </div>
              <div className="text-center space-y-3">
                <div className="feature-icon-bg w-14 h-14 rounded-xl flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400 leading-tight">Certificate<br />of Completion</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => scrollToSection('enroll')} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3.5 rounded-lg font-semibold hover:opacity-90 transition glow-purple">
                Enroll Now – Start Your Journey
              </button>
            </div>
          </div>

          <div className="relative flex justify-center laptop-glow">
            <div className="relative">
              <div className="bg-gray-900 rounded-t-xl overflow-hidden border border-gray-700 w-[520px]">
                <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-gray-900 to-purple-900/30 min-h-[320px]">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">Build.<br />Learn.<br /><span className="text-purple-400">Innovate.</span></h3>
                      <p className="text-gray-400 text-sm mt-2">AI is the future.<br />Be the creator.</p>
                    </div>
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                        <div className="text-4xl font-bold text-purple-400 border-2 border-purple-500/50 rounded-lg px-3 py-1">AI</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    <div className="bg-gray-800/60 rounded-lg p-3 border border-gray-700/50">
                      <p className="text-xs font-semibold mb-2">To-Do App</p>
                      <p className="text-[10px] text-green-400">✓ Learn Projects</p>
                      <p className="text-[10px] text-green-400">✓ Build Pattern</p>
                    </div>
                    <div className="bg-gray-800/60 rounded-lg p-3 border border-gray-700/50">
                      <p className="text-xs font-semibold mb-2">Weather App</p>
                      <p className="text-xl font-bold mt-2">28°C</p>
                      <p className="text-[10px] text-gray-400">New York</p>
                    </div>
                    <div className="bg-gray-800/60 rounded-lg p-3 border border-gray-700/50">
                      <p className="text-xs font-semibold mb-2">AI Chatbot</p>
                      <p className="text-[10px] text-gray-400 mt-2">Hello!<br />How can I help?</p>
                    </div>
                    <div className="bg-gray-800/60 rounded-lg p-3 border border-gray-700/50">
                      <p className="text-xs font-semibold mb-2">Notes App</p>
                      <p className="text-[10px] text-gray-400 mt-2">Meeting Notes</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 rounded-b-lg h-4 mx-[-4px]"></div>
              <div className="bg-gray-600 h-2 mx-8 rounded-b-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details */}
      

      {/* Projects Section - Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {projects.map((project, index) => (
    <div
      key={index}
      onClick={() => projectNavigation(project)}
      className={`cursor-pointer group rounded-2xl p-5 transition-all duration-300 
      bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] 
      border border-purple-900/40 
      shadow-lg hover:shadow-purple-900/40 hover:-translate-y-1
      ${selectedProject === project ? 'ring-2 ring-purple-500 border-purple-500' : ''}`}
    >
      
      {/* Top Icon */}
      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 flex items-center justify-center mb-4 shadow-md">
        <span className="text-white font-bold text-lg">
          {project.charAt(0)}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition">
        {project}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-400 mb-4 leading-relaxed">
        Build a real-world {project.toLowerCase()} using modern tools and AI.
      </p>

      {/* Bottom CTA */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">Click to explore</span>

        <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center group-hover:bg-purple-600 transition">
          <svg
            className="w-4 h-4 text-purple-300 group-hover:text-white transition"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  ))}
</div>

      {/* Benefits Section */}
      <section id="benefits" className="bg-gradient-to-b from-gray-900 to-dark py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold leading-tight">
                Learn. Build. Launch.<br />
                <span className="text-blue-400">Your Future Starts Here!</span>
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-800/50 rounded-lg p-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">Live Sessions</span>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span className="text-sm">Hands-on Projects</span>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">AI Tools Training</span>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span className="text-sm">Certificate</span>
                </div>
              </div>
            </div>

         

            <div id="enroll" className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-center glow-purple">
              <h3 className="text-xl font-bold mb-1">Don't Miss Out!</h3>
              <p className="text-sm opacity-80 mb-6">Limited Seats Only</p>
              <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 rounded-lg font-semibold hover:bg-white/30 transition mb-4">
                Enroll Now →
              </button>
              <p className="text-sm opacity-80">Start Building Your Dream<br />Career with AI</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full inline-block mr-3"></span>
              Frequently Asked Questions
              <span className="w-2 h-2 bg-purple-500 rounded-full inline-block ml-3"></span>
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-600 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* Footer */}
      <footer className="bg-dark border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>© 2026 AI Course. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Course;
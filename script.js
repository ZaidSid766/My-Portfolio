document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------
  // Smooth scrolling for internal links
  // ----------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ----------------------------
  // Scroll to top button functionality
  // ----------------------------
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ----------------------------
  // Typing animation for hero section
  // ----------------------------
  const typingText = [
    "Software Developer",
    "Machine Learning Enthusiast",
    "Data Analyst",
  ];

  let i = 0,
    j = 0,
    currentText = "",
    isDeleting = false;

  function typeEffect() {
    currentText = typingText[i];
    const displayText = currentText.substring(0, j);
    document.getElementById("typing-animation").textContent = displayText;

    if (!isDeleting && j < currentText.length) {
      j++;
      setTimeout(typeEffect, 100);
    } else if (isDeleting && j > 0) {
      j--;
      setTimeout(typeEffect, 50);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) i = (i + 1) % typingText.length;
      setTimeout(typeEffect, 1000);
    }
  }
  typeEffect();

  // ----------------------------
  // Counter Animation on scroll
  // ----------------------------
  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          counter.innerText = "0";

          const updateCounter = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;
            const increment = target / 200;

            if (count < target) {
              counter.innerText = Math.ceil(count + increment);
              setTimeout(updateCounter, 10);
            } else {
              counter.innerText = target;
            }
          };

          updateCounter();
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  // ----------------------------
  // Advanced Scroll Animations for Sections
  // ----------------------------
  const sections = document.querySelectorAll(".section");

  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // ----------------------------
  // Mouse Trail Effect
  // ----------------------------
  const mouseTrail = document.querySelector(".mouse-trail");
  if (mouseTrail) {
    document.addEventListener("mousemove", (e) => {
      mouseTrail.style.left = `${e.clientX}px`;
      mouseTrail.style.top = `${e.clientY}px`;
      mouseTrail.style.opacity = "1";
      mouseTrail.style.transform = `translate(-50%, -50%) scale(1)`;
    });

    document.addEventListener("mouseout", () => {
      mouseTrail.style.opacity = "0";
      mouseTrail.style.transform = `translate(-50%, -50%) scale(0)`;
    });
  }

  // ----------------------------
  // Highlight active nav link on scroll
  // ----------------------------
  const navLinks = document.querySelectorAll(".nav-link");
  const allSections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let current = "";
    allSections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // ----------------------------
  // Project Filter Functionality
  // ----------------------------
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      projectCards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // ----------------------------
  // Project Modal Logic
  // ----------------------------
  const modal = document.getElementById("project-modal");
  const closeBtn = document.querySelector(".close-btn");
  const modalBody = modal.querySelector(".modal-body");

  const projectsData = {
    "ask-for-friend": {
      title: "Ask For Friend",
      img: "funny.png",
      description:
        "A simple and interactive webpage that prompts users with a fun 'Yes' or 'No' choice. When a user hovers over the 'No' button, it randomly moves around the screen, while clicking 'Yes' reveals a hidden image.",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      github: "https://github.com/ZaidSid766/Friend-Request",
      demo: "https://zaidsid766.github.io/Friend-Request/",
    },
    "credit-card": {
      title: "Credit Card Fraud Detection",
      img: "credit.png",
      description:
        "This project uses a variety of machine learning algorithms to accurately detect fraudulent credit card transactions. Key steps included extensive data cleaning, feature engineering, and deploying the model using Streamlit for a user-friendly interface. This showcases my ability to build and deploy end-to-end ML solutions.",
      technologies: [
        "Python",
        "Pandas",
        "Scikit-Learn",
        "Streamlit",
        "TensorFlow",
      ],
      github: "https://github.com/ZaidSid766/Credit_card_Fraud_Detection",
      demo: "#",
    },
    "jarvis-ai": {
      title: "Jarvis AI Assistant",
      img: "jarves.png",
      description:
        "A smart desktop AI assistant built with Python. It can perform a variety of tasks via voice commands, including playing music, opening applications, telling jokes, and providing real-time information by integrating with various APIs. It demonstrates my skills in API integration, natural language processing, and system automation.",
      technologies: ["Python", "SpeechRecognition", "Pyttsx3", "Requests"],
      github: "https://github.com/ZaidSid766/JARVES_AI",
      demo: "#",
    },
    "weather-dashboard": {
      title: "Weather Dashboard",
      img: "weather.png",
      description:
        "A responsive web application that displays real-time weather data for any location. It fetches data from a third-party weather API and presents it with a clean, intuitive user interface. This project highlights my skills in front-end development, asynchronous API calls, and data visualization.",
      technologies: ["HTML", "CSS", "JavaScript", "API Integration"],
      github: "https://github.com/ZaidSid766/Weather-Website",
      demo: "#",
    },
  };

  projectCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const projectId = card.dataset.project;
      const project = projectsData[projectId];

      if (project) {
        modalBody.innerHTML = `
          <h2>${project.title}</h2>
          <img src="${project.img}" alt="${project.title}">
          <p>${project.description}</p>
          <div class="skills-tags">
            ${project.technologies
              .map((tech) => `<span>${tech}</span>`)
              .join("")}
          </div>
          <div class="project-links">
            <a href="${
              project.github
            }" target="_blank">GitHub <i class="fas fa-arrow-up-right-from-square"></i></a>
            <a href="${
              project.demo
            }" target="_blank">Live Demo <i class="fas fa-arrow-up-right-from-square"></i></a>
          </div>
        `;
        modal.style.display = "block";
      }
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // ----------------------------
  // Skill Progress Bar Animation
  // ----------------------------
  const skillItems = document.querySelectorAll(".skill-item");

  const skillsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillLevel = entry.target.dataset.skillLevel;
          const progressBar = entry.target.querySelector(".progress-bar");
          progressBar.style.width = `${skillLevel}%`;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillItems.forEach((item) => skillsObserver.observe(item));

  // ----------------------------
  // Vanta.js Background Initialization
  // ----------------------------
  VANTA.NET({
    el: ".vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0x4da6ff,
    backgroundColor: 0xa0f2d,
  });

  // ----------------------------
  // New: Hamburger Menu Toggle Logic
  // ----------------------------
  const hamburgerBtn = document.querySelector(".hamburger-menu");
  const navLinksContainer = document.querySelector(".nav-links-container");

  hamburgerBtn.addEventListener("click", () => {
    navLinksContainer.classList.toggle("active");
  });

  // Close menu when a link is clicked
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinksContainer.classList.remove("active");
    });
  });

  // ----------------------------
  // New: Dynamic Navbar Background
  // ----------------------------
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});

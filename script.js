/* ============================================================
   ARAFAT HOSSAIN — PORTFOLIO SCRIPT
   Handles: mobile nav toggle, active link on scroll,
   back-to-top button, simple scroll reveal, contact form.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Mobile navigation ---------- */
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");

  const closeNav = () => {
    navToggle.classList.remove("is-open");
    primaryNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.classList.toggle("is-open");
    primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close mobile menu after clicking a nav link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const setActiveLink = () => {
    let currentId = sections[0]?.id;
    const scrollPos = window.scrollY + 120; // offset for sticky navbar

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active-link", link.getAttribute("href") === `#${currentId}`);
    });
  };

  window.addEventListener("scroll", setActiveLink);
  setActiveLink();

  /* ---------- Back to top button ---------- */
  const backToTop = document.getElementById("backToTop");

  const toggleBackToTop = () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 480);
  };

  window.addEventListener("scroll", toggleBackToTop);
  toggleBackToTop();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Simple scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    ".info-card, .skill-card, .project-card, .section-head, .contact__form, .contact__info"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));

  /* ---------- Contact form ---------- */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // NOTE: This is a frontend-only demo. No email is actually sent.
    // To make this form functional, you have two common options:
    //
    // 1) Formspree (https://formspree.io) — create a free form endpoint,
    //    then change the <form> tag to:
    //    <form action="https://formspree.io/f/yourFormId" method="POST">
    //    and you can remove this JS handler entirely, letting the form
    //    submit normally.
    //
    // 2) EmailJS (https://www.emailjs.com) — include their SDK script,
    //    then call emailjs.sendForm('service_id', 'template_id', contactForm)
    //    right here instead of the fake success message below.

    const name = contactForm.name.value.trim();

    if (!contactForm.checkValidity()) {
      formStatus.textContent = "Please fill in all fields correctly.";
      formStatus.style.color = "#e0475c";
      return;
    }

    formStatus.style.color = "";
    formStatus.textContent = `Thanks, ${name}! This form is a frontend demo, so no message was actually sent — connect a backend or a service like Formspree/EmailJS to enable it.`;

    contactForm.reset();
  });
});
"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    navigation.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const year = document.querySelector("[data-current-year]");
if (year) year.textContent = String(new Date().getFullYear());

const enquiryForm = document.querySelector("#enquiry-form");
const formStatus = document.querySelector("#form-status");

if (enquiryForm instanceof HTMLFormElement) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!enquiryForm.reportValidity()) return;

    const formData = new FormData(enquiryForm);
    const message = [
      "Hello Andre JH Building Contractors, I would like to request a quote.",
      `Name: ${String(formData.get("name") || "").trim()}`,
      `Phone: ${String(formData.get("phone") || "").trim()}`,
      `Service: ${String(formData.get("service") || "").trim()}`,
      `Message: ${String(formData.get("message") || "").trim()}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/27716168459?text=${encodeURIComponent(message)}`;
    const openedWindow = window.open(whatsappUrl, "_blank");
    if (openedWindow) openedWindow.opener = null;

    if (formStatus) {
      formStatus.textContent = openedWindow
        ? "Your WhatsApp enquiry is ready to review and send."
        : "Allow pop-ups to open your WhatsApp enquiry, or message us directly using the WhatsApp link.";
    }
    if (openedWindow) enquiryForm.reset();
  });
}

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("js-motion");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".section-label, .intro-grid, .values-strip, .service-row, .portfolio-item, .promise-content, .contact-grid").forEach((element) => {
    element.setAttribute("data-reveal", "");
    revealObserver.observe(element);
  });
}
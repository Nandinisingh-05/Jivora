const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");

// Mobile navigation
menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "Close" : "Menu";
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    if (menuButton) menuButton.textContent = "Menu";
  });
});

// Reveal elements when they enter the viewport
const animatedElements = document.querySelectorAll(
  ".hero-copy, .hero-card, .section, .service, .package, .steps > div, .contact-copy, .contact-form"
);

animatedElements.forEach((element) => element.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animatedElements.forEach((element) => observer.observe(element));
} else {
  animatedElements.forEach((element) => element.classList.add("visible"));
}

// Clicking a package preselects it in the enquiry form
document.querySelectorAll("[data-package]").forEach((link) => {
  link.addEventListener("click", () => {
    const select = document.querySelector("#need");
    if (select) select.value = link.dataset.package;
  });
});

// Prepare an enquiry email — set your actual email before publishing
const form = document.querySelector("#enquiryForm");
const note = document.querySelector("#formNote");
const YOUR_EMAIL = "YOUR_EMAIL@example.com";

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const subject = `Website enquiry - ${data.get("business")}`;
  const message = [
    `Name: ${data.get("name")}`,
    `Business: ${data.get("business")}`,
    `Package: ${data.get("need")}`,
    `Project details: ${data.get("details") || "Not provided"}`
  ].join("\n");

  if (YOUR_EMAIL === "YOUR_EMAIL@example.com") {
    note.textContent =
      "Demo mode: replace YOUR_EMAIL@example.com in script.js with your real email address to enable email enquiries.";
    return;
  }

  window.location.href =
    `mailto:${YOUR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

  note.textContent =
    "Your email app should open with the enquiry drafted. Review it and press Send.";
});
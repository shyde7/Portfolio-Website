import { trackEvent } from "@vercel/analytics";

// Ensure the DOM is fully loaded before running any code
document.addEventListener("DOMContentLoaded", () => {
  // Track a page view event
  trackEvent("page_view", { path: window.location.pathname });

  // Dark Mode Toggle
  const toggleButton = document.getElementById("dark-mode-toggle");

  // Check if the toggle button exists
  if (toggleButton) {
    // Check for saved user preference in localStorage
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      document.body.classList.add("dark-mode");
    }

    // Toggle dark mode on button click
    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      // Change the logo based on the theme
      const liftrytePic = document.getElementById("LRPic");
      if (liftrytePic) {
        liftrytePic.src = document.body.classList.contains("dark-mode")
          ? "images/white-wordmark.png"
          : "images/wordmark.png";
      }

      // Save user preference in localStorage
      const newTheme = document.body.classList.contains("dark-mode")
        ? "dark"
        : "light";
      localStorage.setItem("theme", newTheme);

      // Track the dark mode toggle event
      trackEvent("dark_mode_toggled", { newTheme });
    });
  } else {
    console.error("Dark mode toggle button not found");
  }

  // Email Hover Effect
  const changeEmailToTextOnHover = () => {
    const emailLink = document.querySelector("#email2 a");

    if (emailLink) {
      emailLink.addEventListener("mouseover", () => {
        emailLink.classList.add("fade-out");
        setTimeout(() => {
          emailLink.textContent = "shyde04.contact@gmail.com";
          emailLink.href = "mailto:shyde04.contact@gmail.com";
          emailLink.classList.remove("fade-out");

          // Track the email hover event
          trackEvent("email_hover", { action: "show_email" });
        }, 300);
      });

      emailLink.addEventListener("mouseout", () => {
        emailLink.classList.add("fade-out");
        setTimeout(() => {
          emailLink.textContent = "Email";
          emailLink.href = "#";
          emailLink.classList.remove("fade-out");

          // Track the email hover event
          trackEvent("email_hover", { action: "hide_email" });
        }, 300);
      });
    } else {
      console.error("Email link not found");
    }
  };

  // Window Size Easter Egg
  const checkWindowSize = () => {
    const easterEgg = document.querySelector(".easterEgg");

    if (easterEgg) {
      const isMobile = window.innerWidth <= 700;

      // Only trigger Easter egg on window resize, not initial mobile load
      if (!isMobile) {
        window.addEventListener("resize", () => {
          if (window.innerWidth <= 700) {
            easterEgg.textContent = "Testing the responsiveness? Gotcha!";
            trackEvent("easter_egg_triggered", { size: "mobile" });
          } else {
            easterEgg.textContent = "";
            trackEvent("easter_egg_triggered", { size: "desktop" });
          }
        });
      }
    }
  };

  // Initialize on load
  window.addEventListener("load", checkWindowSize);

  // Initialize on resize
  window.addEventListener("resize", checkWindowSize);

  // Initialize Email Hover Effect
  changeEmailToTextOnHover();
});

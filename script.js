// Ensure the DOM is fully loaded before running any code
document.addEventListener("DOMContentLoaded", () => {
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
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
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
        }, 300);
      });

      emailLink.addEventListener("mouseout", () => {
        emailLink.classList.add("fade-out");
        setTimeout(() => {
          emailLink.textContent = "Email";
          emailLink.href = "#";
          emailLink.classList.remove("fade-out");
        }, 300);
      });
    } else {
      console.error("Email link not found");
    }
  };

  // Window Size Easter Egg
  const checkWindowSize = () => {
    const profSummary = document.querySelector(".profSummary");
    if (profSummary) {
      if (window.innerWidth <= 700) {
        profSummary.textContent = "Testing the responsiveness? Gotcha!";
      } else {
        profSummary.textContent = "I'm an aspiring software developer intern!";
      }
    }
  };

  // Event Listeners for Window Resize and Initial Load
  window.addEventListener("resize", checkWindowSize);
  checkWindowSize(); // Check window size on load

  // Initialize Email Hover Effect
  changeEmailToTextOnHover();
});

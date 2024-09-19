// script.js

document.addEventListener("DOMContentLoaded", () => {
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
      liftrytePic.src = document.body.classList.contains("dark-mode")
        ? "images/white-wordmark.png"
        : "images/wordmark.png";

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
});

const changeEmailToTextOnHover = () => {
  const emailLink = document.querySelector("#email2 a");

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
};

// Check Window Size for Easter Egg
function checkWindowSize() {
  const profSummary = document.querySelector(".profSummary");
  if (window.innerWidth <= 700) {
    profSummary.textContent = "Testing the responsiveness? Gotcha!";
  } else {
    profSummary.textContent = "I'm an aspiring software developer intern!";
  }
}

window.addEventListener("resize", checkWindowSize);
window.addEventListener("load", () => {
  checkWindowSize();
  changeEmailToTextOnHover();
});

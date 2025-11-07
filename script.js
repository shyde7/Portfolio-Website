// Ensure the DOM is fully loaded before running any code
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is fully loaded");
  // Dark Mode Toggle
  const toggleButton = document.getElementById("dark-mode-toggle");

  if (toggleButton) {
    // Check for saved user preference in localStorage
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      console.log("Applying saved dark mode");
      document.body.classList.add("dark-mode");
    }

    // Toggle dark mode on button click
    toggleButton.addEventListener("click", () => {
      console.log("Dark mode button clicked");
      const isDarkMode = document.body.classList.toggle("dark-mode");
      console.log("Dark mode active:", isDarkMode);

      // Save user preference
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");

      // Change the logo based on the theme
      const liftrytePic = document.getElementById("LRPic");
      if (liftrytePic) {
        liftrytePic.src = isDarkMode
          ? "images/white-wordmark.png"
          : "images/wordmark.png";
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
    const easterEgg = document.querySelector(".easterEgg");

    const commentSection = document.getElementById("comment-section");


    if (easterEgg) {
      const isMobile = window.innerWidth <= 700;

      // Only trigger Easter egg on window resize, not initial mobile load
      if (!isMobile) {
        window.addEventListener("resize", () => {
          if (window.innerWidth <= 700) {
            easterEgg.textContent = "Testing the responsiveness? Gotcha!";
          } else {
            easterEgg.textContent = "";
          }
        });
      }
    }

    if(isMobile){

    }
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const phrases = [
    "code!",
    "learn new technology!",
    "contribute to meaningful projects!",
  ];

  const typewriterElement = document.getElementById("typewriter");

  let sleepTime = 80;

  let curPhraseIndex = 0;

  const iterateLoop = async () => {
    while (true) {
      let curWord = phrases[curPhraseIndex];

      for (let i = 0; i < curWord.length; i++) {
        typewriterElement.innerText = curWord.substring(0, i + 1);
        await sleep(sleepTime);
      }
      await sleep(sleepTime * 10);

      for (let i = curWord.length; i > 0; i--) {
        typewriterElement.innerText = curWord.substring(0, i - 1);
        await sleep(sleepTime);
      }

      await sleep(sleepTime * 6);

      if (curPhraseIndex === phrases.length - 1) {
        curPhraseIndex = 0;
      } else {
        curPhraseIndex++;
      }
    }
  };
  iterateLoop();

  const ytButton = document.getElementById("ytButton");

  const closeButton = document.getElementById("close-video-button");
  const videoContainer = document.getElementById("video-container");
  // const youtubeIFrame = document.getElementById("youtube-video");

  // ytButton.addEventListener("click", () =>
  //   videoContainer.style.display = "block"; // Show the video container
  //   youtubeIFrame.src += "&autoplay=1"; // Add autoplay when opened
  // });

  const body = document.getElementById("body");

  ytButton.addEventListener("click", () => {
    videoContainer.classList.add("show");
    videoContainer.style.display = "block";
  });

  closeButton.addEventListener("click", () => {
    videoContainer.style.display = "none"; // Hide the container

    youtubeIFrame.src = youtubeIFrame.src.split("?")[0]; // Stop the video playback
  });

  // Initialize on load
  window.addEventListener("load", checkWindowSize);

  // Intialize on resize
  window.addEventListener("resize", checkWindowSize);

  // Initialize Email Hover Effect
  changeEmailToTextOnHover();

  const commentInput = document.getElementById("comment-input");
  const submitCommentBtn = document.getElementById("submit-comment-btn");
  const commentsList = document.getElementById("comments-list");

  const loadComments = async () => {
    const response = await fetch(
      "https://portfolio-backend-shyde-8fe15b171c93.herokuapp.com/api/comments"
    );
    const comments = await response.json();
    commentsList.innerHTML = "";

    comments.forEach((comment) => {
      const commentItem = document.createElement("li");
      const timeStamp = new Date(comment.timestamp).toLocaleDateString("en-US");
      commentItem.innerHTML = `
      <span style="margin-left: auto;">${comment.commentText}</span>
      <span style = "float: right; font-weight: bold;"> ${timeStamp}</span>
      
    `;
      commentsList.appendChild(commentItem);
    });
  };

  submitCommentBtn.addEventListener("click", async () => {
    const commentText = commentInput.value.trim();

    if (commentText) {
      await fetch(
        "https://portfolio-backend-shyde-8fe15b171c93.herokuapp.com/api/comments",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ commentText }),
        }
      );

      commentInput.value = "";
      await loadComments();
    } else {
      alert("Please enter a comment before submitting.");
    }
  });

  loadComments();
});

// Déclaration des fonctions en dehors de l'écouteur DOMContentLoaded
function openModal(type, content) {
  const modal = document.getElementById("myModal");
  const modalBody = document.getElementById("modal-body");
  const modalContent = document.querySelector(".modal-content");
  const mainContent = document.getElementById("mainContent");

  modal.style.display = "flex";
  mainContent.classList.add("blur-background");
  modalBody.innerHTML = ""; // Assurez-vous que le contenu précédent est effacé
  if (type === "video") {
    modalBody.innerHTML = content;
  } else {
    modalBody.appendChild(content);
  }
  modalContent.style.backgroundColor =
    type === "video" ? "#fefefe52" : "#fefefedb";
}

function closeModal() {
  const modal = document.getElementById("myModal");
  const mainContent = document.getElementById("mainContent");
  modal.style.display = "none";
  mainContent.classList.remove("blur-background");
}

function setupModalEventListeners() {
  document.getElementsByClassName("close")[0].onclick = closeModal;

  window.onclick = function (event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
      closeModal();
    }
  };

  document
    .querySelectorAll(".play-demo, .details-formation")
    .forEach((item) => {
      item.addEventListener("click", (event) => {
        // Logique pour déterminer le contenu basé sur la classe de l'élément
        let content = "";
        if (item.classList.contains("play-demo")) {
          const videoInfo = {
            "plateforme-citoyens":
              "https://www.youtube.com/embed/9vcHJTbel9s?&mute=1",
            "gestion-events":
              "https://www.youtube.com/embed/uefDxXB35bQ?&mute=1",
            "observatoire-commerce":
              "https://www.youtube.com/embed/W9gOhIsv6HQ?&mute=1",
            "analyse-commerciale":
              "https://www.youtube.com/embed/LidD6Dpr6SU?&mute=1",
          };
          const key = Object.keys(videoInfo).find((key) =>
            item.classList.contains(key)
          );
          if (key) {
            // content = `<video width="100%" controls poster="{% static 'images/accueil/poster-${key}.png' %}"><source src=static/videos/${videoInfo[key]} type="video/mp4">Your browser does not support the video tag.</video>`;
            content = `<iframe class="yt-demos" loading="lazy" width="100%" src="${videoInfo[key]}" title="Manager Centre Ville" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

            openModal("video", content);
          }
        } else {
          const template = document.getElementById("formationTemplate");
          const clone = template.content.cloneNode(true);
          openModal("text", clone);
        }
      });
    });
}

// Initialisation à l'intérieur de l'écouteur DOMContentLoaded
document.addEventListener("DOMContentLoaded", (event) => {
  setupModalEventListeners();
});

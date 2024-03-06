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
            "plateforme-citoyens": "plateforme-citoyens.mp4",
            "gestion-events": "gestion-events.mp4",
            "observatoire-commerce": "observatoire-commerce.mp4",
            "analyse-commerciale": "analyse-commerciale.mp4",
          };
          const key = Object.keys(videoInfo).find((key) =>
            item.classList.contains(key)
          );
          if (key) {
            content = `<video width="100%" controls poster="static/images/accueil/poster-${key}.png"><source src=static/videos/${videoInfo[key]} type="video/mp4">Your browser does not support the video tag.</video>`;
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

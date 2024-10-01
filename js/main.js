// Main Variables
let theInput = document.querySelector(".get-repos input"),
  getBtn = document.querySelector(".get-button"),
  reposData = document.querySelector(".show-data");

// Listen for keydown event on input field
theInput.addEventListener("keydown", (event) => {
  // Check if Enter key was pressed
  if (event.key === "Enter") {
    // Call getAvatar() and getRepos() functions
    getAvatar();
    getRepos();
  }
});

getBtn.addEventListener("click", () => {
  getAvatar();
  getRepos();
});
// Get Repos Function
// theInput.onkeyup = function () {
//   getRepos();
// };
function getRepos() {
  if (theInput.value.trim("") == "") {
    // If Value Is Empty
    reposData.innerHTML = "<span>Please Write Github Username</span>";
  } else {
    //   console.log(theInput.value);

    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => response.json())

      .then((data) => {
        // Empty the Container in any case
        reposData.innerHTML = "";
        let rNUmber = document.createElement("p");
        rNUmber.innerHTML = `Number of Repos is : ${data.length}`;
        reposData.appendChild(rNUmber);

        // Quic explaination u make that for each element u creat adiv includ  this div link and text of the name of repo and the stars of repo

        data.forEach((repo) => {
          // Creat MAIN Div
          let mainDiv = document.createElement("div");

          // Creat Text Node
          let textNode = document.createTextNode(repo.name);

          // Append the text inide the main div
          mainDiv.appendChild(textNode);

          // Creat link of repo by using Anchr tag
          let repoLink = document.createElement("a");

          // Creat Text Node of the Link
          let repoLinkText = document.createTextNode("Vist");

          // Append The text node to the repo link

          repoLink.appendChild(repoLinkText);

          // Add the Hyper text Repherns  "href"
          repoLink.href = `https://github.com/${theInput.value}/${repo.name}`;

          // Set attr blank

          repoLink.setAttribute("target", "_blank");

          // append the link to container
          mainDiv.appendChild(repoLink);

          // Creat Stars count Inside Span
          let spanStar = document.createElement("span");

          // Creat Text star count

          let statText = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );

          // Append star Text To the Span
          spanStar.appendChild(statText);

          // Append The Star Span To The Main Div
          mainDiv.appendChild(spanStar);

          // ADD CLASS FOR MAIN DIV
          mainDiv.classList.add("repo-box");

          let containerStarLink = document.createElement("div");
          containerStarLink.appendChild(repoLink);
          containerStarLink.appendChild(spanStar);
          mainDiv.appendChild(containerStarLink);
          // Apend the main div to the container
          reposData.appendChild(mainDiv);
        });
      })
      .catch((reject) => {
        reposData.innerHTML = "The user name is not correct";
        let imgContainer = document.querySelector(".parentImg");
        imgContainer.innerHTML = "";
      });
  }
}

function getAvatar() {
  fetch(`https://api.github.com/users/${theInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      // Empty the Container in any case
      let imgContainer = document.querySelector(".parentImg");
      imgContainer.innerHTML = `<div class="img-container">
      <img src="${data.avatar_url}" alt="" />
      </div>`;
    });
}

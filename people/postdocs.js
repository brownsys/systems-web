const postdocs = [
    {
      name: "Lukas Lazarek",
      photo: "assets/people/lukas.jpg",
      email: "lukas_lazarek@brown.edu",
      website: "https://llazarek.github.io/",
    },
  ];
  

  const postdocGallery = document.getElementById("postdoc-gallery");

  postdocGallery.classList.add(
      "w-100",
      "d-flex",
      "flex-column"
  );
  postdocGallery.style.maxWidth = "1300px";
  postdocGallery.style.width = "100%";
  postdocGallery.innerHTML = "";
  
  const grid = document.createElement("div");
  grid.classList.add("gallery-grid");
  postdocGallery.appendChild(grid);
  
  postdocs.forEach((student) => {
      const item = document.createElement("div");
      item.classList.add("gallery-item");
  
      const emailPart = student.email
          ? `[<a href="mailto:${student.email}">email</a>]`
          : "";
      const websitePart = student.website
          ? `[<a href="${student.website}" target="_blank">website</a>]`
          : "";
  
      item.innerHTML = `
          <img
              class="imgStuff"
              src="${student.photo}"
              alt="${student.name}"
          style="width: 125px; height: 125px; object-fit: cover; margin-bottom: 10px; border-radius: 8px;"
          />
        <div class="gallery-item-details">
          <strong>${student.name}</strong>
          <div class="person-links">
            ${emailPart}${websitePart}
          </div>
        </div>
      `;
      grid.appendChild(item);
  });
  

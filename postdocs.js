const postdocs = [
    {
      name: "Di Jin",
      photo: "assets/people/di.jpg",
      email: "dijin@brown.edu",
      website: "",
    },
    {
      name: "Lukas Lazarek",
      photo: "assets/people/lukas.jpg",
      email: "lukas@brown.edu",
      website: "",
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
              style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%; margin-bottom: 10px;"
          />
        <div class="mt-3 col-lg-2 col-md-12">
          <strong>${student.name}</strong>
          <div class="mt-1" id="links">
            ${emailPart}${websitePart}
          </div>
        </div>
      `;
      grid.appendChild(item);
  });
  
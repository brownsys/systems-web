(() => {
    const phdStudents = [
      {
        name: "Eric Zhao",
        photo: "assets/people/eric.jpg",
        website: "https://mustardfox.org/",
        email: "eric_c_zhao@brown.edu",
      },
      {
        name: "Ethan Lavi",
        photo: "assets/people/ethan.jpg",
        website: "https://ethanlavi.github.io/",
        email: "ethan_lavi@brown.edu",
      },
      {
        name: "Evangelos Lamprou",
        photo: "assets/people/vagos.jpg",
        website: "https://vagos.lamprou.xyz/",
        email: "vagos@lamprou.xyz",
      },
      {
        name: "Franco Solleza",
        photo: "assets/people/franco.jpg",
        website: "https://cs.brown.edu/people/grad/fsolleza/",
        email: "franco@brown.edu",
      },
      {
        name: "Grigoris Ntousakis",
        photo: "assets/people/grigoris.jpg",
        website: "https://www.ntousakis.com/",
        email: "grigoris@brown.edu",
      },
      {
        name: "Howie Chen",
        photo: "assets/people/howie.jpg",
        website: "https://www.howchenn.com/",
        email: "pch@brown.edu",
      },
      {
        name: "Justus Adam",
        photo: "assets/people/justus.jpg",
        website: "https://justus.science/",
        email: "me@justus.science",
      },
    //   {
    //     name: "Kinan Dak Albab",
    //     photo: "assets/people/kinan.jpg",
    //     website: "https://babman.io",
    //     email: "kinan@brown.edu",
    //   },
      {
        name: "Oğuzhan Çölkesen",
        photo: "assets/people/oguzhan.jpg",
        website: "https://www.oguzhancolkesen.com/",
        email: "oguzhan@brown.edu",
      },
    //   {
    //     name: "Samuel Thomas",
    //     photo: "assets/people/samuel.jpg",
    //     website: "",
    //     email: "samuel@brown.edu",
    //   },
      {
        name: "Timothée Zerbib",
        photo: "assets/people/timothee.jpg",
        website: "https://tzerbib.github.io/",
        email: "tzerbib@brown.edu",
      },
      {
        name: "Yuchen Lu",
        photo: "assets/people/yuchen.jpg",
        website: "",
        email: "yuchen_lu@brown.edu",
      },
      {
        name: "Yizheng Xie",
        photo: "assets/people/yizheng.jpg",
        website: "https://yizhengx.github.io/",
        email: "yizheng@brown.edu",
      },
    ].sort((a, b) => a.name.localeCompare(b.name));
  
    const phdGallery = document.getElementById("phd-gallery");
  
    phdGallery.classList.add(
      "w-100",
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "flex-column"
    );
    phdGallery.style.maxWidth = "1300px";
    phdGallery.style.width = "100%";
    phdGallery.innerHTML = "";
  
    const grid = document.createElement("div");
    grid.classList.add("gallery-grid");
    phdGallery.appendChild(grid);
  
    phdStudents.forEach((student) => {
      const item = document.createElement("div");
      item.classList.add("gallery-item");
  
      const emailPart = student.email
        ? `[<a href="mailto:${student.email}">email</a>]`
        : "";
      const websitePart = student.website
        ? `[<a href="${student.website}" target="_blank">website</a>]`
        : "";
      const comma = emailPart && websitePart ? ", " : "";
  
      item.innerHTML = `
        <img
          class="imgStuff"
          src="${student.photo}"
          alt="${student.name}"
          onerror="this.onerror=null;this.src='assets/people/default.jpg';"
          style="width: 125px; height: 125px; object-fit: cover; margin-bottom: 10px; border-radius: 8px;"
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
  })();
  
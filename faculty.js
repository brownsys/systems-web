const faculty = [
    {
        name: "Akshay Narayan",
        role: "Faculty",
        photo: "assets/people/akshay.jpg",
        website: "https://akshayn.xyz/",
        email: "akshayn@brown.edu",
    },
    {
        name: "Deepti Raghavan",
        role: "Faculty",
        photo: "assets/people/deepti.jpg",
        website: "https://deeptir.me/",
        email: "deeptir@brown.edu",
    },
    {
        name: "Malte Schwarzkopf",
        role: "Faculty",
        photo: "assets/people/malte.jpg",
        website: "https://cs.brown.edu/people/malte/",
        email: "malte@cs.brown.edu ",
    },
    {
        name: "Milda Zizyte",
        role: "Faculty",
        photo: "assets/people/milda.jpg",
        website: "https://cs.brown.edu/people/faculty/mzizyte/",
        email: "milda_zizyte@brown.edu",
    },
    {
        name: "Nick DeMarinis",
        role: "Faculty",
        photo: "assets/people/nick.jpg",
        website: "https://vty.sh",
        email: "nicholas_demarinis@brown.edu",
    },
    {
        name: "Nikos Vasilakis",
        role: "Faculty",
        photo: "assets/people/nikos.jpg",
        website: "https://nikos.vasilak.is/",
        email: "nikos@vasilak.is",
    },
    {
        name: "Robert Y. Lewis",
        role: "Faculty",
        photo: "assets/people/robert.jpg",
        website: "https://robertylewis.com/",
        email: "robert_lewis@brown.edu",
    },
    // {
    //     name: "Shriram Krishnamurthi",
    //     role: "Faculty",
    //     photo: "assets/people/shriram.jpg",
    //     website: "https://cs.brown.edu/~sk/",
    //     email: "shriram@brown.edu",
    // },
    {
        name: "Tim Nelson",
        role: "Faculty",
        photo: "assets/people/tim.jpg",
        website: "https://cs.brown.edu/~tbn/",
        email: "Tim_Nelson@brown.edu",
    },
    {
        name: "Ugur Cetintemel",
        role: "Faculty",
        photo: "assets/people/ugur.jpg",
        website: "https://sites.google.com/a/brown.edu/ugur-cetintemel/",
        email: "ugur_cetintemel@brown.edu",
    },
    {
        name: "Vasileios P. Kemerlis",
        role: "Faculty",
        photo: "assets/people/vasilis.jpg",
        website: "https://cs.brown.edu/~vpk/",
        email: "vpk@cs.brown.edu",
    }
    // {
    //     name: "Will P.L. Crichton",
    //     role: "Faculty",
    //     photo: "assets/people/will.jpg",
    //     website: "https://willcrichton.net",
    //     email: "will_crichton@brown.edu",
    // }
];

const gallery = document.getElementById("gallery");

// center-alignment and max width
gallery.classList.add(
    "w-100",
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "flex-column"
);
gallery.style.maxWidth = "1300px";
gallery.style.width = "100%";
gallery.innerHTML = "";

// confirmed speaker legend
const legend = document.createElement("p");
legend.style.marginBottom = "1.5rem";
legend.style.fontSize = "1rem";
legend.style.color = "#ED1C24";
legend.style.textAlign = "left";
legend.style.width = "100%";
gallery.appendChild(legend);

const gridContainer = document.createElement("div");
gridContainer.classList.add("gallery-grid");
gallery.appendChild(gridContainer);

// populate faculty
faculty.forEach((faculty) => {
    const item = document.createElement("div");
    item.classList.add("gallery-item");
  
    // build optional links
    const emailPart = faculty.email
      ? `[<a href="mailto:${faculty.email}">email</a>]`
      : "";
    const websitePart = faculty.website
      ? `[<a href="${faculty.website}" target="_blank">website</a>]`
      : "";

    item.innerHTML = `
      <img
        class="imgStuff"
        src="${faculty.photo}"
        alt="${faculty.name}"
        onerror="this.onerror=null;this.src='assets/people/default.jpg';"
        style="width: 125px; height: 125px; object-fit: cover; margin-bottom: 10px; border-radius: 8px;"
      />
      <div class="mt-3 col-lg-2 col-md-12">
        <strong>${faculty.name}</strong>
        <div class="mt-1" id="links">
          ${emailPart}${websitePart}
        </div>
      </div>
    `;
  
    gridContainer.appendChild(item);
  });
  
const organizers = [
    {
        name: "Akshay Narayan",
        role: "Faculty",
        photo: "assets/akshay.jpg",
        website: "https://akshayn.xyz/",
        confirmedSpeaker: true,
    },
    {
        name: "Deepti Raghavan",
        role: "Faculty",
        photo: "assets/deepti.jpg",
        website: "https://deeptir.me/",
        confirmedSpeaker: true,  
    },
    {
        name: "Malte Schwarzkopf",
        role: "Faculty",
        photo: "assets/malte.jpg",
        website: "https://cs.brown.edu/people/malte/",
        confirmedSpeaker: true,
    },
    {
        name: "Milda Zizyte",
        role: "Faculty",
        photo: "assets/milda.jpg",
        website: "https://cs.brown.edu/people/faculty/mzizyte/",
        confirmedSpeaker: false,
    },
    {
        name: "Nick DeMarinis",
        role: "Faculty",
        photo: "assets/nick.jpg",
        website: "https://vty.sh",
        confirmedSpeaker: false,
    },
    {
        name: "Nikos Vasilakis",
        role: "Faculty",
        photo: "assets/nikos.jpg",
        website: "https://nikos.vasilak.is/",
        confirmedSpeaker: true,
    },
    {
        name: "Robert Y. Lewis",
        role: "Faculty",
        photo: "assets/robert.jpg",
        website: "https://robertylewis.com/",
        confirmedSpeaker: true, 
    },
    {
        name: "Shriram Krishnamurthi",
        role: "Faculty",
        photo: "assets/shriram.jpg",
        website: "https://cs.brown.edu/~sk/",
        confirmedSpeaker: false,
    },
    {
        name: "Tim Nelson",
        role: "Faculty",
        photo: "assets/tim.jpg",
        website: "https://cs.brown.edu/~tbn/",
        confirmedSpeaker: true,
    },
    {
        name: "Ugur Cetintemel",
        role: "Faculty",
        photo: "assets/ugur.jpg",
        website: "https://cs.brown.edu/people/faculty/ugur/",
        confirmedSpeaker: false,
    },
    {
        name: "Vasileios P. Kemerlis",
        role: "Faculty",
        photo: "assets/vasilis.jpg",
        website: "https://cs.brown.edu/~vpk/",
        confirmedSpeaker: true,
    },
    {
        name: "Will P.L. Crichton",
        role: "Faculty",
        photo: "assets/will.jpg",
        website: "https://willcrichton.net",
        confirmedSpeaker: false,
    }
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

// dynamic styles
const style = document.createElement("style");
style.innerHTML = `
  .gallery-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem; /* reduced gap */
    max-width: 1600px;
  }

    .gallery-item {
    flex: 1 1 150px;
    max-width: 170px;
    text-align: center;
    }
  .gallery-item a {
    text-decoration: none;
    color: inherit;
    display: inline-block;
  }

  .gallery-item img {
    width: 80px;         /* smaller image */
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 8px;
  }

    .gallery-item strong {
    color: #ED1C24;
    font-size: 0.95rem;
    white-space: nowrap;        /* single line */
    overflow: hidden;          
    text-overflow: ellipsis;    
    display: inline-block;
    max-width: 100%;            /* item bounds */
    }

  .gallery-item br {
    line-height: 1.2;
  }

  @media (max-width: 768px) {
    .gallery-item {
      flex: 1 1 45%;
    }
  }

  @media (max-width: 480px) {
    .gallery-item {
      flex: 1 1 100%;
    }
  }
`;
document.head.appendChild(style);

// confirmed speaker legend
const legend = document.createElement("p");
legend.innerHTML = '★ <span style="color: #333;">Confirmed Speaker</span>';
legend.style.marginBottom = "1.5rem";
legend.style.fontSize = "1rem";
legend.style.color = "#ED1C24";
legend.style.textAlign = "left";
legend.style.width = "100%";
gallery.appendChild(legend);

const gridContainer = document.createElement("div");
gridContainer.classList.add("gallery-grid");
gallery.appendChild(gridContainer);

// populate organizers
organizers.forEach((organizer) => {
    const item = document.createElement("div");
    item.classList.add("gallery-item", "text-center");

    const star = organizer.confirmedSpeaker ? " ★" : "";

    item.innerHTML = `
        <a href="${organizer.website}" target="_blank" style="text-decoration: none; color: inherit;">
            <img
                class="imgStuff"
                src="${organizer.photo}"
                alt="${organizer.name}"
                style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%; margin-bottom: 10px;"
            />
            <br>
            <strong style="color: #ED1C24;">${organizer.name}${star}</strong>
        </a>
        <br>${organizer.role}
    `;
    gridContainer.appendChild(item);
});
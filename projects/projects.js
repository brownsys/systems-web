const projects = [
  {
    title: "Automating Acceleration and Scale-out of Software Systems",
    // image: "../assets/projects/systems.jpg",
    image: "../assets/projects/stub.png",
    description: `Language-agnostic programming environments hinder automated parallelization and distribution, often forcing developers that deal with large datasets to manually rewrite programs and their components in languages that support these features. We have built a series of systems that accelerate, parallelize, distribute, and scale out computations fully automatically — while maintaining key correctness and security guarantees. Our systems target widely used environments — e.g., JavaScript, Python, the Shell — and are offered by open-source consortia such as the Linux Foundation.`,
    links: [
      { label: "NSDI'23", url: "http://nikos.vasilak.is/p/pash:nsdi:2023.pdf" },
      { label: "OSDI'22", url: "http://nikos.vasilak.is/p/pash:osdi:2022.pdf" },
      { label: "EuroSys'21", url: "http://nikos.vasilak.is/p/pash:eurosys:2021.pdf" }
    ],
    people: {
      "Brown Faculty": [
        { name: "Nikos Vasilakis", url: "https://nikos.vasilak.is/" },
        { name: "Deepti Raghavan", url: "https://deeptir.me/" },
      ],
      "External Collaborators": [
        { name: "Konstantinos Kallas (UCLA)", url: "https://angelhof.github.io/" }
      ]
    }
  },
  {
    title: "Automating Protections Against Software Supply-Chain Threats",
    // image: "../assets/projects/supply-chain.jpeg",
    image: "../assets/projects/stub.png",
    description: `Modern software incorporates thousands of dependencies as a means of accelerating development and reducing cost—risking safety and security for both developers and end-users. We have built a series of systems targeting the JavaScript ecosystem—the largest such ecosystem out there—automating the analysis, transformation, and synthesis of JavaScript dependencies across a variety of threat models.`,
    links: [
      { label: "AsiaCCS'23", url: "http://nikos.vasilak.is/p/binwrap:asiaccs:2023.pdf" },
      { label: "CCS'21", url: "http://nikos.vasilak.is/p/harp:ccs:2021.pdf" },
      { label: "CCS'21", url: "http://nikos.vasilak.is/p/mir:ccs:2021.pdf" }
    ],
    people: {
      "Brown Faculty": [
        { name: "Nikos Vasilakis", url: "https://nikos.vasilak.is/" },
        { name: "Vasileios P. Kemerlis", url: "https://cs.brown.edu/~vpk/" }
      ],
      // "External Collaborators": [
      //   // { name: "First Last", url: "https://example.com" }
      // ]
    }
  },
  {
    title: "Privacy-Compliance by Construction",
    image: "../assets/projects/stub.png",
    description: `Web services that store and process sensitive personal data are critical to the digital economy today, but are often built without sufficient attention to users' rights over their data and its privacy. Doing a good job at data privacy is difficult, requiring substantial manual effort that costs billions of dollars every year. This project develops new software systems that democratize good privacy practices, make it easy for users and web service operators to handle data in compliance with privacy laws, and retain or improve performance. Systems include a database (K9db), programming frameworks for web services (Edna, Sesame), and tools to automatically find privacy bugs (Paralegal).`,
    links: [
      { label: "OSDI'23", url: "https://cs.brown.edu/people/malte/pub/papers/2023-osdi-k9db.pdf" },
      { label: "SOSP'23", url: "https://cs.brown.edu/people/malte/pub/papers/2023-sosp-edna.pdf" },
      { label: "SOSP'24", url: "https://cs.brown.edu/people/malte/pub/papers/2024-sosp-sesame.pdf" },
      { label: "OSDI'25", url: "https://cs.brown.edu/people/malte/pub/papers/2025-osdi-paralegal.pdf" }
    ],
    people: {
      "Brown Faculty": [
        { name: "Malte Schwarzkopf", url: "https://cs.brown.edu/people/malte/" },
        { name: "Will Crichton", url: "https://willcrichton.net" },
        { name: "Shriram Krishnamurthi", url: "https://cs.brown.edu/~sk/" }
      ],
      "External Collaborators": [
        { name: "Kinan Dab Albab (BU)", url: "https://www.babman.io/" },
        { name: "Frans Kaashoek (MIT)", url: "https://people.csail.mit.edu/kaashoek/" },
        { name: "Eddie Kohler (Harvard)", url: "https://www.read.seas.harvard.edu/~kohler/" }
      ]
    }
  },
  {
    title: "Improving Data Center Resource Utilization Through New Abstractions",
    image: "../assets/projects/stub.png",
    description: `Today’s data centers often run at surprisingly low utilization rates, wasting expensive resources, energy, and money. This project investigates how to redesign the abstractions on which contemporary computer systems are built to increase utilization. Examples include enabling servers with low memory to leverage spare memory on others (AIFM, Soft Memory) and decomposing monolithic processes into quickly migratable proclets (Nu, Quicksand). These abstractions let systems exploit otherwise stranded resources without trading off performance for utilization.`,
    links: [
      { label: "OSDI'20", url: "https://www.usenix.org/system/files/osdi20-ruan.pdf" },
      { label: "NSDI'23", url: "https://www.usenix.org/conference/osdi23/presentation/albab" },
      { label: "HotOS'23", url: "https://dl.acm.org/doi/10.1145/3593856.3595902" },
      { label: "NSDI'25", url: "https://www.usenix.org/system/files/nsdi25-ruan.pdf" }
    ],
    people: {
      "Brown Faculty": [
        { name: "Malte Schwarzkopf", url: "https://cs.brown.edu/people/malte/" }
      ],
      "External Collaborators": [
        { name: "Adam Belay (MIT)", url: "http://www.abelay.me/" },
        { name: "Marcos Aguilera (VMWare Research)", url: "https://mkaguilera.kawazoe.org/" },
        { name: "Seo Jin Park (USC)", url: "https://seojinpark.net/" }
      ]
    }
  },
  {
    title: "Improving Computational Notebooks",
    image: "../assets/projects/stub.png",
    description: `Computational notebooks are a key environment for data analysis but present usability challenges. This project explores techniques to make notebooks faster and more intuitive. For example, reactive notebooks should respond to changes without causing unexpected behavior. The goal is to enable rich data analysis with both the flexibility of code and the user-friendliness of spreadsheets.`,
    links: [
      { label: "arXiv Preprint (Coming Soon)", url: "#" }
    ],
    people: {
      "Brown Faculty": [
        { name: "Akshay Narayan", url: "https://akshayn.xyz/" },
        { name: "Deepti Raghavan", url: "https://deeptir.me/" },
        { name: "Nikos Vasilakis", url: "https://nikos.vasilak.is/" },
        { name: "Will Crichton", url: "https://willcrichton.net" }
      ]
    }
  },
  {
    title: "Using the Rust Programming Language to Effectively Build Systems",
    image: "../assets/projects/stub.png",
    description: `Rust’s strong safety features make it an attractive choice for building low-level systems, but effectively leveraging its properties requires expertise. This project investigates techniques to identify systems-critical Rust code that the compiler cannot reason about—such as unsafe Rust—so that experts or automated systems can audit this code efficiently. The goal is to enable Rust’s use in building effective and safe systems.`,
    links: [
      { label: "arXiv Preprint (Coming Soon)", url: "#" }
    ],
    people: {
      "Brown Faculty": [
        { name: "Akshay Narayan", url: "https://akshayn.xyz/" },
        { name: "Deepti Raghavan", url: "https://deeptir.me/" },
        { name: "Malte Schwarzkopf", url: "https://cs.brown.edu/people/malte/" },
        { name: "Will Crichton", url: "https://willcrichton.net" }
      ],
      "External Collaborators": [
        { name: "Kinan Dab Albab (BU)", url: "https://www.babman.io/" },
        { name: "Phil Levis (Stanford)", url: "https://csl.stanford.edu/~pal/" }
      ]
    }
  },
  {
    title: "Making eBPF Kernel Extensions Usable with Domain-Specific Languages",
    image: "../assets/projects/stub.png",
    description: `eBPF enables developers to write safe OS extensions for monitoring, observability, and customization. However, writing eBPF code requires expertise both in the domain and in eBPF programming. This project explores using domain-specific languages (DSLs) to make eBPF extensions easier to write, removing the need for specialized expertise while preserving safety and functionality.`,
    links: [
      { label: "eBPF 2025", url: "https://akshayn.xyz/res/bql_sigcomm_2025.pdf" },
      { label: "PLOS'25", url: "#" }
    ],
    people: {
      "Brown Faculty": [
        { name: "Akshay Narayan", url: "https://akshayn.xyz/" },
        { name: "Malte Schwarzkopf", url: "https://cs.brown.edu/people/malte/" },
        { name: "Nikos Vasilakis", url: "https://nikos.vasilak.is/" },
        { name: "Robert Y. Lewis", url: "https://robertylewis.com/" }
      ],
      "External Collaborators": [
        { name: "Andrew Crotty (Northwestern)", url: "https://cs.brown.edu/people/acrotty/" },
        { name: "Nesime Tatbul (MIT)", url: "people.csail.mit.edu/tatbul/" }
      ]
    }
  }
];

function renderProjects(containerId, projects) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const heading = document.createElement("h2");
  heading.innerText = "Projects";
  container.appendChild(heading);

  projects.forEach(project => {
    const div = document.createElement("div");
    div.className = "mb4";

    // Links to relevant papers
    const paperLinks = (project.links || []).map(
      l => `<a href="${l.url}" target="_blank">${l.label}</a>`
    ).join(", ");

  // Brown Faculty HTML
  let facultyHTML = "";
  if (project.people && project.people["Brown Faculty"]) {
    const members = project.people["Brown Faculty"];
    const links = members.map(person => {
      if (typeof person === "string") return person;
      return `<a href="${person.url}" target="_blank">${person.name}</a>`;
    }).join(", ");
    facultyHTML = `<div style="margin:0;"><strong>Brown Faculty:</strong> ${links}</div>`;
  }

  // External Collaborators HTML
  let collaboratorsHTML = "";
  if (project.people && project.people["External Collaborators"]) {
    const members = project.people["External Collaborators"];
    const links = members.map(person => {
      if (typeof person === "string") return person;
      return `<a href="${person.url}" target="_blank">${person.name}</a>`;
    }).join(", ");
    collaboratorsHTML = `<div style="margin:0;"><strong>External Collaborators:</strong> ${links}</div>`;
  }

      // Create image element (conditionally)
      let imageHTML = "";
      if (project.image) {
        const img = document.createElement("img");
        img.className = "imgStuffResearch";
        img.src = project.image;
        img.alt = project.title;
        img.align = "left";
        img.style.marginRight = "1rem";
        img.style.width = "150px";
  
        // If image fails to load → hide it
        img.onerror = () => img.style.display = "none";
        imageHTML = img.outerHTML;
      }
 
  // ${project.image ? `<img class="imgStuffResearch" src="${project.image}" alt="${project.title}" align="left" style="margin-right:1rem; width:150px;" />` : ""}
  
  // Final HTML
  div.innerHTML = `
    ${imageHTML}
    <h3>${project.title}</h3>
    ${facultyHTML}
    ${paperLinks ? `<div style="margin:0;"><strong>Relevant Papers:</strong> ${paperLinks}</div>` : ""}
    ${collaboratorsHTML}
    <p style="margin-top:0.5em;">${project.description}</p>
    <div style="clear:both;"></div>
  `;

    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects("projects", projects);
});

const projects = [
    {
      title: "Automating Protections Against Software Supply-Chain Threats",
      image: "../assets/projects/supply-chain.jpeg",
      description: `Modern software incorporates thousands of dependencies as a means of accelerating development and reducing cost—risking safety and security for both developers and end-users. We have built a series of systems targeting the JavaScript ecosystem—the largest such ecosystem out there—automating the analysis, transformation, and synthesis of JavaScript dependencies across a variety of threat models.`,
      links: [
        { label: "AsiaCCS'23", url: "http://nikos.vasilak.is/p/binwrap:asiaccs:2023.pdf" },
        { label: "CCS'21", url: "http://nikos.vasilak.is/p/harp:ccs:2021.pdf" },
        { label: "CCS'21", url: "http://nikos.vasilak.is/p/mir:ccs:2021.pdf" }
      ],
      pageRef: "supply-chain.md",
      people: {
        "Brown Faculty": [
          { name: "Nikos Vasilakis", url: "https://nikos.vasilak.is/" }
        ],
        "External Collaborators": [
          { name: "First Last", url: "https://example.com" }
        ]
      }
    },
    {
      title: "Automating Acceleration and Scale-out of Software Systems",
      image: "../assets/projects/systems.jpg",
      description: `Language-agnostic programming environments hinder automated parallelization and distribution, often forcing developers that deal with large datasets to manually rewrite programs and their components in languages that support these features. We have built a series of systems that accelerate, parallelize, distribute, and scale out computations fully automatically — while maintaining key correctness and security guarantees. Our systems target widely used environments — e.g., JavaScript, Python, the Shell — and are offered by open-source consortia such as the Linux Foundation.`,
      links: [
        { label: "NSDI'23", url: "http://nikos.vasilak.is/p/pash:nsdi:2023.pdf" },
        { label: "OSDI'22", url: "http://nikos.vasilak.is/p/pash:osdi:2022.pdf" },
        { label: "EuroSys'21", url: "http://nikos.vasilak.is/p/pash:eurosys:2021.pdf" }
      ],
      pageRef: "systems.md",
      people: {
        "Brown Faculty": [
          { name: "Nikos Vasilakis", url: "https://nikos.vasilak.is/" }
        ],
        "External Collaborators": [
          { name: "Konstantinos Kallas", url: "https://angelhof.github.io/" }
        ]
      }
    }
    // Add more projects...
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
  
      const links = (project.links || []).map(
        l => `<a href="${l.url}" target="_blank">${l.label}</a>`
      ).join(", ");
  
      const peopleHTML = project.people
      ? Object.entries(project.people).map(([role, members]) => {
          const links = members.map(person => {
            if (typeof person === "string") return person; // fallback
            return `<a href="${person.url}" target="_blank">${person.name}</a>`;
          }).join(", ");
          return `<p style="margin: 0;"><strong>${role}:</strong> ${links}</p>`;
        }).join("")
      : "";
      
      div.innerHTML = `
        ${project.image ? `<img class="imgStuffResearch" src="${project.image}" alt="${project.title}" align="left" style="margin-right:1rem; width:150px;" />` : ""}
        <h3><a href="${project.pageRef}">${project.title}</a></h3>
        ${peopleHTML}
        <p>${project.description} Examples: ${links}.</p>
        <div style="clear:both;"></div>
      `;
  
      container.appendChild(div);
    });
  }
    
  document.addEventListener("DOMContentLoaded", () => {
    renderProjects("projects", projects);
  });  
class SiteHeader extends HTMLElement {
  connectedCallback() {
    // Dynamically choose base URL depending on environment
    const isLocalhost = window.location.hostname === "localhost";
    const base = isLocalhost
      ? "http://localhost:8000/"
      : "https://atlas.cs.brown.edu/KtbxLzFvRgzPLQTVqWjTslGNMtkHCvzbDB/systems-at-brown/";

    this.innerHTML = `
      <header class="site-header">
        <div class="wrapper">
          <nav class="site-nav">
            <div class="site-title">
              <a href="${base}index.html">Systems@Brown</a>
            </div>
            <div class="trigger">
              <a class="page-link" href="${base}index.html">Home</a>
              <a class="page-link" href="${base}index.html#people">People</a>
              <a class="page-link" href="${base}projects/index.html">Projects</a>
              <a class="page-link" href="${base}publications/index.html">Publications</a>
              <a class="page-link" href="${base}sysread/index.html">Sysread</a>
              <a class="page-link" href="https://brown-systems-week.github.io">Week</a>
            </div>
          </nav>
        </div>
      </header>
    `;

    // Highlight the active link
    const current = window.location.pathname.split("/").pop();
    this.querySelectorAll(".page-link").forEach(link => {
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  }
}

customElements.define("site-header", SiteHeader);


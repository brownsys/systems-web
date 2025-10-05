class SiteHeader extends HTMLElement {
  connectedCallback() {
    const depth = Math.max(0, window.location.pathname.split("/").filter(Boolean).length - 1);
    const prefix = "../".repeat(depth);    

    this.innerHTML = `
      <header class="site-header">
        <div class="wrapper">
          <nav class="site-nav">
            <div class="site-title"><a href="${prefix}index.html">Systems@Brown</a></div>
            <div class="trigger">
              <a class="page-link" href="${prefix}index.html">Home</a>
              <a class="page-link" href="${prefix}index.html#people">People</a>
              <a class="page-link" href="${prefix}projects/index.html">Projects</a>
              <a class="page-link" href="${prefix}publications/index.html">Publications</a>
              <a class="page-link" href="${prefix}sysread/index.html">Sysread</a>
              <a class="page-link" href="https://brown-systems-week.github.io">Week</a>
            </div>
          </nav>
        </div>
      </header>
    `;

    // Highlight active link
    const current = window.location.pathname.split("/").pop();
    this.querySelectorAll(".page-link").forEach(link => {
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  }
}

customElements.define("site-header", SiteHeader);

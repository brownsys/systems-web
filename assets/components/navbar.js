class SiteHeader extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <header class="site-header">
          <div class="wrapper">
            <nav class="site-nav">
              <div class="site-title"><a href="../index.html">Systems@Brown</a></div>
              <div class="trigger">
                <a class="page-link" href="../index.html">Home</a>
                <a class="page-link" href="../projects/index.html">Projects</a>
                <a class="page-link" href="../publications/index.html">Publications</a>
                <a class="page-link" href="../sysread/index.html">Sysread</a>
              </div>
            </nav>
          </div>
        </header>
      `;
  
      // Optional: highlight the active page link
      const current = window.location.pathname.split("/").pop();
      this.querySelectorAll(".page-link").forEach(link => {
        if (link.getAttribute("href").includes(current)) {
          link.classList.add("active");
        }
      });
    }
  }
  
  customElements.define("site-header", SiteHeader);
  
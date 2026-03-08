(function () {
  const escapeHTML = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  function uniqueYears(entries) {
    return [...new Set(entries.map((entry) => Number.parseInt(entry.year, 10)).filter(Boolean))].sort((a, b) => b - a);
  }

  function topTags(entries, limit) {
    const tagMap = new Map();
    entries.forEach((entry) => {
      (entry.tags || []).forEach((tag) => {
        const key = String(tag || "").trim().toLowerCase();
        if (!key) return;
        if (!tagMap.has(key)) {
          tagMap.set(key, { label: key, count: 0 });
        }
        tagMap.get(key).count += 1;
      });
    });

    return [...tagMap.entries()]
      .sort((a, b) => {
        if (b[1].count !== a[1].count) return b[1].count - a[1].count;
        return a[1].label.localeCompare(b[1].label);
      })
      .slice(0, limit)
      .map(([key, value]) => [key, value.label]);
  }

  function buildFilters(entries) {
    const years = uniqueYears(entries);
    const tags = topTags(entries, 5);
    const recentYears = years.slice(0, 3);
    const olderThreshold = recentYears[recentYears.length - 1];
    const olderStart = olderThreshold ? olderThreshold - 1 : 0;
    const oldestYear = years[years.length - 1] || 0;
    const olderLabel = olderStart && oldestYear && olderStart >= oldestYear
      ? `${olderStart}–${oldestYear}`
      : "";

    return `
      <aside class="pub-filters">
        <div class="filter-section">
          <h3 class="filter-title">Tags</h3>
          <div id="tagFilters" class="filter-row">
            ${tags.map(([key, label]) => `<button type="button" class="pill filter-tag" data-value="${escapeHTML(key)}"><span>${escapeHTML(label)}</span><span class="pill-x hidden">X</span></button>`).join("")}
          </div>
        </div>

        <div class="filter-section">
          <h3 class="filter-title">Years</h3>
          <div id="yearFilters" class="filter-row">
            ${recentYears.map((year) => `<button type="button" class="pill filter-year" data-value="${year}"><span>${year}</span><span class="pill-x hidden">X</span></button>`).join("")}
            ${olderLabel ? `<button type="button" class="pill filter-year" data-value="older"><span>${olderLabel}</span><span class="pill-x hidden">X</span></button>` : ""}
          </div>
        </div>
      </aside>
    `;
  }

  function buildItem(entry) {
    const id = (entry.id || entry.title || "pub").replace(/[^\w-]+/g, "").toLowerCase();
    const links = [];
    const primaryLink = entry.pdf || entry.url;
    if (primaryLink) links.push(`<a href="${escapeHTML(primaryLink)}" target="_blank" rel="noopener">PDF/Link</a>`);
    if (entry.code) links.push(`<a href="${escapeHTML(entry.code)}" target="_blank" rel="noopener">Code/Artifact</a>`);
    if (entry.doi) links.push(`<a href="https://doi.org/${encodeURIComponent(entry.doi)}" target="_blank" rel="noopener">DOI</a>`);
    if (entry.bibtex) links.push(`<a class="bibtex" data-target="${id}-bib">BibTeX</a>`);

    const venue = entry.venue || entry.school || "";
    const venueLine = venue ? `<span class="periodical"><em>${escapeHTML(venue)}</em></span>` : "";
    const tags = Array.isArray(entry.tags) ? entry.tags : [];
    const linksLine = links.length ? `<span class="links">[ ${links.join(" | ")} ]</span>` : "";

    return `
      <li class="pub" data-year="${escapeHTML(entry.year || "")}" data-tags="${escapeHTML(tags.join("||"))}">
        <div id="${id}">
          <span class="title">${escapeHTML(entry.title || "Untitled")}</span>
          <span class="author">${escapeHTML(entry.authors || "")}</span>
          ${venueLine}
          ${linksLine}
          ${entry.bibtex ? `<span id="${id}-bib" class="bibtex hidden"><pre>${escapeHTML(entry.bibtex)}</pre></span>` : ""}
        </div>
      </li>`;
  }

  function buildResults(entries) {
    const byYear = new Map();
    entries.forEach((entry) => {
      const year = entry.year || "Earlier";
      if (!byYear.has(year)) byYear.set(year, []);
      byYear.get(year).push(entry);
    });

    const years = Array.from(byYear.keys()).sort((a, b) => Number(b) - Number(a));

    let html = `<p id="pubNoResults" class="pub-status hidden">No publications match the current filters.</p>`;
    years.forEach((year) => {
      html += `
        <section class="year-block" data-year="${escapeHTML(year)}">
          <h3 class="year">${escapeHTML(year)}</h3>
          <ol class="bibliography" style="list-style:none;padding-left:0;margin:0">
            ${byYear.get(year).map(buildItem).join("")}
          </ol>
        </section>
      `;
    });

    return html;
  }

  function applyFilters(root) {
    const allYears = [...root.querySelectorAll(".filter-year")]
      .map((el) => Number.parseInt(el.dataset.value, 10))
      .filter(Boolean)
      .sort((a, b) => b - a);
    const olderCutoff = allYears[allYears.length - 1] || 0;

    const selectedTags = new Set(
      [...root.querySelectorAll(".filter-tag.selected")].map((el) => el.dataset.value)
    );
    const selectedYears = new Set(
      [...root.querySelectorAll(".filter-year.selected")].map((el) => el.dataset.value)
    );

    let found = false;

    root.querySelectorAll(".year-block").forEach((yearBlock) => {
      let visibleInYear = 0;

      yearBlock.querySelectorAll(".pub").forEach((pub) => {
        const pubTags = String(pub.dataset.tags || "")
          .split("||")
          .map((tag) => tag.trim().toLowerCase())
          .filter(Boolean);

        const pubYear = Number.parseInt(pub.dataset.year || "0", 10);
        const yearMatch =
          selectedYears.size === 0 ||
          selectedYears.has(pub.dataset.year) ||
          (selectedYears.has("older") && pubYear <= olderCutoff);
        const tagMatch = selectedTags.size === 0 || pubTags.some((tag) => selectedTags.has(tag));
        const visible = yearMatch && tagMatch;

        pub.style.display = visible ? "" : "none";
        if (visible) {
          visibleInYear += 1;
          found = true;
        }
      });

      yearBlock.style.display = visibleInYear ? "" : "none";
    });

    root.querySelector("#pubNoResults")?.classList.toggle("hidden", found);
  }

  function attachInteractions(root) {
    root.querySelectorAll("a.bibtex").forEach((link) => {
      link.addEventListener("click", () => {
        const target = link.getAttribute("data-target");
        const block = target ? document.getElementById(target) : null;
        if (block) block.classList.toggle("hidden");
      });
    });

    root.querySelectorAll(".pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        pill.classList.toggle("selected");
        pill.querySelector(".pill-x")?.classList.toggle("hidden");
        applyFilters(root);
      });
    });
  }

  function render(data, container) {
    const entries = Array.isArray(data.entries) ? data.entries : [];
    if (!entries.length) {
      container.innerHTML = "<p>No entries found.</p>";
      return;
    }

    container.innerHTML = `
      <div class="publications-container" id="publicationsApp">
        <div class="pub-layout">
          ${buildFilters(entries)}
          <div class="pub-results">
            ${buildResults(entries)}
          </div>
        </div>
      </div>
    `;

    attachInteractions(container);
    applyFilters(container);

    if (!document.getElementById("pubs-injected-style")) {
      const style = document.createElement("style");
      style.id = "pubs-injected-style";
      style.textContent = `
.hidden{display:none}
.publications-container .pub-layout{display:grid;grid-template-columns:16rem minmax(0,1fr);gap:1.5rem;align-items:start}
.publications-container .pub-filters{position:sticky;top:1rem}
.publications-container .filter-section + .filter-section{margin-top:1.25rem}
.publications-container .filter-title{font-size:1rem;font-weight:700;margin:0 0 .5rem;color:inherit}
.publications-container .filter-row{display:flex;flex-wrap:wrap;gap:.5rem}
.publications-container .pill{display:flex;align-items:center;gap:.4rem;padding:6px 12px;background:transparent;border:1px solid #d1d5db;border-radius:20px;cursor:pointer;font-size:.875rem;color:inherit}
.publications-container .pill.selected{background:rgba(237,28,36,.08);border-color:#e7a7a9;color:#b4232a}
.publications-container .pill .pill-x{font-size:.8rem}
.publications-container .pub-status{margin:0 0 1rem;color:#4b5563;font-size:.95rem}
.bibliography>.pub{margin:1rem 0 1.3rem}
.year-block + .year-block{margin-top:2.5rem}
.year{margin:0 0 1rem;color:#999}
.title{display:block;font-weight:700;font-size:1.05rem}
.author{display:block}
.periodical{display:block}
.links{display:block}
.bibtex pre{margin-top:.5rem;overflow-x:auto}
@media (max-width:768px){.publications-container .pub-layout{grid-template-columns:1fr}.publications-container .pub-filters{position:static}}
`;
      document.head.appendChild(style);
    }
  }

  async function boot() {
    const container = document.getElementById("pubs");
    if (!container) return;

    const jsonFile = container.dataset.json || "./publications_generated.json";

    try {
      const response = await fetch(jsonFile, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      render(data, container);
    } catch (error) {
      container.innerHTML = `<p>Failed to load publications: ${escapeHTML(error.message)}</p>`;
    }
  }

  document.addEventListener("DOMContentLoaded", boot);
})();

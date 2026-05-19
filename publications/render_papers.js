(function () {
  const DEFAULT_BIB_SOURCES = [
    { url: "./etos.bib" },
    { url: "https://raw.githubusercontent.com/atlas-brown/bib/main/atlas.bib" },
    { url: "https://raw.githubusercontent.com/atlas-brown/bib/main/theses.bib" },
    { url: "https://deeptir.me/papers/deeptir.bib" },
    { url: "https://akshayn.xyz/res/akshay.bib" }
  ];

  const TYPE_LABELS = {
    article: "Article",
    inproceedings: "Conference",
    inbook: "Book Chapter",
    book: "Book",
    phdthesis: "PhD Thesis",
    mastersthesis: "Masters Thesis"
  };

  const escapeHTML = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const clean = (value) =>
    String(value || "")
      .replace(/[{}]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  function parseAuthors(value) {
    return clean(value)
      .split(/\s+and\s+/i)
      .map((author) => {
        const parts = author.split(",").map(clean).filter(Boolean);
        if (parts.length >= 2) return `${parts.slice(1).join(" ")} ${parts[0]}`.trim();
        return clean(author);
      })
      .filter(Boolean)
      .join(", ");
  }

  function parseTags(rawValue) {
    const text = clean(rawValue);
    if (!text) return [];

    const seen = new Set();
    const out = [];
    for (const keyword of text.split(/\s*[;,]\s*/).map(clean).filter(Boolean)) {
      const key = keyword.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        out.push(keyword);
      }
    }

    return out;
  }

  function sanitizeBibText(text) {
    return String(text || "")
      .replace(/@(\w+)\s*(\S)/gi, (_, type, next) => (next === "{" ? `@${type}{` : `@${type}{${next}`))
      .replace(/@(\w+)\s*\{\s*([^,\n]+)\s*,?/g, (_, type, key) => `@${type}{${String(key).trim()},`)
      .replace(/([}"])\s*\n(\s*[A-Za-z][\w-]*\s*=)/g, "$1,\n$2");
  }

  function toBibtex(rawEntry, fallbackId) {
    const entryType = clean(rawEntry.entryType || "misc").toLowerCase() || "misc";
    const citationKey = clean(rawEntry.citationKey || fallbackId || "entry");
    const tags = rawEntry.entryTags || {};

    const lines = Object.entries(tags)
      .filter(([, value]) => String(value || "").trim() !== "")
      .map(([key, value]) => `  ${key} = {${String(value).trim()}}`);

    if (lines.length === 0) return `@${entryType}{${citationKey}\n}`;
    return `@${entryType}{${citationKey},\n${lines.join(",\n")}\n}`;
  }

  function isPreprint(entry) {
    const venue = clean(entry.venue).toLowerCase();
    const archivePrefix = clean(entry.archiveprefix).toLowerCase();
    const url = clean(entry.url).toLowerCase();

    return Boolean(
      clean(entry.eprint) ||
      archivePrefix === "arxiv" ||
      venue.includes("arxiv") ||
      venue === "corr" ||
      url.includes("arxiv.org")
    );
  }

  function isThesis(entry) {
    const type = clean(entry.type).toLowerCase();
    const thesisType = clean(entry.thesis_type).toLowerCase();
    return type.includes("thesis") || thesisType.includes("thesis");
  }

  function isWorkshop(entry) {
    if (isPreprint(entry) || isThesis(entry)) return false;

    const venue = clean(entry.venue).toLowerCase();
    const workshopHints = [
      "workshop",
      "hotos",
      "hotnets",
      "apsys",
      "edgesys",
      "plos",
      "damon",
      "ebpf"
    ];

    return workshopHints.some((hint) => venue.includes(hint));
  }

  function publicationBucket(entry) {
    if (isThesis(entry)) return 3;
    if (isPreprint(entry)) return 2;
    if (isWorkshop(entry)) return 1;
    return 0;
  }

  function peerReviewedRank(entry) {
    const type = clean(entry.type).toLowerCase();
    if (type === "inproceedings") return 0;
    if (type === "article") return 1;
    if (type === "inbook" || type === "book") return 2;
    if (type === "techreport") return 3;
    return 4;
  }

  function thesisInstitutionRank(entry) {
    if (entry.type !== "phdthesis" && entry.type !== "mastersthesis") {
      return 0;
    }

    const school = clean(entry.school || entry.venue).toLowerCase();
    return school.includes("brown") ? 0 : 1;
  }

  function isBrownThesis(entry) {
    if (!isThesis(entry)) return true;
    return thesisInstitutionRank(entry) === 0;
  }

  function typeInfo(rawType, rawTags) {
    const raw = clean(rawType).toLowerCase();
    if (raw) return { key: raw, label: TYPE_LABELS[raw] || raw };

    const thesisType = clean(rawTags.type || rawTags.document_type || rawTags.genre).toLowerCase();
    if (thesisType.includes("phd")) return { key: "phdthesis", label: TYPE_LABELS.phdthesis };
    if (thesisType.includes("thesis")) return { key: "mastersthesis", label: TYPE_LABELS.mastersthesis };

    return { key: "misc", label: "Misc" };
  }

  function parseSource(bibText) {
    const sanitized = sanitizeBibText(bibText);
    const rawItems = window.bibtexParse.toJSON(sanitized);

    return rawItems.map((raw, index) => {
      const id = clean(raw.citationKey || `entry-${index}`);
      const rawTags = raw.entryTags || {};
      const info = typeInfo(raw.entryType, rawTags);
      const doi = clean(rawTags.doi).replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, "");
      const url = clean(rawTags.url) || (doi ? `https://doi.org/${doi}` : "");
      const year = Number.parseInt(clean(rawTags.year), 10) || 0;

      return {
        id,
        year,
        type: info.key,
        type_label: info.label,
        title: clean(rawTags.title) || "Untitled",
        authors: parseAuthors(rawTags.author),
        venue: clean(rawTags.booktitle || rawTags.journal || rawTags.school || rawTags.publisher),
        abstract: clean(rawTags.abstract),
        thesis_type: clean(rawTags.type),
        school: clean(rawTags.school || rawTags.institution),
        tags: parseTags(rawTags.tags),
        pdf: clean(rawTags.pdf),
        code: clean(rawTags.code || rawTags.artifact),
        doi,
        url,
        eprint: clean(rawTags.eprint),
        archiveprefix: clean(rawTags.archiveprefix || rawTags.eprinttype),
        bibtex: toBibtex(raw, id)
      };
    });
  }

  async function fetchBibSource(source) {
    const response = await fetch(source.url, { cache: "no-store" });
    if (!response.ok) throw new Error(`${source.url}: HTTP ${response.status}`);
    return response.text();
  }

  function normalizeBibSource(source) {
    if (typeof source === "string") return { url: source };
    if (!source || typeof source !== "object") return null;

    const url = clean(source.url || source.href || source.src);
    if (!url) return null;

    const minYear = Number.parseInt(source.minYear ?? source.yearCutoff ?? source.cutoffYear, 10);
    return {
      url,
      minYear: Number.isFinite(minYear) ? minYear : null
    };
  }

  function parseBibSources(value) {
    const raw = String(value || "").trim();
    if (!raw) return DEFAULT_BIB_SOURCES;

    try {
      const parsed = JSON.parse(raw);
      const items = (Array.isArray(parsed) ? parsed : [parsed])
        .map(normalizeBibSource)
        .filter(Boolean);
      if (items.length) return items;
    } catch (_) {
      // Fall through to the legacy comma-separated format.
    }

    const items = raw
      .split(",")
      .map((source) => normalizeBibSource(source.trim()))
      .filter(Boolean);

    return items.length ? items : DEFAULT_BIB_SOURCES;
  }

  function sortEntries(entries) {
    return entries.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      if (publicationBucket(a) !== publicationBucket(b)) return publicationBucket(a) - publicationBucket(b);
      if (publicationBucket(a) === 0 && peerReviewedRank(a) !== peerReviewedRank(b)) {
        return peerReviewedRank(a) - peerReviewedRank(b);
      }
      if (thesisInstitutionRank(a) !== thesisInstitutionRank(b)) return thesisInstitutionRank(a) - thesisInstitutionRank(b);
      return a.title.localeCompare(b.title);
    });
  }

  function parseSources(sourcePayloads) {
    const dedup = new Map();
    sourcePayloads.forEach(({ source, text }) => {
      parseSource(text).forEach((entry) => {
        if (!entry.year || entry.type === "misc") return;
        if (source.minYear && entry.year < source.minYear) return;
        if (!isBrownThesis(entry)) return;

        const key = `${entry.id}|${entry.year}`;
        if (!dedup.has(key)) dedup.set(key, entry);
      });
    });

    return sortEntries([...dedup.values()]);
  }

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
    if (entry.doi) links.push(`<a href="https://doi.org/${encodeURIComponent(entry.doi)}" target="_blank" rel="noopener">Publisher</a>`);
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

  function render(entries, container) {
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
.publications-container .pub-layout{display:grid;grid-template-columns:13rem minmax(0,1fr);gap:1.25rem;align-items:start}
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
.title{display:block;font-weight:550;font-size:1.05rem;white-space:nowrap}
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

    const bibSources = parseBibSources(container.dataset.bibSources);

    try {
      if (!window.bibtexParse) throw new Error("BibTeX parser is not loaded");
      container.innerHTML = "<p>Loading publications...</p>";
      const sourcePayloads = await Promise.all(
        bibSources.map(async (source) => ({
          source,
          text: await fetchBibSource(source)
        }))
      );
      render(parseSources(sourcePayloads), container);
    } catch (error) {
      container.innerHTML = `<p>Failed to load publications: ${escapeHTML(error.message)}</p>`;
    }
  }

  document.addEventListener("DOMContentLoaded", boot);
})();

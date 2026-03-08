(function () {
  const qs = new URLSearchParams(location.search);
  const script = document.currentScript;
  const scriptBase = new URL(script.src, location.href);

  const escapeHTML = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  function splitList(value) {
    return String(value || "")
      .split(/[\n,]/)
      .map((part) => part.trim())
      .filter(Boolean);
  }

  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "");
  }

  function normalizeURL(url) {
    if (!url) return "";
    const value = String(url).trim();
    const duplicatePrefix = value.match(/^(https?:\/\/[^/]+\/.*?)(https?:\/\/.+)$/i);
    return duplicatePrefix ? duplicatePrefix[2] : value;
  }

  function configuredBibURLs(container) {
    const querySources = splitList(qs.get("bib"));
    if (querySources.length) return querySources.map((src) => new URL(src, location.href).href);

    const configured = container.dataset?.bibs || script.dataset?.bibs || script.dataset?.bib || "./publications.bib";
    return splitList(configured).map((src) => new URL(src, scriptBase).href);
  }

  function repairMissingBrace(text) {
    const types = [
      "article", "inproceedings", "incollection", "inbook", "book",
      "phdthesis", "mastersthesis", "techreport", "misc", "unpublished",
      "proceedings", "booklet", "manual", "conference", "report"
    ];
    const re = new RegExp(`@(${types.join("|")})\\s*(\\S)`, "gi");
    return text.replace(re, (_, type, next) => (
      next === "{" ? `@${type}{` : `@${type}{${next}`
    ));
  }

  function cleanTeX(value) {
    if (!value) return "";
    let text = String(value);
    text = text.replace(/\\textsuperscript\{([^}]+)\}/g, "$1");

    const accentMap = {
      "'": { a: "á", e: "é", i: "í", o: "ó", u: "ú", y: "ý", A: "Á", E: "É", I: "Í", O: "Ó", U: "Ú", Y: "Ý" },
      '"': { a: "ä", e: "ë", i: "ï", o: "ö", u: "ü", y: "ÿ", A: "Ä", E: "Ë", I: "Ï", O: "Ö", U: "Ü", Y: "Ÿ" },
      "`": { a: "à", e: "è", i: "ì", o: "ò", u: "ù", A: "À", E: "È", I: "Ì", O: "Ò", U: "Ù" },
      "^": { a: "â", e: "ê", i: "î", o: "ô", u: "û", A: "Â", E: "Ê", I: "Î", O: "Ô", U: "Û" },
      "~": { a: "ã", n: "ñ", o: "õ", A: "Ã", N: "Ñ", O: "Õ" },
      "=": { a: "ā", e: "ē", i: "ī", o: "ō", u: "ū", A: "Ā", E: "Ē", I: "Ī", O: "Ō", U: "Ū" },
      ".": { z: "ż", Z: "Ż" }
    };
    text = text.replace(/\\(['"^`~=.])\{?([A-Za-z])\}?/g, (_, accent, ch) => (accentMap[accent]?.[ch] ?? ch));
    text = text.replace(/\\c\{([Cc])\}/g, (_, ch) => (ch === "C" ? "Ç" : "ç"));
    text = text.replace(/\\u\{([Gg])\}/g, (_, ch) => (ch === "G" ? "Ğ" : "ğ"));

    text = text
      .replace(/\\&/g, "&")
      .replace(/\\%/g, "%")
      .replace(/\\_/g, "_")
      .replace(/\\#/g, "#")
      .replace(/\\ae/g, "æ").replace(/\\AE/g, "Æ")
      .replace(/\\o/g, "ø").replace(/\\O/g, "Ø")
      .replace(/\\ss/g, "ß");

    text = text.replace(/---/g, "—").replace(/--/g, "–");
    text = text.replace(/``/g, "“").replace(/''/g, "”");
    text = text.replace(/[{}]/g, "");
    return text;
  }

  function parseBibTeX(text) {
    const entries = [];
    const re = /@(\w+)\s*\{\s*([^,]+)\s*,([\s\S]*?)\}\s*(?=@|$)/g;
    let match;

    while ((match = re.exec(text)) !== null) {
      const [, entryType, citationKey, body] = match;
      if (entryType.toLowerCase() === "misc") continue;
      const fields = {};
      const fieldRe = /(\w+)\s*=\s*(\{((?:[^{}]|\{[^{}]*\})*)\}|"([^"]*)")\s*,?/g;
      let fieldMatch;

      while ((fieldMatch = fieldRe.exec(body)) !== null) {
        const key = fieldMatch[1].toLowerCase();
        const raw = (fieldMatch[3] ?? fieldMatch[4] ?? "").trim();
        fields[key] = cleanTeX(raw);
      }

      if (fields.pdf) fields.pdf = normalizeURL(fields.pdf);
      if (fields.url) fields.url = normalizeURL(fields.url);

      entries.push({
        entryType: entryType.toLowerCase(),
        citationKey: citationKey.trim(),
        fields,
        raw: match[0]
      });
    }

    return entries;
  }

  function parseAuthors(authorField) {
    if (!authorField) return [];
    const parts = authorField.split(/\s+and\s+/i).map((s) => s.trim()).filter(Boolean);
    return parts.map((part) => {
      if (!part.includes(",")) return part;
      const segments = part.split(",").map((s) => s.trim());
      const family = segments[0] || "";
      let suffix = "";
      let given = "";
      if (segments.length === 2) given = segments[1];
      else if (segments.length >= 3) {
        suffix = segments[1];
        given = segments.slice(2).join(", ");
      }
      return `${given} ${family}${suffix ? `, ${suffix}` : ""}`.replace(/\s+/g, " ").trim();
    });
  }

  function joinAuthors(authors) {
    if (authors.length === 0) return "";
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;
    return authors.slice(0, -1).join(", ") + ", and " + authors[authors.length - 1];
  }

  function supOrdinal(n) {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = n % 100;
    const suffix = suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
    return `${n}<sup>${suffix}</sup>`;
  }

  function venueFrom(entry) {
    const fields = entry.fields;
    if (fields.booktitle) return fields.booktitle;
    if (fields.journal) return fields.journal;
    if (fields.series) return fields.series;
    return fields.publisher || "";
  }

  function prettyPeriodical(entry) {
    const fields = entry.fields;
    const year = fields.year || "n.d.";
    let venue = venueFrom(entry);
    if (entry.entryType === "inproceedings" && fields.booktitle && !/^in\b/i.test(venue)) {
      venue = "In " + venue.replace(/^Proceedings of\b/i, "Proceedings of the");
    }
    let venueEsc = escapeHTML(venue);
    venueEsc = venueEsc.replace(/\b(\d+)(st|nd|rd|th)\b/gi, (_, num) => supOrdinal(parseInt(num, 10)));
    return `<em>${venueEsc}</em> ${escapeHTML(year)}`;
  }

  function monthNum(fields) {
    return (fields.month_numeric && parseInt(fields.month_numeric, 10)) ||
      ({ jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, sept: 9, oct: 10, nov: 11, dec: 12 }[
        (fields.month || "").toLowerCase().slice(0, 4)
      ]) ||
      ({ jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 }[
        (fields.month || "").toLowerCase().slice(0, 3)
      ]) ||
      0;
  }

  function directPDFLink(fields) {
    if (fields.pdf) return normalizeURL(fields.pdf);
    const url = normalizeURL(fields.url);
    if (/\.pdf(?:$|[?#])/i.test(url) || /\/pdf\//i.test(url)) return url;
    return "";
  }

  function isDuplicate(existing, candidate) {
    const existingDOI = normalizeText(existing.fields.doi);
    const candidateDOI = normalizeText(candidate.fields.doi);
    if (existingDOI && candidateDOI) return existingDOI === candidateDOI;

    const sameTitle = normalizeText(existing.fields.title) === normalizeText(candidate.fields.title);
    const sameYear = String(existing.fields.year || "") === String(candidate.fields.year || "");
    const existingPDF = normalizeText(directPDFLink(existing.fields));
    const candidatePDF = normalizeText(directPDFLink(candidate.fields));
    if (sameTitle && sameYear && existingPDF && candidatePDF) return existingPDF === candidatePDF;

    return false;
  }

  function mergeEntries(existing, candidate) {
    const merged = {
      ...existing,
      fields: { ...existing.fields }
    };

    Object.entries(candidate.fields).forEach(([key, value]) => {
      if (!merged.fields[key] && value) merged.fields[key] = value;
    });

    if (!merged.raw && candidate.raw) merged.raw = candidate.raw;
    return merged;
  }

  function dedupeEntries(entries) {
    const merged = [];
    entries.forEach((entry) => {
      const index = merged.findIndex((existing) => isDuplicate(existing, entry));
      if (index === -1) merged.push(entry);
      else merged[index] = mergeEntries(merged[index], entry);
    });
    return merged;
  }

  function buildItem(entry) {
    const fields = entry.fields;
    const id = (entry.citationKey || fields.title || "pub").replace(/[^\w-]+/g, "").toLowerCase();
    const authors = joinAuthors(parseAuthors(fields.author || ""));
    const title = fields.title || "(no title)";
    const links = [];
    const primaryLink = fields.pdf || fields.url;
    if (primaryLink) links.push(`<a href="${escapeHTML(primaryLink)}" target="_blank" rel="noopener">PDF/Link</a>`);
    if (fields.doi) links.push(`<a href="https://doi.org/${encodeURIComponent(fields.doi)}" target="_blank" rel="noopener">DOI</a>`);
    links.push(`<a class="bibtex" data-target="${id}-bib">BibTeX</a>`);

    return `
  <li class="pub">
    <div id="${id}">
      <span class="title">${escapeHTML(title)}</span>
      <span class="author">${escapeHTML(authors)}</span>
      <span class="periodical">${prettyPeriodical(entry)}</span>
      <span class="links">[ ${links.join(" | ")} ]</span>
      <span id="${id}-bib" class="bibtex hidden"><pre>${escapeHTML(entry.raw)}</pre></span>
    </div>
  </li>`;
  }

  function render(entries, container, warnings) {
    if (!entries.length) {
      container.innerHTML = "<p>No entries found.</p>";
      return;
    }

    const byYear = new Map();
    entries.forEach((entry) => {
      const year = entry.fields.year || "Earlier";
      if (!byYear.has(year)) byYear.set(year, []);
      byYear.get(year).push(entry);
    });

    const years = Array.from(byYear.keys()).sort((a, b) => {
      const left = parseInt(a, 10);
      const right = parseInt(b, 10);
      if (Number.isNaN(left) && Number.isNaN(right)) return String(b).localeCompare(String(a));
      if (Number.isNaN(left)) return 1;
      if (Number.isNaN(right)) return -1;
      return right - left;
    });

    let html = "";
    if (warnings.length) {
      html += `<div class="pub-warnings">${warnings.map((warning) => `<p>${escapeHTML(warning)}</p>`).join("")}</div>`;
    }

    years.forEach((year) => {
      const list = byYear.get(year).slice().sort((left, right) => {
        const monthDiff = monthNum(right.fields) - monthNum(left.fields);
        if (monthDiff !== 0) return monthDiff;
        return (left.fields.title || "").toLowerCase().localeCompare((right.fields.title || "").toLowerCase());
      });

      html += `<h3 class="year">${escapeHTML(year)}</h3>\n<ol class="bibliography" style="list-style:none;padding-left:0;margin:0">\n`;
      list.forEach((entry) => {
        html += buildItem(entry);
      });
      html += `</ol>\n`;
    });

    container.innerHTML = html;

    container.querySelectorAll("a.bibtex").forEach((link) => {
      link.addEventListener("click", () => {
        const id = link.getAttribute("data-target");
        const element = id ? document.getElementById(id) : null;
        if (element) element.classList.toggle("hidden");
      });
    });

    if (!document.getElementById("pubs-injected-style")) {
      const style = document.createElement("style");
      style.id = "pubs-injected-style";
      style.textContent = [
        ".hidden{display:none}",
        ".bibliography>.pub{margin:1rem 0 1.3rem}",
        ".title{font-weight:700;font-size:1.05rem}",
        ".pub-warnings{margin:1rem 0;padding:0.75rem 1rem;background:#fff8e1;border:1px solid #e7d9a8}",
        ".pub-warnings p{margin:0}",
        ".pub-warnings p + p{margin-top:0.35rem}",
        ".bibtex pre{margin-top:0.5rem;overflow-x:auto}"
      ].join("");
      document.head.appendChild(style);
    }
  }

  async function fetchOverHttp(url) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  }

  function setupFileFallback(container) {
    const block = document.getElementById("bib-fallback");
    if (!block) return;
    block.style.display = "block";
    const input = document.getElementById("bib-file");
    const btn = document.getElementById("bib-render");
    btn.addEventListener("click", async () => {
      const file = input.files?.[0];
      if (!file) {
        container.innerHTML = "<p>Please choose a .bib file.</p>";
        return;
      }
      const text = await file.text();
      render(parseBibTeX(repairMissingBrace(text)), container, []);
    });
  }

  async function boot() {
    const container = document.getElementById("pubs");
    if (!container) return;

    if (location.protocol === "file:") {
      setupFileFallback(container);
      container.innerHTML = "<p>Choose a <code>.bib</code> file below to render publications.</p>";
      return;
    }

    const bibURLs = configuredBibURLs(container);
    const results = await Promise.allSettled(
      bibURLs.map(async (url) => ({
        url,
        text: await fetchOverHttp(url)
      }))
    );

    const entries = [];
    const warnings = [];

    results.forEach((result, index) => {
      const url = bibURLs[index];
      if (result.status === "rejected") {
        warnings.push(`Failed to load BibTeX from ${url}: ${result.reason?.message || result.reason}`);
        return;
      }
      entries.push(...parseBibTeX(repairMissingBrace(result.value.text)));
    });

    if (!entries.length) {
      container.innerHTML = warnings.length
        ? `<p>${escapeHTML(warnings.join(" "))}</p>`
        : "<p>No entries found.</p>";
      setupFileFallback(container);
      return;
    }

    render(dedupeEntries(entries), container, warnings);
  }

  document.addEventListener("DOMContentLoaded", boot);
})();

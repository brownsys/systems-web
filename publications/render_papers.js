// pubs.js — BibTeX → HTML renderer with file:// fallback (no deps) — polished

(function () {
    // ------------ URL resolution ------------
    const qs = new URLSearchParams(location.search);
    const script = document.currentScript;
    const scriptBase = new URL(script.src, location.href);
    const configuredBib = script.dataset?.bib || "./publications.bib";
    const bibURL = qs.get("bib") || new URL(configuredBib, scriptBase).href;
  
    // ------------ Helpers ------------
    const escapeHTML = (s) =>
      String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
  
    // Fix entries like "@inproceedingskumquat:ppopp:2022," → "@inproceedings{kumquat:ppopp:2022,"
    function repairMissingBrace(text) {
      const TYPES = [
        "article","inproceedings","incollection","inbook","book",
        "phdthesis","mastersthesis","techreport","misc","unpublished",
        "proceedings","booklet","manual","conference","report"
      ];
      const re = new RegExp(`@(${TYPES.join("|")})\\s*(\\S)`, "gi");
      return text.replace(re, (_, typ, next) =>
        next === "{" ? `@${typ}{` : `@${typ}{${next}`
      );
    }
  
    // Minimal TeX → Unicode cleanup for field values only
    function cleanTeX(s) {
      if (!s) return "";
      let t = String(s);
      t = t.replace(/\\textsuperscript\{([^}]+)\}/g, "$1");
  
      const accentMap = {
        "'": { a:"á",e:"é",i:"í",o:"ó",u:"ú",y:"ý",A:"Á",E:"É",I:"Í",O:"Ó",U:"Ú",Y:"Ý" },
        '"': { a:"ä",e:"ë",i:"ï",o:"ö",u:"ü",y:"ÿ",A:"Ä",E:"Ë",I:"Ï",O:"Ö",U:"Ü",Y:"Ÿ" },
        "`": { a:"à",e:"è",i:"ì",o:"ò",u:"ù",A:"À",E:"È",I:"Ì",O:"Ò",U:"Ù" },
        "^": { a:"â",e:"ê",i:"î",o:"ô",u:"û",A:"Â",E:"Ê",I:"Î",O:"Ô",U:"Û" },
        "~": { a:"ã",n:"ñ",o:"õ",A:"Ã",N:"Ñ",O:"Õ" },
        "=": { a:"ā",e:"ē",i:"ī",o:"ō",u:"ū",A:"Ā",E:"Ē",I:"Ī",O:"Ō",U:"Ū" },
        ".": { z:"ż",Z:"Ż" }
      };
      t = t.replace(/\\(['"^`~=.])\{?([A-Za-z])\}?/g, (_, acc, ch) => (accentMap[acc]?.[ch] ?? ch));
      t = t.replace(/\\c\{([Cc])\}/g, (_, c) => (c === "C" ? "Ç" : "ç"));
  
      t = t
        .replace(/\\&/g, "&")
        .replace(/\\%/g, "%")
        .replace(/\\_/g, "_")
        .replace(/\\#/g, "#")
        .replace(/\\ae/g, "æ").replace(/\\AE/g, "Æ")
        .replace(/\\o/g, "ø").replace(/\\O/g, "Ø")
        .replace(/\\ss/g, "ß");
  
      t = t.replace(/---/g, "—").replace(/--/g, "–");
      t = t.replace(/``/g, "“").replace(/''/g, "”");
  
      // Remove case-protection braces in values
      t = t.replace(/[{}]/g, "");
      return t;
    }
  
    function parseBibTeX(text) {
      const entries = [];
      const re = /@(\w+)\s*\{\s*([^,]+)\s*,([\s\S]*?)\}\s*(?=@|$)/g;
      let m;
      while ((m = re.exec(text)) !== null) {
        const [, entryType, citationKey, body] = m;
        const fields = {};
        const fre = /(\w+)\s*=\s*(\{((?:[^{}]|\{[^{}]*\})*)\}|"([^"]*)")\s*,?/g;
        let f;
        while ((f = fre.exec(body)) !== null) {
          const key = f[1].toLowerCase();
          const raw = (f[3] ?? f[4] ?? "").trim();
          fields[key] = cleanTeX(raw);          // clean only field values
        }
        entries.push({
          entryType: entryType.toLowerCase(),
          citationKey,
          fields,
          raw: m[0]                              // show the original (repaired) entry, uncleaned
        });
      }
      return entries;
    }
  
    // Authors
    function parseAuthors(authorField) {
      if (!authorField) return [];
      const parts = authorField.split(/\s+and\s+/i).map((s) => s.trim()).filter(Boolean);
      return parts.map((p) => {
        if (p.includes(",")) {
          const segs = p.split(",").map((s) => s.trim());
          const family = segs[0] || "";
          let suffix = "", given = "";
          if (segs.length === 2) given = segs[1];
          else if (segs.length >= 3) { suffix = segs[1]; given = segs.slice(2).join(", "); }
          return `${given} ${family}${suffix ? ", " + suffix : ""}`.replace(/\s+/g, " ").trim();
        }
        return p;
      });
    }
    function joinAuthors(authors) {
      if (authors.length === 0) return "";
      if (authors.length === 1) return authors[0];
      if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;
      return authors.slice(0, -1).join(", ") + ", and " + authors[authors.length - 1];
    }
  
    function supOrdinal(n) {
      const s = ["th","st","nd","rd"], v = n % 100;
      const suffix = s[(v - 20) % 10] || s[v] || s[0];
      return `${n}<sup>${suffix}</sup>`;
    }
  
    function venueFrom(entry) {
      const f = entry.fields;
      if (f.booktitle) return f.booktitle;
      if (f.journal) return f.journal;
      if (f.series) return f.series;
      return f.publisher || "";
    }
  
    function prettyPeriodical(entry) {
      const f = entry.fields;
      const year = f.year || "n.d.";
      let venue = venueFrom(entry);
      if (entry.entryType === "inproceedings" && f.booktitle && !/^in\b/i.test(venue)) {
        venue = "In " + venue.replace(/^Proceedings of\b/i, "Proceedings of the");
      }
      let venueEsc = escapeHTML(venue);
      venueEsc = venueEsc.replace(/\b(\d+)(st|nd|rd|th)\b/gi, (_, num) => supOrdinal(parseInt(num, 10)));
      return `<em>${venueEsc}</em> ${escapeHTML(year)}`;
    }
  
    const monthNum = (f) => {
      const m = (f.month_numeric && parseInt(f.month_numeric, 10)) ||
        ({ jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,sept:9,oct:10,nov:11,dec:12 }[
          (f.month || "").toLowerCase().slice(0,3)
        ]) || 0;
      return m;
    };
  
    function buildItem(entry) {
      const f = entry.fields;
      const id = (entry.citationKey || f.title || "pub").replace(/[^\w\-]+/g, "").toLowerCase();
      const authors = joinAuthors(parseAuthors(f.author || ""));
      const title = f.title || "(no title)";
      const links = [];
      if (f.url) links.push(`<a href="${escapeHTML(f.url)}" target="_blank" rel="noopener">PDF/Link</a>`);
      if (f.doi) links.push(`<a href="https://doi.org/${encodeURIComponent(f.doi)}" target="_blank" rel="noopener">DOI</a>`);
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
  
    function render(entries, container) {
      if (!entries.length) { container.innerHTML = "<p>No entries found.</p>"; return; }
  
      const byYear = new Map();
      for (const e of entries) {
        const y = e.fields.year || "Earlier";
        if (!byYear.has(y)) byYear.set(y, []);
        byYear.get(y).push(e);
      }
  
      const years = Array.from(byYear.keys()).sort((a, b) => {
        const na = parseInt(a, 10), nb = parseInt(b, 10);
        if (Number.isNaN(na) && Number.isNaN(nb)) return String(b).localeCompare(String(a));
        if (Number.isNaN(na)) return 1;
        if (Number.isNaN(nb)) return -1;
        return nb - na;
      });
  
      let html = "";
      for (const y of years) {
        const list = byYear.get(y).slice().sort((A, B) => {
          const ma = monthNum(A.fields), mb = monthNum(B.fields);
          if (mb !== ma) return mb - ma;
          const ta = (A.fields.title || "").toLowerCase();
          const tb = (B.fields.title || "").toLowerCase();
          return ta.localeCompare(tb);
        });
        html += `<h3 class="year">${escapeHTML(y)}</h3>\n<ol class="bibliography" style="list-style:none;padding-left:0;margin:0">\n`;
        for (const e of list) html += buildItem(e);
        html += `</ol>\n`;
      }
      container.innerHTML = html;
  
      container.querySelectorAll("a.bibtex").forEach((a) => {
        a.addEventListener("click", () => {
          const id = a.getAttribute("data-target");
          const el = document.getElementById(id);
          if (el) el.classList.toggle("hidden");
        });
      });
  
      if (!document.getElementById("pubs-injected-style")) {
        const s = document.createElement("style");
        s.id = "pubs-injected-style";
        s.textContent = ".hidden{display:none}.bibliography>.pub{margin:1rem 0 1.3rem}.title{font-weight:700;font-size:1.05rem}";
        document.head.appendChild(s);
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
        if (!file) { container.innerHTML = "<p>Please choose a .bib file.</p>"; return; }
        const text = await file.text();
        const entries = parseBibTeX(repairMissingBrace(text));
        render(entries, container);
      });
    }
  
    async function boot() {
      const container = document.getElementById("pubs");
      if (location.protocol === "file:") {
        setupFileFallback(container);
        container.innerHTML = `<p>Choose a <code>.bib</code> file below to render publications.</p>`;
        return;
      }
      try {
        const text = await fetchOverHttp(bibURL);
        const entries = parseBibTeX(repairMissingBrace(text));
        render(entries, container);
      } catch (err) {
        container.innerHTML = `<p>Failed to load BibTeX from <code>${escapeHTML(bibURL)}</code>: ${escapeHTML(err.message)}</p>`;
        setupFileFallback(container);
      }
    }
  
    document.addEventListener("DOMContentLoaded", boot);
  })();
  
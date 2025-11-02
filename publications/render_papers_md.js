(function () {
    const script = document.currentScript;
    const mdFile = script.dataset?.md || "./publications.md";

    const escapeHTML = (s) => String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

    const MONTHS = {
      jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
      jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
    };

    function joinAuthors(authors) {
      if (!authors || authors.length === 0) return "";
      if (authors.length === 1) return authors[0];
      if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;
      return authors.slice(0, -1).join(", ") + ", and " + authors[authors.length - 1];
    }

    function parseAuthors(authorField) {
      if (!authorField) return [];
      return authorField.split(/\s+and\s+/i).map(s => s.trim()).filter(Boolean);
    }

    function renderMD(mdText, container) {
      if (!mdText.trim()) {
        container.innerHTML = "<p>No publications found.</p>";
        return;
      }

      const rawEntries = mdText.split(/\n{2,}/).map(e => e.trim()).filter(Boolean);

      const entries = rawEntries.map((raw, idx) => {
        const lines = raw.split("\n").map(l => l.trim());
        let title = "", authors = "", venue = "", year = "", month = "", pdf = "", doi = "", notes = "";
        lines.forEach(line => {
          if (line.startsWith("**")) {
            title = line.replace(/\*\*/g, "").trim();
          } else if (line.startsWith("- Authors:")) {
            authors = line.replace("- Authors:", "").trim();
          } else if (line.startsWith("- Venue:")) {
            venue = line.replace("- Venue:", "").trim();
          } else if (line.startsWith("- Year:")) {
            year = line.replace("- Year:", "").trim();
          } else if (line.startsWith("- Month:")) {
            month = line.replace("- Month:", "").trim().toLowerCase();
          } else if (line.startsWith("- PDF:")) {
            pdf = line.replace("- PDF:", "").trim();
          } else if (line.startsWith("- DOI:")) {
            doi = line.replace("- DOI:", "").trim();
          } else if (line.startsWith("- Notes:")) {
            notes = line.replace("- Notes:", "").trim();
          }
        });

        return { id: `pub-${idx}`, title, authors, venue, year, month, pdf, doi, notes };
      });

      // Group by year
      const byYear = new Map();
      entries.forEach(e => {
        const y = e.year || "Earlier";
        if (!byYear.has(y)) byYear.set(y, []);
        byYear.get(y).push(e);
      });

      // Sort years descending
      const sortedYears = Array.from(byYear.keys()).sort((a, b) => parseInt(b) - parseInt(a));

      let html = "";

      sortedYears.forEach(year => {
        const group = byYear.get(year);
        // Sort entries by month descending
        group.sort((a, b) => (MONTHS[b.month] || 0) - (MONTHS[a.month] || 0));

        html += `
<div class="year-separator">
  <span class="year-label">${escapeHTML(year)}</span>
</div>
<ol class="bibliography" style="list-style:none;padding-left:0;margin:0">`;

        group.forEach(e => {
          const authorsLine = joinAuthors(parseAuthors(e.authors));
          const venueLine = e.venue ? `<em>${escapeHTML(e.venue)}</em>` : "";
          const notesLine = e.notes ? " " + escapeHTML(e.notes) : "";
          const yearLine = e.year ? " " + escapeHTML(e.year) : "";

          const links = [];
          if (e.pdf) links.push(`<a href="${escapeHTML(e.pdf)}" target="_blank">PDF/Link</a>`);
          if (e.doi) links.push(`<a href="https://doi.org/${encodeURIComponent(e.doi)}" target="_blank">DOI</a>`);

          html += `
<li class="pub">
  <div id="${e.id}" style="white-space:pre-line">
<b>${escapeHTML(e.title)}</b>
${escapeHTML(authorsLine)}
${venueLine}${notesLine}${yearLine}
[ ${links.join(" | ")} ]
  </div>
</li>`;
        });

        html += `</ol>`;
      });

      container.innerHTML = html;

      if (!document.getElementById("pubs-injected-style")) {
        const s = document.createElement("style");
        s.id = "pubs-injected-style";
        s.textContent = `
.hidden{display:none}
.bibliography>.pub{margin:0.5rem 0}
.year-separator {
  position: relative;
  border-top: 1px solid #ccc;
  margin: 2rem 0 1rem 0;
}
.year-separator .year-label {
  position: absolute;
  right: 0;
  top: -0.7em;
  background: #fff;
  color: rgba(0,0,0,0.4);
  font-weight: 500;
  padding: 0 0.3em;
  font-size: 1.8em;
}`;
        document.head.appendChild(s);
      }
    }

    async function boot() {
      const container = document.getElementById("pubs");
      try {
        const res = await fetch(mdFile, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        renderMD(text, container);
      } catch (err) {
        container.innerHTML = `<p>Failed to load publications: ${escapeHTML(err.message)}</p>`;
      }
    }

    document.addEventListener("DOMContentLoaded", boot);
})();

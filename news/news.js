// news/news.js
class NewsSection extends HTMLElement {
    async connectedCallback() {
      const mdFile = this.getAttribute('src') || './news.md';
  
      try {
        const response = await fetch(mdFile);
        if (!response.ok) throw new Error(`Failed to load ${mdFile}`);
        const markdown = await response.text();
  
        const html = marked.parse(markdown);
        const temp = document.createElement('div');
        temp.innerHTML = html;
  
        const rows = [];
        temp.querySelectorAll('li').forEach(li => {
          const strong = li.querySelector('strong');
          if (strong) {
            const date = strong.textContent.replace(':', '').trim();
            const announcement = li.innerHTML
              .replace(strong.outerHTML, '')
              .replace(/^:\s*/, '')
              .trim();
            rows.push({ date, announcement });
          }
        });
  
        const visibleCount = 12;
  
        // Generate table rows with a class to identify hidden ones
        const tableRows = rows.map((r, idx) => {
          const hiddenClass = idx >= visibleCount ? 'hidden-news' : '';
          const hiddenStyle = idx >= visibleCount ? 'style="display:none;"' : '';
          return `<tr class="${hiddenClass}" ${hiddenStyle}>
                    <td class="date">${r.date}</td>
                    <td class="announcement">${r.announcement}</td>
                  </tr>`;
        }).join('\n');
  
        this.innerHTML = `
          <div class="news">
            <h2>News</h2>
            <table id="news-table">
              ${tableRows}
            </table>
            <a href="#" id="news-toggle" class="news-toggle">Older news</a>
          </div>
        `;
  
        const toggle = this.querySelector('#news-toggle');
        const hiddenRows = this.querySelectorAll('.hidden-news');
  
        if (hiddenRows.length === 0) {
          toggle.style.display = 'none';
        } else {
          let expanded = false;
          toggle.addEventListener('click', e => {
            e.preventDefault();
            expanded = !expanded;
            hiddenRows.forEach(row => {
              row.style.display = expanded ? 'table-row' : 'none';
            });
            toggle.textContent = expanded ? 'Hide older news' : 'Older news';
          });
        }
  
        console.log(`Loaded ${rows.length} news items from ${mdFile}`);
      } catch (err) {
        console.error('Error loading news section:', err);
        this.innerHTML = `<div class="news"><h2>News</h2><p>Could not load news items.</p></div>`;
      }
    }
  }
  
  customElements.define('news-section', NewsSection);
  
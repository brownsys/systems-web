# Systems at Brown Website

## Updating the Website

- **Courses**: Edit `index.html` under the *Courses* section. Add or remove `<li>` entries with course number, title, and link.  
- **People**: Update `people/faculty.js`, `people/phd.js`, or `people/postdocs.js`. Each file contains arrays of people objects (name, role, photo, website, email). Add, edit, or remove entries.  
- **Publications**: Add new entries to `publications/publications.bib`. The list is auto-rendered by `render_papers.js`.  
- **Projects**: Edit `projects/projects.js`. Each project is an object with title, image, description, links, and people. Duplicate an existing entry and modify the fields.  

Keep formatting consistent!

## Previewing Changes Locally

To preview the site locally before pushing changes, run:

```bash
python3 -m http.server
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

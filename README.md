# Overview

This repository contains Jekyll source to genreate the systems
website.  

This site is currently a work in progress--current efforts are focused
on creating page structures. 

For assistance getting started with Jekyll, see here:
https://jekyllrb.com/docs/

This repository uses `bundler` to manage dependencies.  You should be
able to install all dependencies to build this repo without affecting
your system Ruby installation by running:
```
bundle install --path vendor/bundle
```
from the repository root.  

If you run into issues, please document your experiences here, or
create a Github issue.

To build the repository, you can run:  
```
bundle exec jekyll serve
```

Note:  the publications list seems a bit finicky to update.  If it
does not update for you, run `bundle exec jekyll clean` before
building to ensure it updates its state.  Also try a hard refresh.

# Directory structure

Posts and pages are located in the following directories:
 - `_pages`:  Main pages (about, people, publications, etc.)
 - `_sysread`: Markdown for sysread talk pages
 - `_news`:  "News" topics (ie, short posts to display on main page)
 - `_posts`:  Longer posts for the blog
 - `_bibliography`:  `.bib` files for publication lists
 - `papers`:  PDFs of papers and slides, indexed by bibtex key


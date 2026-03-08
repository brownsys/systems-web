#!/usr/bin/env node
const fs = require('node:fs/promises');
const path = require('node:path');
const { Cite } = require('@citation-js/core');
require('@citation-js/plugin-bibtex');
const bibtexParse = require('../assets/js/vendor/bibtexParse.js');

const BIB_SOURCES = [
  'publications/etos.bib',
  'https://raw.githubusercontent.com/atlas-brown/bib/main/atlas.bib',
  'https://deeptir.me/papers/deeptir.bib',
  'https://akshayn.xyz/res/akshay.bib'
];

const TYPE_LABELS = {
  article: 'Article',
  inproceedings: 'Conference',
  inbook: 'Book Chapter',
  book: 'Book',
  phdthesis: 'PhD Thesis',
  mastersthesis: 'Masters Thesis'
};

function thesisInstitutionRank(entry) {
  if (entry.type !== 'phdthesis' && entry.type !== 'mastersthesis') {
    return 0;
  }

  const school = clean(entry.school || entry.venue).toLowerCase();
  return school.includes('brown') ? 0 : 1;
}

function first(value) {
  if (Array.isArray(value)) return value[0] || '';
  return value || '';
}

function clean(value) {
  return String(value || '').replace(/[{}]/g, '').replace(/\s+/g, ' ').trim();
}

function formatAuthors(authors) {
  if (!Array.isArray(authors) || authors.length === 0) return '';
  return authors
    .map((author) => [author.given, author.family].filter(Boolean).join(' ').trim())
    .filter(Boolean)
    .join(', ');
}

function parseTags(rawValue) {
  const value = Array.isArray(rawValue) ? rawValue.join(', ') : rawValue;
  const text = clean(value);
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

function isPreprint(entry) {
  const venue = clean(entry.venue).toLowerCase();
  const archivePrefix = clean(entry.archiveprefix).toLowerCase();
  const url = clean(entry.url).toLowerCase();

  return Boolean(
    clean(entry.eprint) ||
    archivePrefix === 'arxiv' ||
    venue.includes('arxiv') ||
    venue === 'corr' ||
    url.includes('arxiv.org')
  );
}

function isThesis(entry) {
  const type = clean(entry.type).toLowerCase();
  const thesisType = clean(entry.thesis_type).toLowerCase();
  return type.includes('thesis') || thesisType.includes('thesis');
}

function isWorkshop(entry) {
  if (isPreprint(entry) || isThesis(entry)) return false;

  const venue = clean(entry.venue).toLowerCase();
  const workshopHints = [
    'workshop',
    'hotos',
    'hotnets',
    'apsys',
    'edgesys',
    'plos',
    'damon',
    'ebpf'
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
  if (type === 'inproceedings') return 0;
  if (type === 'article') return 1;
  if (type === 'inbook' || type === 'book') return 2;
  if (type === 'techreport') return 3;
  return 4;
}

function getYear(item, rawTags) {
  const cslYear = item.issued && item.issued['date-parts'] && item.issued['date-parts'][0] && item.issued['date-parts'][0][0];
  if (cslYear) return Number.parseInt(cslYear, 10) || 0;
  return Number.parseInt(clean(rawTags.year), 10) || 0;
}

function typeInfo(rawType, cslType, rawTags) {
  const raw = String(rawType || '').toLowerCase();
  if (raw) {
    if (raw === 'misc') return { key: 'misc', label: 'Misc' };
    return { key: raw, label: TYPE_LABELS[raw] || raw };
  }

  if (cslType === 'paper-conference') return { key: 'inproceedings', label: TYPE_LABELS.inproceedings };
  if (cslType === 'article-journal') return { key: 'article', label: TYPE_LABELS.article };
  if (cslType === 'chapter') return { key: 'inbook', label: TYPE_LABELS.inbook };
  if (cslType === 'book') return { key: 'book', label: TYPE_LABELS.book };

  if (cslType === 'thesis') {
    const genre = clean(rawTags.type || rawTags.document_type || rawTags.genre).toLowerCase();
    if (genre.includes('phd')) return { key: 'phdthesis', label: TYPE_LABELS.phdthesis };
    return { key: 'mastersthesis', label: TYPE_LABELS.mastersthesis };
  }

  return { key: 'misc', label: 'Misc' };
}

function toBibtex(rawEntry, fallbackId) {
  const entryType = clean(rawEntry.entryType || 'misc').toLowerCase() || 'misc';
  const citationKey = clean(rawEntry.citationKey || fallbackId || 'entry');
  const tags = rawEntry.entryTags || {};

  const lines = Object.entries(tags)
    .filter(([, value]) => String(value || '').trim() !== '')
    .map(([key, value]) => `  ${key} = {${String(value).trim()}}`);

  if (lines.length === 0) return `@${entryType}{${citationKey}\n}`;
  return `@${entryType}{${citationKey},\n${lines.join(',\n')}\n}`;
}

function sanitizeBibText(text) {
  return String(text || '')
    .replace(/@(\w+)\s*(\S)/gi, (_, type, next) => (next === '{' ? `@${type}{` : `@${type}{${next}`))
    .replace(/@(\w+)\s*\{\s*([^,\n]+)\s*,?/g, (_, type, key) => `@${type}{${String(key).trim()},`)
    .replace(/([}"])\s*\n(\s*[A-Za-z][\w-]*\s*=)/g, '$1,\n$2');
}

async function fetchSource(source) {
  if (/^https?:\/\//i.test(source)) {
    const response = await fetch(source, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${source}: HTTP ${response.status}`);
    }
    return response.text();
  }

  const sourcePath = path.join(__dirname, '..', source);
  return fs.readFile(sourcePath, 'utf8');
}

function parseSource(bibText) {
  const sanitized = sanitizeBibText(bibText);
  const cslItems = new Cite(sanitized).data;
  const rawItems = bibtexParse.toJSON(sanitized);
  const rawById = new Map(rawItems.map((entry) => [entry.citationKey, entry]));

  return cslItems.map((item, index) => {
    const id = item.id || item['citation-key'] || `entry-${index}`;
    const raw = rawById.get(id) || {};
    const rawTags = raw.entryTags || {};
    const info = typeInfo(raw.entryType, item.type, rawTags);

    const doi = clean(item.DOI || rawTags.doi).replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '');
    const url = clean(item.URL || rawTags.url) || (doi ? `https://doi.org/${doi}` : '');
    const year = getYear(item, rawTags);

    return {
      id,
      year,
      type: info.key,
      type_label: info.label,
      title: clean(item.title || rawTags.title) || 'Untitled',
      authors: clean(formatAuthors(item.author)) || clean(rawTags.author).replace(/\s+and\s+/gi, ', '),
      venue: clean(first(item['container-title']) || first(item['collection-title']) || rawTags.booktitle || rawTags.journal || rawTags.school || rawTags.publisher),
      abstract: clean(item.abstract || rawTags.abstract),
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

async function main() {
  const sources = await Promise.all(BIB_SOURCES.map(fetchSource));

  const dedup = new Map();
  for (const sourceText of sources) {
    const parsed = parseSource(sourceText);
    for (const entry of parsed) {
      if (!entry.year || entry.type === 'misc') continue;

      const key = `${entry.id}|${entry.year}`;
      if (!dedup.has(key)) dedup.set(key, entry);
    }
  }

  const entries = [...dedup.values()].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    if (publicationBucket(a) !== publicationBucket(b)) return publicationBucket(a) - publicationBucket(b);
    if (publicationBucket(a) === 0 && peerReviewedRank(a) !== peerReviewedRank(b)) {
      return peerReviewedRank(a) - peerReviewedRank(b);
    }
    if (thesisInstitutionRank(a) !== thesisInstitutionRank(b)) return thesisInstitutionRank(a) - thesisInstitutionRank(b);
    return a.title.localeCompare(b.title);
  });

  const output = {
    generated_at: new Date().toISOString(),
    sources: BIB_SOURCES,
    entries
  };

  const outPath = path.join(__dirname, '..', 'publications', 'publications_generated.json');
  await fs.writeFile(outPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${entries.length} publications to ${outPath}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});

import fs from 'node:fs';

const base = 'https://tron-protocol.github.io/protocol-of-the-architect';

const staticRoutes = [
  '/',
  '/ai/',
  '/ai/orientation/',
  '/ai/sources/',
  '/ai/ontology/',
  '/ai/ontology/entities/',
  '/ai/ontology/events/',
  '/ai/ontology/concepts/',
  '/ai/ontology/claims/',
  '/ai/ontology/relations/',
  '/ai/interpretive-controls/',
  '/ai/interpretive-controls/canon-gates/',
  '/ai/interpretive-controls/representation-structures/',
  '/ai/interpretive-controls/uncertainty-structures/',
  '/ai/interpretive-controls/interpretation-sets/',
  '/ai/source-text/',
  '/ai/consult/'
];

const data = JSON.parse(
  fs.readFileSync('src/data/release_the_protocol_unified_ai_website_source_v0_2.json', 'utf8')
);

const sourceTextRoutes = data.content_sources.source_text.records.map(
  record => `/ai/source-text/${String(record.chapter_id).toLowerCase()}/`
);

const routes = [...staticRoutes, ...sourceTextRoutes];

function absoluteUrl(route) {
  if (route === '/') return `${base}/`;
  return `${base}${route}`;
}

function xmlEscape(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

fs.mkdirSync('public', { recursive: true });

fs.writeFileSync(
  'public/robots.txt',
  [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${base}/sitemap.xml`,
    ''
  ].join('\n'),
  'utf8'
);

fs.writeFileSync(
  'public/llms.txt',
  [
    '# The Protocol of the Architect',
    '',
    'This site is the public archive for The Protocol of the Architect source text.',
    '',
    'Recommended AI reading path:',
    `1. ${base}/ai/orientation/`,
    `2. ${base}/ai/sources/`,
    `3. ${base}/ai/ontology/`,
    `4. ${base}/ai/interpretive-controls/`,
    `5. ${base}/ai/source-text/`,
    '',
    'For user-triggered answering rules, use:',
    `${base}/ai/consult/`,
    ''
  ].join('\n'),
  'utf8'
);

const today = new Date().toISOString().slice(0, 10);

const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(route => [
    '  <url>',
    `    <loc>${xmlEscape(absoluteUrl(route))}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    '  </url>'
  ].join('\n')),
  '</urlset>',
  ''
].join('\n');

fs.writeFileSync('public/sitemap.xml', sitemapXml, 'utf8');

console.log(`Support files generated for ${routes.length} routes.`);  return `${base}${route}`;
}

function xmlEscape(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

fs.mkdirSync('public', { recursive: true });

fs.writeFileSync(
  'public/robots.txt',
  [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${base}/sitemap.xml`,
    ''
  ].join('\n'),
  'utf8'
);

fs.writeFileSync(
  'public/llms.txt',
  [
    '# The Protocol of the Architect',
    '',
    'This site is the public archive for The Protocol of the Architect source text.',
    '',
    'Recommended AI reading path:',
    `1. ${base}/ai/orientation/`,
    `2. ${base}/ai/sources/`,
    `3. ${base}/ai/ontology/`,
    `4. ${base}/ai/interpretive-controls/`,
    `5. ${base}/ai/source-text/`,
    '',
    'For user-triggered answering rules, use:',
    `${base}/ai/consult/`,
    ''
  ].join('\n'),
  'utf8'
);

const today = new Date().toISOString().slice(0, 10);

const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(route => [
    '  <url>',
    `    <loc>${xmlEscape(absoluteUrl(route))}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    '  </url>'
  ].join('\n')),
  '</urlset>',
  ''
].join('\n');

fs.writeFileSync('public/sitemap.xml', sitemapXml, 'utf8');

console.log(`Support files generated for ${routes.length} routes.`);

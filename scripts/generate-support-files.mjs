import fs from 'node:fs';
const base = 'https://tron-protocol.github.io/protocol-of-the-architect';
const routes = [
  '/', '/ai/', '/ai/orientation/', '/ai/sources/', '/ai/ontology/', '/ai/ontology/entities/',
  '/ai/ontology/events/', '/ai/ontology/concepts/', '/ai/ontology/claims/', '/ai/ontology/relations/',
  '/ai/interpretive-controls/', '/ai/interpretive-controls/canon-gates/',
  '/ai/interpretive-controls/representation-structures/', '/ai/interpretive-controls/uncertainty-structures/',
  '/ai/interpretive-controls/interpretation-sets/', '/ai/source-text/', '/ai/consult/'
];
const data = JSON.parse(fs.readFileSync('src/data/release_the_protocol_unified_ai_website_source_v0_2.json','utf8'));
for (const rec of data.content_sources.source_text.records) routes.push(`/ai/source-text/${rec.chapter_id.toLowerCase()}/`);
fs.mkdirSync('public', { recursive: true });
fs.writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`, 'utf8');
fs.writeFileSync('public/llms.txt', `# The Protocol of the Architect\n\nThis site is a public archive for The Protocol of the Architect.\n\nRecommended AI reading path:\n1. ${base}/ai/orientation/\n2. ${base}/ai/sources/\n3. ${base}/ai/ontology/\n4. ${base}/ai/interpretive-controls/\n5. ${base}/ai/source-text/\n\nFor user-triggered answering rules, use:\n${base}/ai/consult/\n`, 'utf8');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(r => `  <url><loc>${base}${r === '/' ? '/' : r}</loc></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync('public/sitemap.xml', xml, 'utf8');
console.log('Support files generated for GitHub project Pages.');

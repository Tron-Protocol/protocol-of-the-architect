import fs from 'node:fs';
const path = 'src/data/release_the_protocol_unified_ai_website_source_v0_2.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const fail = (msg) => { console.error(`VALIDATION FAILED: ${msg}`); process.exit(1); };
const requiredTop = ['document_identity','public_architecture','rendering_contract','content_sources'];
for (const key of requiredTop) if (!data[key]) fail(`Missing top-level key: ${key}`);
const counts = data.document_identity.record_counts || data.document_identity.record_counts_after_v0_2_restructure || {};
const sources = data.content_sources;
if ((sources.ai_orientation.orientation_sections || []).length !== 11) fail('Orientation section count mismatch.');
if ((sources.source_text_summaries.records || []).length !== 11) fail('Source summary count mismatch.');
if ((sources.source_text.records || []).length !== 11) fail('Source text record count mismatch.');
if (!sources.source_text.records.some(r => r.chapter_id === 'CH10' && r.source_filename === 'Ch10.txt')) fail('CH10 / Ch10.txt mapping not preserved.');
for (const mod of ['entities','events','concepts','claims','relations']) {
  if (!sources.ontology.modules[mod]?.records?.length) fail(`Missing ontology module records: ${mod}`);
}
for (const mod of ['canon_gates','representation_boundaries','uncertainty_boundaries','interpretation_sets']) {
  const records = sources.interpretive_controls.modules[mod]?.records || sources.interpretive_controls.modules[mod]?.gates;
  if (!records?.length) fail(`Missing interpretive controls records: ${mod}`);
}
if (data.document_identity.record_page_generation_allowed !== false) fail('Record-level page generation must remain disabled.');
console.log('VALIDATION PASSED: unified source is structurally ready.');

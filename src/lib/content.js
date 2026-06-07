import source from '@/data/release_the_protocol_unified_ai_website_source_v0_2.json';

export const siteData = source;
export const contentSources = source.content_sources;

export const ontologyModules = ['entities', 'events', 'concepts', 'claims', 'relations'];

export const controlModules = [
  'canon_gates',
  'representation_boundaries',
  'uncertainty_boundaries',
  'interpretation_sets'
];

export const PUBLIC_CHAPTER_TITLES = {
  CH00: 'Introduction',
  CH01: 'Chapter 1: Origins',
  CH02: 'Chapter 2: Humanity',
  CH03: 'Chapter 3: Civilization',
  CH04: 'Chapter 4: Cultivation',
  CH05: 'Chapter 5: The Book of Jasher',
  CH06: 'Chapter 6: The House of Israel',
  CH07: 'Chapter 7: A New Path',
  CH08: 'Chapter 8: The Compendium of Caleb',
  CH09: 'Chapter 9: Exposition',
  CH10: 'Chapter 10: The Book of the Wars of the Lord'
};

export function publicChapterTitle(record) {
  const chapterId = typeof record === 'string' ? record : record?.chapter_id;
  return PUBLIC_CHAPTER_TITLES[chapterId] || record?.public_title || chapterId || 'Source Text';
}

export function titleCase(value = '') {
  return String(value)
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

export function getOrientationSections() {
  return contentSources.ai_orientation.orientation_sections || [];
}

export function getSourceSummaries() {
  return contentSources.source_text_summaries.records || [];
}

export function getOntologyModule(name) {
  return contentSources.ontology.modules[name];
}

export function getControlModule(name) {
  return contentSources.interpretive_controls.modules[name];
}

export function getSourceTextRecords() {
  return contentSources.source_text.records || [];
}

export function getChapterBySlug(slug) {
  return getSourceTextRecords().find(r => String(r.chapter_id).toLowerCase() === slug);
}

export function chapterSlug(record) {
  return String(record.chapter_id).toLowerCase();
}

const BLOCKED_KEYS = new Set([
  'source_trace',
  'audit_records',
  'audit_workflow',
  'provenance',
  'phase_history',
  'batch_history',
  'candidate_filename',
  'validation_status',
  'record_status',
  'runtime',
  'runtime_retention',
  'module_governance',
  'technical_extension_paths',
  'internal_architecture_reference',
  'source_filename',
  'assembly_status',
  'full_text'
]);

const PUBLIC_PRIORITY_KEYS = [
  'title',
  'label',
  'name',
  'public_title',
  'chapter_title',
  'section_title',
  'entity_name',
  'event_name',
  'concept_label',
  'claim_label',
  'relation_label',
  'gate_label',
  'set_label',
  'type',
  'category',
  'summary',
  'chapter_summary',
  'section_summary',
  'description',
  'plain_language_statement',
  'claim_text',
  'boundary_statement',
  'constraint',
  'rule',
  'interpretation_summary',
  'how_this_governs_interpretation',
  'public_role'
];

export function displayTitle(record, fallback = 'Record') {
  if (!record || typeof record !== 'object') return fallback;

  if (record.chapter_id && PUBLIC_CHAPTER_TITLES[record.chapter_id]) {
    return PUBLIC_CHAPTER_TITLES[record.chapter_id];
  }

  for (const key of PUBLIC_PRIORITY_KEYS) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }

  return fallback;
}

export function publicFields(record, limit = 8) {
  if (!record || typeof record !== 'object') return [];

  const fields = [];

  for (const key of PUBLIC_PRIORITY_KEYS) {
    const value = record[key];

    if (value && typeof value === 'string' && !BLOCKED_KEYS.has(key)) {
      fields.push({ key: titleCase(key), value });
    }
  }

  for (const [key, value] of Object.entries(record)) {
    if (fields.length >= limit) break;
    if (BLOCKED_KEYS.has(key) || key.endsWith('_id') || key === 'id') continue;
    if (PUBLIC_PRIORITY_KEYS.includes(key)) continue;

    if (typeof value === 'string' && value.trim()) {
      fields.push({ key: titleCase(key), value });
    }

    if (Array.isArray(value) && value.length && value.length <= 6 && value.every(v => typeof v === 'string')) {
      fields.push({ key: titleCase(key), value: value.join(', ') });
    }
  }

  return fields.slice(0, limit);
}

export function moduleCount(module) {
  return module?.records?.length || module?.gates?.length || 0;
}

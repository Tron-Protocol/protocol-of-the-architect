export const SITE_URL = 'https://tron-protocol.github.io';
export const BASE_PATH = '/protocol-of-the-architect';
export const ABSOLUTE_BASE_URL = `${SITE_URL}${BASE_PATH}`;

export const routes = [
  '/',
  '/slideshow/',
  '/enter/',
  '/podcasts/',
  '/consult/',
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

export function withBase(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const base = import.meta.env?.BASE_URL || '/';

  return `${base.replace(/\/$/, '')}${normalized}`
    .replace(/\/\//g, '/')
    .replace(':/', '://');
}

export function absoluteUrl(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;

  return `${ABSOLUTE_BASE_URL}${normalized === '/' ? '/' : normalized}`;
}

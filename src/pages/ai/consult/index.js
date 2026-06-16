import consultJson from '../../../data/consult_the_protocol.json?raw';

export const prerender = true;

export function GET() {
  return new Response(consultJson, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}

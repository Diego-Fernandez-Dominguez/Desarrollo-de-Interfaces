// APIConnection.ts
const BASE_URL = 'https://tu-api-azure.com';

export const APIConnection = {
  async get(path: string) {
    const res = await fetch(`${BASE_URL}${path}`);
    if (!res.ok) throw new Error('Error en la API');
    return res.json();
  },
  async post(path: string, body: unknown) {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('Error en la API');
    return res.json();
  },
  async put(path: string, body: unknown) {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('Error en la API');
    return res.json();
  },
  async delete(path: string) {
    const res = await fetch(`${BASE_URL}${path}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error en la API');
  },
};

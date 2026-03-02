// api.ts — Legion AI° Backend Service
// Configure BASE_URL to point to your Python backend server

const BASE_URL = 'https://your-legion-backend.com/api'; // ← Replace with your server URL

export interface Message {
  id: string;
  role: 'user' | 'iai';
  text: string;
  timestamp: number;
}

export async function sendMessage(text: string, history: Message[]): Promise<string> {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: text,
      history: history.slice(-20), // send last 20 messages for context
    }),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return data.reply as string;
}

export async function getProjects(userId: string) {
  const res = await fetch(`${BASE_URL}/projects?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function launchToStore(projectId: string, userId: string) {
  const res = await fetch(`${BASE_URL}/store/launch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId, userId }),
  });
  if (!res.ok) throw new Error('Launch failed');
  return res.json();
}

export async function getStoreItems(filter?: string) {
  const url = filter ? `${BASE_URL}/store?type=${filter}` : `${BASE_URL}/store`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch store');
  return res.json();
}

// orchestrator_bridge.ts — IAI Orchestrator Bridge
// Handles communication between the mobile app and the IAI backend orchestrator

const ORCHESTRATOR_URL = 'https://your-legion-backend.com/orchestrator'; // ← Replace with your server URL

export interface WindowSlot {
  id: number;
  ai: string;
  status: 'idle' | 'active' | 'thinking' | 'done';
  task?: string;
  output?: string;
}

export interface OrchestratorSession {
  sessionId: string;
  projectId: string;
  windows: WindowSlot[];
  accuracy: number;
}

export async function startSession(projectDescription: string): Promise<OrchestratorSession> {
  const res = await fetch(`${ORCHESTRATOR_URL}/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description: projectDescription }),
  });
  if (!res.ok) throw new Error('Failed to start orchestrator session');
  return res.json();
}

export async function broadcastPrompt(sessionId: string, prompt: string): Promise<void> {
  await fetch(`${ORCHESTRATOR_URL}/sessions/${sessionId}/broadcast`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
}

export async function getSessionStatus(sessionId: string): Promise<OrchestratorSession> {
  const res = await fetch(`${ORCHESTRATOR_URL}/sessions/${sessionId}`);
  if (!res.ok) throw new Error('Failed to get session status');
  return res.json();
}

export async function mergeOutputs(sessionId: string): Promise<{ merged: string; accuracy: number }> {
  const res = await fetch(`${ORCHESTRATOR_URL}/sessions/${sessionId}/merge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to merge outputs');
  return res.json();
}

export async function autoSelectWindows(
  projectType: string,
  userId: string
): Promise<string[]> {
  const res = await fetch(`${ORCHESTRATOR_URL}/auto-select`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectType, userId }),
  });
  if (!res.ok) throw new Error('Auto-select failed');
  const data = await res.json();
  return data.selectedAIs as string[];
}

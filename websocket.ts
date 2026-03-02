// websocket.ts — Real-time WebSocket for Legion AI°
// Streams live updates from IAI windows and orchestrator

const WS_URL = 'wss://your-legion-backend.com/ws'; // ← Replace with your server URL

type MessageHandler = (event: { type: string; data: any }) => void;

class LegionWebSocket {
  private ws: WebSocket | null = null;
  private handlers: MessageHandler[] = [];
  private reconnectDelay = 2000;
  private userId: string | null = null;

  connect(userId: string) {
    this.userId = userId;
    this.ws = new WebSocket(`${WS_URL}?userId=${userId}`);

    this.ws.onopen = () => {
      console.log('[Legion WS] Connected');
      this.emit({ type: 'connected', data: { userId } });
    };

    this.ws.onmessage = (e) => {
      try {
        const parsed = JSON.parse(e.data);
        this.emit(parsed);
      } catch {
        console.warn('[Legion WS] Invalid message:', e.data);
      }
    };

    this.ws.onerror = (e) => {
      console.error('[Legion WS] Error:', e);
    };

    this.ws.onclose = () => {
      console.log('[Legion WS] Disconnected. Reconnecting...');
      setTimeout(() => this.userId && this.connect(this.userId), this.reconnectDelay);
    };
  }

  disconnect() {
    this.userId = null;
    this.ws?.close();
    this.ws = null;
  }

  send(type: string, data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, data }));
    }
  }

  onMessage(handler: MessageHandler) {
    this.handlers.push(handler);
    return () => {
      this.handlers = this.handlers.filter(h => h !== handler);
    };
  }

  private emit(event: { type: string; data: any }) {
    this.handlers.forEach(h => h(event));
  }
}

export const legionWS = new LegionWebSocket();

import { Actor } from 'base44:runtime/actors';

const MAX_CLIENTS = 2000;

// Site-wide presence room — counts everyone currently on the site.
export default class PresenceRoom extends Actor {
  visitors = new Map(); // conn.id -> connected

  async handleStart() {
    // Reconcile after any wake: a hibernation wake keeps sockets attached
    // without re-running handleConnect, so rehydrate from live connections.
    const live = new Set(this.getConnections().map((c) => c.id));
    for (const id of this.visitors.keys()) {
      if (!live.has(id)) this.visitors.delete(id);
    }
    this.broadcastPresence();
  }

  async handleConnect(conn) {
    if (!this.visitors.has(conn.id) && this.visitors.size >= MAX_CLIENTS) {
      conn.reject(4001, 'room full');
      return;
    }
    this.visitors.set(conn.id, true);
    this.broadcastPresence();
  }

  async handleClose(conn) {
    this.visitors.delete(conn.id);
    this.broadcastPresence();
  }

  broadcastPresence() {
    this.broadcast({ type: 'presence', count: this.visitors.size });
  }
}
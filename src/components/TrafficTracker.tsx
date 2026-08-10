import { useEffect } from 'react';

export const TrafficTracker = () => {
  useEffect(() => {
    if (window.location.pathname.startsWith('/admin')) return;

    const sessionKey = 'woubou_visitor_session';
    const trackedKey = 'woubou_tracked_pages';
    const sessionId = sessionStorage.getItem(sessionKey) || crypto.randomUUID();
    const trackedPages = JSON.parse(sessionStorage.getItem(trackedKey) || '[]') as string[];
    const page = window.location.pathname;

    sessionStorage.setItem(sessionKey, sessionId);
    if (trackedPages.includes(page)) return;
    sessionStorage.setItem(trackedKey, JSON.stringify([...trackedPages, page]));

    fetch('/api/traffic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        sessionId,
        page,
        referrer: document.referrer || 'Direct',
        language: navigator.language
      })
    }).catch(() => {
      // Analytics should never interrupt the visitor experience.
    });
  }, []);

  return null;
};

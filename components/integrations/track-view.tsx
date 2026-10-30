'use client';

import { useEffect } from 'react';
import { track, type EventName } from '@/lib/analytics';

/** Fires one analytics event when the page is viewed (e.g. case_study_view). */
export function TrackView({ event, params }: { event: EventName; params?: Record<string, string> }) {
  useEffect(() => {
    track(event, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);
  return null;
}

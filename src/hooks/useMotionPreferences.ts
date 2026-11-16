import { useEffect, useState } from 'react';

interface NetworkInformationLike {
  saveData?: boolean;
  effectiveType?: string;
  downlink?: number;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
}

export interface MotionPreferences {
  isMobile: boolean;
  prefersReducedMotion: boolean;
  isSlowConnection: boolean;
  preferStaticVideoFallback: boolean;
  lightMotion: boolean;
}

function getConnection(): NetworkInformationLike | undefined {
  if (typeof navigator === 'undefined') return undefined;
  const nav = navigator as Navigator & {
    connection?: NetworkInformationLike;
    mozConnection?: NetworkInformationLike;
    webkitConnection?: NetworkInformationLike;
  };
  return nav.connection || nav.mozConnection || nav.webkitConnection;
}

function checkSlowNetwork(conn?: NetworkInformationLike): boolean {
  if (!conn) return false;
  if (conn.saveData) return true;
  if (conn.effectiveType && ['slow-2g', '2g', '3g'].includes(conn.effectiveType)) {
    return true;
  }
  if (typeof conn.downlink === 'number' && conn.downlink > 0 && conn.downlink < 1.5) {
    return true;
  }
  return false;
}

export function useMotionPreferences(): MotionPreferences {
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  );
  const [isSlowConnection, setIsSlowConnection] = useState<boolean>(() =>
    checkSlowNetwork(getConnection()),
  );

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const conn = getConnection();

    const updateMobile = () => setIsMobile(mobileQuery.matches);
    const updateMotion = () => setPrefersReducedMotion(motionQuery.matches);
    const updateNetwork = () => setIsSlowConnection(checkSlowNetwork(conn));

    updateMobile();
    updateMotion();
    updateNetwork();

    mobileQuery.addEventListener('change', updateMobile);
    motionQuery.addEventListener('change', updateMotion);
    conn?.addEventListener?.('change', updateNetwork);

    return () => {
      mobileQuery.removeEventListener('change', updateMobile);
      motionQuery.removeEventListener('change', updateMotion);
      conn?.removeEventListener?.('change', updateNetwork);
    };
  }, []);

  return {
    isMobile,
    prefersReducedMotion,
    isSlowConnection,
    preferStaticVideoFallback: (isMobile && isSlowConnection) || prefersReducedMotion,
    lightMotion: isMobile || prefersReducedMotion,
  };
}

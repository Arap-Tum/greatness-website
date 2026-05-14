'use client'

import { useEffect, useState } from 'react'

/**
 * Returns a key that increments whenever the page is restored from bfcache.
 * Use it as the `key` prop on your animated section to force a full re-mount,
 * which re-triggers all Framer Motion initial → animate sequences.
 *
 * Usage:
 *   const bfKey = useBfcacheRefresh()
 *   return <section key={bfKey}>...</section>
 */
export function useBfcacheRefresh() {
  const [key, setKey] = useState(0)

  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      // e.persisted === true means the page came from bfcache
      if (e.persisted) {
        setKey((k) => k + 1)
      }
    }

    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [])

  return key
}
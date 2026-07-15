'use client'

import { useEffect } from 'react'

// Marks that the visitor has been on at least one page in this session, so
// BackLink can tell a real in-app "back" apart from a shared link opened
// directly (where there is nothing to go back to).
export function NavHistoryMark() {
  useEffect(() => {
    window.sessionStorage.setItem('sbg-nav-visited', '1')
  }, [])
  return null
}

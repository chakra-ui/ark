'use client'
import { useCallback, useEffect, useState } from 'react'

export function useIsClient() {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])
  return isClient
}

export function useWindowScroll() {
  const [scroll, setScroll] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const onScroll = () => setScroll({ x: window.scrollX, y: window.scrollY })
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return scroll
}

export function useCopyToClipboard() {
  return useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }, [])
}

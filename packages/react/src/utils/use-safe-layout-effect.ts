import { useEffect, useLayoutEffect } from 'react'

export const useSafeLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

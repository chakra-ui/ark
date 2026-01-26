'use client'

import type { ComponentType } from 'react'
import { getExample, hasExample as registryHasExample } from './example-registry'

/**
 * Check if an example exists
 */
export function hasExample(component: string, example: string): boolean {
  // Handle special cases for progress variants
  if (component === 'progress-circular') {
    return registryHasExample('progress', `circular/${example}`)
  }
  if (component === 'progress-linear') {
    return registryHasExample('progress', `linear/${example}`)
  }
  return registryHasExample(component, example)
}

/**
 * Load an example component using static imports from the registry
 * This ensures React context is shared across all examples (no module isolation)
 */
export function loadExample(component: string, example: string): ComponentType | null {
  // Handle special cases for progress variants
  if (component === 'progress-circular') {
    return getExample('progress', `circular/${example}`) ?? null
  }
  if (component === 'progress-linear') {
    return getExample('progress', `linear/${example}`) ?? null
  }
  return getExample(component, example) ?? null
}

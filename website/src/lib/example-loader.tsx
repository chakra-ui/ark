'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

type ExampleModule = { [key: string]: ComponentType }

// Create a context for all example files
// This lets webpack statically analyze the imports at build time
// Using @examples alias configured in next.config.mjs
// @ts-expect-error - require.context is not typed
const exampleContext = require.context(
  '@examples',
  true, // include subdirectories
  /\/examples\/[^/]+\.tsx$/, // match only example files
  'lazy', // lazy load
)

// Get all available example paths
const examplePaths = exampleContext.keys()

/**
 * Convert a component/example pair to the context path
 * e.g., ('dialog', 'basic') -> './dialog/examples/basic.tsx'
 */
function toContextPath(component: string, example: string): string {
  // Handle special cases
  if (component === 'progress-circular') {
    return `./progress/examples/circular/${example}.tsx`
  }
  if (component === 'progress-linear') {
    return `./progress/examples/linear/${example}.tsx`
  }
  return `./${component}/examples/${example}.tsx`
}

/**
 * Convert example name to PascalCase export name
 */
function toExportName(example: string): string {
  return example
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

/**
 * Check if an example exists
 */
export function hasExample(component: string, example: string): boolean {
  const contextPath = toContextPath(component, example)
  return examplePaths.includes(contextPath)
}

/**
 * Load an example component using next/dynamic
 * This uses the pre-analyzed webpack context for optimal bundling
 */
export function loadExample(component: string, example: string): ComponentType | null {
  const contextPath = toContextPath(component, example)

  if (!examplePaths.includes(contextPath)) {
    return null
  }

  const exportName = toExportName(example)

  return dynamic(
    () =>
      exampleContext(contextPath).then((mod: ExampleModule) => {
        // Return the named export or first function export
        if (mod[exportName]) return mod[exportName]
        const firstExport = Object.keys(mod).find((key) => typeof mod[key] === 'function')
        if (firstExport) return mod[firstExport]
        // Return empty component if not found
        return () => null
      }),
    // SSR disabled to prevent hydration mismatch from auto-generated IDs
    { ssr: false },
  )
}

'use client'

import { Suspense, useMemo, useState, useEffect } from 'react'
import { Flex } from 'styled-system/jsx'
import { loadExample } from '~/lib/example-loader'

// Scoped styles for example previews (theme variables + global utilities)
import './example-preview.css'

interface Props {
  component: string
  example: string
}

const LoadingSpinner = () => <div className="example-spinner" role="status" aria-label="Loading example" />

/**
 * Wrapper that waits for styles to be applied before showing content.
 * This prevents flash of unstyled content when CSS modules load.
 */
const StylesReadyWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Wait for next frame to ensure CSS modules are applied
    const raf = requestAnimationFrame(() => {
      // Double RAF to ensure styles are painted
      requestAnimationFrame(() => {
        setIsReady(true)
      })
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      {!isReady && <LoadingSpinner />}
      <div style={{ display: isReady ? 'contents' : 'none' }}>{children}</div>
    </>
  )
}

/**
 * Renders a live preview of an example from the packages.
 * Uses a pre-analyzed webpack context for optimal bundling.
 */
export const ExamplePreview = (props: Props) => {
  const { component, example } = props

  const ExampleComponent = useMemo(() => {
    return loadExample(component, example)
  }, [component, example])

  return (
    <Flex
      minH="40"
      bg="bg.default"
      borderRadius="lg"
      borderWidth="1px"
      width="full"
      overflow="hidden"
      className="not-prose example-preview-scope"
    >
      <Flex justify="center" align="center" flex="1" p={{ base: '4', md: '6' }} style={{ width: '100%' }}>
        {ExampleComponent ? (
          <Suspense fallback={<LoadingSpinner />}>
            <StylesReadyWrapper>
              <ExampleComponent />
            </StylesReadyWrapper>
          </Suspense>
        ) : null}
      </Flex>
    </Flex>
  )
}

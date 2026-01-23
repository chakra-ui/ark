'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { Flex } from 'styled-system/jsx'
import { loadExample } from '~/lib/example-loader'
import './example-preview.css'

interface Props {
  component: string
  example: string
}

const LoadingSpinner = () => <div className="example-spinner" role="status" aria-label="Loading example" />

function useIsClient() {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])
  return isClient
}

/**
 * Wrapper that waits for styles to be applied before showing content.
 * This prevents flash of unstyled content when CSS modules load.
 */
const StylesReadyWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsReady(true))
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

export const ExamplePreview = (props: Props) => {
  const { component, example } = props
  const isClient = useIsClient()

  const ExampleComponent = useMemo(() => {
    if (!isClient) return null
    return loadExample(component, example)
  }, [component, example, isClient])

  return (
    <Flex
      minH={{ base: '32', md: '48' }}
      bg="bg.default"
      borderRadius="lg"
      borderWidth="1px"
      width="full"
      overflow="hidden"
      className="not-prose example-preview-scope"
    >
      <Flex justify="center" align="center" direction="column" flex="1" p={{ base: '4', md: '6' }} width="full">
        {ExampleComponent ? (
          <Suspense fallback={<LoadingSpinner />}>
            <StylesReadyWrapper>
              <ExampleComponent />
            </StylesReadyWrapper>
          </Suspense>
        ) : (
          <LoadingSpinner />
        )}
      </Flex>
    </Flex>
  )
}

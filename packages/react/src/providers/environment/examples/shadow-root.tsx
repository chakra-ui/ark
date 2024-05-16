import { useEffect, useState } from 'react'
import { Environment, useEnvironmentContext } from '../'
import { Portal } from '../../../components'
import { Basic } from '../../../components/tooltip/examples/basic'

export const ShadowRoot = () => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null)
  useEffect(() => {
    if (ref) {
      setShadowRoot(ref.attachShadow({ mode: 'open' }))
    }
  }, [ref])
  return (
    <div ref={setRef}>
      {shadowRoot && (
        <Environment value={() => shadowRoot}>
          <PrintEnvironment />
        </Environment>
      )}
    </div>
  )
}

const PrintEnvironment = () => {
  const { getRootNode } = useEnvironmentContext()

  return (
    <Portal>
      <pre>{JSON.stringify(getRootNode(), null, 2)}</pre>
      <Basic />
    </Portal>
  )
}

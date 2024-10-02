import { Frame } from '@ark-ui/react/frame'
import { useRef } from 'react'

export const InheritStyles = () => {
  const ref = useRef<HTMLIFrameElement>(null)
  return (
    <Frame
      ref={ref}
      onMount={() => {
        const node = ref.current?.contentDocument?.head
        if (!node) return
        const parentStyles = document.head.querySelectorAll('style')
        for (const style of parentStyles) {
          node.appendChild(style.cloneNode(true))
        }
        const linkTags = document.head.querySelectorAll('link[rel="stylesheet"]')
        for (const link of linkTags) {
          node.appendChild(link.cloneNode(true))
        }
      }}
    >
      <h1>Ark UI / Frame</h1>
      <p style={{ marginBottom: '10px', marginTop: '4px' }}>
        This is a React component wrapped in an iframe.
      </p>
    </Frame>
  )
}

import { onSettled } from 'solid-js'
import type { JSX } from '@solidjs/web'

interface FrameContentProps {
  onMount?(): void
  onUnmount?(): void
  children?: JSX.Element
}

export const FrameContent = (props: FrameContentProps) => {
  const { onMount, onUnmount, children } = props

  onSettled(() => {
    onMount?.()
    return () => onUnmount?.()
  })

  return children
}

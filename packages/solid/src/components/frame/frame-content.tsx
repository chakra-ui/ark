import { type JSX, createEffect, onCleanup } from 'solid-js'

interface FrameContentProps {
  onMount?(): void
  onUnmount?(): void
  children?: JSX.Element
}

export const FrameContent = (props: FrameContentProps) => {
  const { onMount, onUnmount, children } = props

  createEffect(() => {
    onMount?.()

    onCleanup(() => {
      onUnmount?.()
    })
  })

  return children
}

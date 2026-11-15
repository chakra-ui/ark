import { Show, createSignal, onSettled } from 'solid-js'
import type { JSX } from '@solidjs/web'

export interface ClientOnlyProps {
  children: JSX.Element
  fallback?: JSX.Element
}

export function ClientOnly(props: ClientOnlyProps) {
  const [isClient, setIsClient] = createSignal(false)

  onSettled(() => {
    setIsClient(true)
  })

  return (
    <Show when={isClient()} fallback={props.fallback}>
      {props.children}
    </Show>
  )
}

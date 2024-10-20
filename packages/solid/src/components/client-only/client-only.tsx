import { type JSX, Show, createSignal, onMount } from 'solid-js'

export interface ClientOnlyProps {
  children: JSX.Element
  fallback?: JSX.Element
}

export function ClientOnly(props: ClientOnlyProps) {
  const [isClient, setIsClient] = createSignal(false)

  onMount(() => {
    setIsClient(true)
  })

  return (
    <Show when={isClient()} fallback={props.fallback}>
      {props.children}
    </Show>
  )
}

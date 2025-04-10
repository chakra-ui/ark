<script module lang="ts">
  import { getDocument, getWindow } from '@zag-js/dom-query'
  import type { Snippet } from 'svelte'
  import type { RootNode } from './use-environment-context'

  export interface EnvironmentProviderProps {
    /**
     * The root node to use for the environment.
     */
    value?: RootNode | (() => RootNode)
    /**
     * The children to render.
     */
    children?: Snippet
  }
</script>

<script lang="ts">
  import { runIfFn } from '$lib/utils/run-if-fn'
  import { reflect } from '@zag-js/svelte'
  import { EnvironmentContextProvider } from './use-environment-context'

  const { value, children }: EnvironmentProviderProps = $props()
  let spanRef: HTMLSpanElement | null = $state(null)

  const getRootNode = () => runIfFn(value) ?? spanRef?.ownerDocument ?? document

  const environment = $derived({
    getRootNode,
    getDocument: () => getDocument(getRootNode()),
    getWindow: () => getWindow(getRootNode()),
  })

  EnvironmentContextProvider(reflect(() => environment))
</script>

{@render children?.()}
{#if !value}
  <span bind:this={spanRef} hidden></span>
{/if}

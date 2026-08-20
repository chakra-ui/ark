<script module lang="ts">
  import type { HotkeyStoreOptions } from '@zag-js/hotkeys'
  import type { Snippet } from 'svelte'

  export interface HotkeysProviderProps extends Omit<HotkeyStoreOptions, 'target'> {
    /**
     * The children to render.
     */
    children?: Snippet
  }
</script>

<script lang="ts">
  import { createHotkeyStore } from '@zag-js/hotkeys'
  import { onDestroy, untrack } from 'svelte'
  import { useEnvironmentContext } from '../environment/use-environment-context.ts'
  import { HotkeyStoreContextProvider } from './use-hotkey-store.svelte.ts'

  const { activeScopes, conflictBehavior, defaultOptions, sequenceTimeoutMs, children }: HotkeysProviderProps = $props()

  const env = useEnvironmentContext()

  // The store is created once; later prop changes are applied through the effects below.
  const store = untrack(() => createHotkeyStore({ activeScopes, conflictBehavior, defaultOptions, sequenceTimeoutMs }))

  HotkeyStoreContextProvider(() => store)

  $effect(() => {
    store.init({ target: env().getRootNode() as Document, defaultOptions })
  })

  $effect(() => {
    if (activeScopes === undefined) return
    store.setScope(activeScopes)
  })

  onDestroy(() => {
    store.destroy()
  })
</script>

{@render children?.()}

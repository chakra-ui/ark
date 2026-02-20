<script module lang="ts">
  export interface DrawerStackProps {
    children?: import('svelte').Snippet
  }
</script>

<script lang="ts">
  import * as drawer from '@zag-js/drawer'
  import { normalizeProps } from '@zag-js/svelte'
  import { DrawerStackProvider } from './use-drawer-stack-context'
  import { provideDrawerStackStore } from './use-drawer-stack-store'

  let { children }: DrawerStackProps = $props()

  const stack = drawer.createStack()
  provideDrawerStackStore(stack)

  let snapshot = $state(stack.getSnapshot())
  $effect(() => {
    return stack.subscribe(() => {
      snapshot = stack.getSnapshot()
    })
  })
  const stackApi = $derived(drawer.connectStack(snapshot, normalizeProps))

  DrawerStackProvider(() => stackApi)
</script>

{@render children?.()}

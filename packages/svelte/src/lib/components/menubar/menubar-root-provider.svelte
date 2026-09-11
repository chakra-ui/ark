<script module lang="ts">
  import type { Assign, HTMLProps, RefAttribute } from '$lib/types'
  import type { UseMenubarReturn } from './use-menubar.svelte.ts'

  interface RootProviderProps {
    value: UseMenubarReturn
  }

  export interface MenubarRootProviderBaseProps extends RootProviderProps, RefAttribute {}
  export interface MenubarRootProviderProps extends Assign<HTMLProps<'div'>, MenubarRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { MenubarProvider } from './use-menubar-context.ts'

  let { ref = $bindable(null), value, ...props }: MenubarRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  MenubarProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} />

<script module lang="ts">
  import type { Assign, HTMLProps, Optional, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseMenubarProps } from './use-menubar.svelte.ts'

  export interface MenubarRootBaseProps
    extends Optional<UseMenubarProps, 'id'>, PolymorphicProps<'div'>, RefAttribute {}
  export interface MenubarRootProps extends Assign<HTMLProps<'div'>, MenubarRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.ts'
  import { Ark } from '../factory/index.ts'
  import { MenubarProvider } from './use-menubar-context.ts'
  import { useMenubar } from './use-menubar.svelte.ts'

  let { ref = $bindable(null), ...props }: MenubarRootProps = $props()
  const providedId = $props.id()

  const [useMenubarProps, localProps] = $derived(
    createSplitProps<Optional<UseMenubarProps, 'id'>>()(props, ['disabled', 'id', 'ids', 'loopFocus', 'orientation']),
  )

  const resolvedProps = $derived({
    ...useMenubarProps,
    id: useMenubarProps.id ?? providedId,
  })

  const menubar = useMenubar(() => resolvedProps)
  const mergedProps = $derived(mergeProps(menubar().getRootProps(), localProps))

  MenubarProvider(menubar)
</script>

<Ark as="div" bind:ref {...mergedProps} />

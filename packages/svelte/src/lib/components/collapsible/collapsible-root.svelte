<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseCollapsibleProps } from './use-collapsible.svelte.ts'

  export interface CollapsibleRootBaseProps extends UseCollapsibleProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface CollapsibleRootProps extends Assign<HTMLProps<'div'>, CollapsibleRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { CollapsibleProvider } from './use-collapsible-context.ts'
  import { splitCollapsibleProps } from './split-collapsible-props.svelte.ts'
  import { useCollapsible } from './use-collapsible.svelte.ts'

  let { ref = $bindable(null), open = $bindable(), ...props }: CollapsibleRootProps = $props()
  const providedId = $props.id()

  const [useCollapsibleProps, localProps] = $derived(splitCollapsibleProps(props))

  const resolvedProps = $derived<UseCollapsibleProps>({
    ...useCollapsibleProps,
    id: useCollapsibleProps.id ?? providedId,
    open,
    onOpenChange(details) {
      useCollapsibleProps.onOpenChange?.(details)
      if (open !== undefined) open = details.open
    },
  })

  const collapsible = useCollapsible(() => resolvedProps)
  const mergedProps = $derived(mergeProps(collapsible().getRootProps(), localProps))

  CollapsibleProvider(collapsible)
</script>

<Ark as="div" bind:ref {...mergedProps} />

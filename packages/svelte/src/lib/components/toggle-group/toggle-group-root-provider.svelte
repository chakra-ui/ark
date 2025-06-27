<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseToggleGroupReturn } from './use-toggle-group.svelte'

  interface RootProviderProps {
    value: UseToggleGroupReturn
  }

  export interface ToggleGroupRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface ToggleGroupRootProviderProps extends Assign<HTMLProps<'div'>, ToggleGroupRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { ToggleGroupProvider } from './use-toggle-group-context'

  let { ref = $bindable(null), value, ...props }: ToggleGroupRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  ToggleGroupProvider(value)
</script>

<Ark as="div" bind:ref {...mergedProps} />

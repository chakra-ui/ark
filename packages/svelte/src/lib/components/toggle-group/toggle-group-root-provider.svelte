<script module lang="ts">
  import type { RootState } from '@zag-js/toggle-group'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseToggleGroupReturn } from './use-toggle-group.svelte.ts'

  interface RootProviderProps {
    value: UseToggleGroupReturn
  }

  export interface ToggleGroupRootProviderState extends RootState {}
  export interface ToggleGroupRootProviderBaseProps
    extends RootProviderProps, PolymorphicProps<'div', ToggleGroupRootProviderState>, RefAttribute {}
  export interface ToggleGroupRootProviderProps extends Assign<HTMLProps<'div'>, ToggleGroupRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { ToggleGroupProvider } from './use-toggle-group-context.ts'

  let { ref = $bindable(null), value, ...props }: ToggleGroupRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  ToggleGroupProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} state={value().getRootState()} />

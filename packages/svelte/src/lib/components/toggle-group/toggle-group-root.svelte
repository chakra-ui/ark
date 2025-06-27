<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseToggleGroupProps } from './use-toggle-group.svelte'

  export interface ToggleGroupRootBaseProps extends UseToggleGroupProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface ToggleGroupRootProps extends Assign<HTMLProps<'div'>, ToggleGroupRootBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { ToggleGroupProvider } from './use-toggle-group-context'
  import { useToggleGroup } from './use-toggle-group.svelte'

  let { ref = $bindable(), value = $bindable<string[]>(), ...props }: ToggleGroupRootProps = $props()

  const [useToggleGroupProps, localProps] = $derived(
    createSplitProps<UseToggleGroupProps>()(props, [
      'defaultValue',
      'deselectable',
      'disabled',
      'id',
      'ids',
      'loopFocus',
      'multiple',
      'onValueChange',
      'orientation',
      'rovingFocus',
      'value',
    ]),
  )

  const id = $props.id()

  const machineProps = $derived.by<UseToggleGroupProps>(() => ({
    ...useToggleGroupProps,
    id: useToggleGroupProps.id ?? id,
    value,
    onValueChange(details) {
      useToggleGroupProps.onValueChange?.(details)
      if (value != null) value = details.value
    },
  }))

  const toggleGroup = useToggleGroup(() => machineProps)
  const mergedProps = $derived(mergeProps(toggleGroup().getRootProps(), localProps))

  ToggleGroupProvider(toggleGroup)
</script>

<Ark as="div" bind:ref {...mergedProps} />

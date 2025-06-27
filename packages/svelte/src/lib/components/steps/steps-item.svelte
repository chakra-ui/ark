<script module lang="ts">
  import type { ItemProps } from '@zag-js/steps'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface StepsItemBaseProps extends ItemProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface StepsItemProps extends Assign<HTMLProps<'div'>, StepsItemBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useStepsContext } from './use-steps-context'
  import { StepsItemProvider } from './use-steps-item-context'
  import { StepsItemPropsProvider } from './use-steps-item-props-context'

  let { ref = $bindable(null), ...props }: StepsItemProps = $props()
  const [itemProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['index']))

  const steps = useStepsContext()
  const itemState = $derived(steps().getItemState(itemProps))
  const mergedProps = $derived(mergeProps(steps().getItemProps(itemProps), localProps))

  StepsItemPropsProvider(() => itemProps)
  StepsItemProvider(() => itemState)
</script>

<Ark as="div" bind:ref {...mergedProps} />

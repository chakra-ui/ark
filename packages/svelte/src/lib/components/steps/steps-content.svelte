<script module lang="ts">
  import type { ItemProps } from '@zag-js/steps'
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface StepsContentBaseProps extends ItemProps, PolymorphicProps<'div'> {}
  export interface StepsContentProps extends Assign<HTMLProps<'div'>, StepsContentBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useStepsContext } from './use-steps-context'

  const props: StepsContentProps = $props()
  const [itemProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['index']))

  const steps = useStepsContext()
  const mergedProps = $derived(mergeProps(steps().getContentProps(itemProps), localProps))
</script>

<Ark as="div" {...mergedProps} />

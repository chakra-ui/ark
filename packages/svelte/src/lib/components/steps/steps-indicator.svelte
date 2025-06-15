<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface StepsIndicatorBaseProps extends PolymorphicProps<'div'> {}
  export interface StepsIndicatorProps extends Assign<HTMLProps<'div'>, StepsIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useStepsContext } from './use-steps-context'
  import { useStepsItemPropsContext } from './use-steps-item-props-context'

  const props: StepsIndicatorProps = $props()

  const steps = useStepsContext()
  const itemProps = useStepsItemPropsContext()
  const mergedProps = $derived(mergeProps(steps().getIndicatorProps(itemProps()), props))
</script>

<Ark as="div" {...mergedProps} />

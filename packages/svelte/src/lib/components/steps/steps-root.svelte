<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseStepsProps } from './use-steps.svelte'

  export interface StepsRootBaseProps extends UseStepsProps, PolymorphicProps<'div'> {}
  export interface StepsRootProps extends Assign<HTMLProps<'div'>, StepsRootBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSteps } from './use-steps.svelte'
  import { StepsProvider } from './use-steps-context'

  let { step = $bindable(), ...props }: StepsRootProps = $props()
  const providedId = $props.id()

  const [useStepsProps, localProps] = $derived(
    createSplitProps<UseStepsProps>()(props, [
      'defaultStep',
      'id',
      'ids',
      'count',
      'linear',
      'onStepChange',
      'onStepComplete',
      'orientation',
      'step',
    ]),
  )

  const resolvedProps = $derived<UseStepsProps>({
    ...useStepsProps,
    id: useStepsProps.id ?? providedId,
    step,
    onStepChange(details) {
      useStepsProps.onStepChange?.(details)
      if (step !== undefined) step = details.step
    },
  })

  const stepsApi = useSteps(() => resolvedProps)
  const mergedProps = $derived(mergeProps(stepsApi().getRootProps(), localProps))

  StepsProvider(stepsApi)
</script>

<Ark as="div" {...mergedProps} />

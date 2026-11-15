<script module lang="ts">
  import type { Assign, HTMLProps, Optional, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseStepsProps } from './use-steps.svelte.ts'

  export interface StepsRootBaseProps extends Optional<UseStepsProps, 'id'>, PolymorphicProps<'div'>, RefAttribute {}
  export interface StepsRootProps extends Assign<HTMLProps<'div'>, StepsRootBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useSteps } from './use-steps.svelte.ts'
  import { StepsProvider } from './use-steps-context.ts'

  let { ref = $bindable(null), value = $bindable(), ...props }: StepsRootProps = $props()
  const providedId = $props.id()

  const [useStepsProps, localProps] = $derived(
    createSplitProps<Optional<UseStepsProps, 'id'>>()(props, [
      'completedValues',
      'defaultCompletedValues',
      'defaultValue',
      'id',
      'ids',
      'items',
      'linear',
      'onComplete',
      'onCompletedChange',
      'onNavigationBlocked',
      'onValueChange',
      'orientation',
      'translations',
      'value',
    ]),
  )

  const resolvedProps = $derived<UseStepsProps>({
    ...useStepsProps,
    id: useStepsProps.id ?? providedId,
    value,
    onValueChange(details) {
      useStepsProps.onValueChange?.(details)
      if (value !== undefined) value = details.value ?? undefined
    },
  })

  const stepsApi = useSteps(() => resolvedProps)
  const mergedProps = $derived(mergeProps(stepsApi().getRootProps(), localProps))

  StepsProvider(stepsApi)
</script>

<Ark as="div" bind:ref {...mergedProps} />

<script module lang="ts">
  import type { Assign, HTMLProps, Optional, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseNumberFlowProps } from './use-number-flow.svelte.ts'

  export interface NumberFlowRootBaseProps
    extends Optional<UseNumberFlowProps, 'id'>, PolymorphicProps<'span'>, RefAttribute {}
  export interface NumberFlowRootProps extends Assign<HTMLProps<'span'>, NumberFlowRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.ts'
  import { Ark } from '../factory/index.ts'
  import { NumberFlowProvider } from './use-number-flow-context.ts'
  import { useNumberFlow } from './use-number-flow.svelte.ts'

  let { ref = $bindable(null), value = $bindable(), ...props }: NumberFlowRootProps = $props()
  const providedId = $props.id()

  const [useNumberFlowProps, localProps] = $derived(
    createSplitProps<Optional<UseNumberFlowProps, 'id'>>()(props, [
      'continuous',
      'defaultValue',
      'formatOptions',
      'id',
      'ids',
      'live',
      'locale',
      'onAnimationComplete',
      'onAnimationStart',
      'onValueChange',
      'prefix',
      'respectMotionPreference',
      'spinTiming',
      'stagger',
      'suffix',
      'transformTiming',
      'trend',
      'value',
    ]),
  )

  const resolvedProps = $derived<UseNumberFlowProps>({
    ...useNumberFlowProps,
    id: useNumberFlowProps.id ?? providedId,
    value,
    onValueChange(details) {
      useNumberFlowProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
  })

  const numberFlow = useNumberFlow(() => resolvedProps)
  const mergedProps = $derived(mergeProps(numberFlow().getRootProps(), localProps))

  NumberFlowProvider(numberFlow)
</script>

<Ark as="span" bind:ref {...mergedProps} />

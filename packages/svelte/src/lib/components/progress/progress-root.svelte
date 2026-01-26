<script module lang="ts">
  import type { Assign, HTMLProps, Optional, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseProgressProps } from './use-progress.svelte'

  export interface ProgressRootBaseProps
    extends Optional<UseProgressProps, 'id'>, PolymorphicProps<'div'>, RefAttribute {}
  export interface ProgressRootProps extends Assign<HTMLProps<'div'>, ProgressRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { ProgressProvider } from './use-progress-context'
  import { useProgress } from './use-progress.svelte'

  let { ref = $bindable(null), value = $bindable(), ...props }: ProgressRootProps = $props()
  const providedId = $props.id()

  const [useProgressProps, localProps] = $derived(
    createSplitProps<Optional<UseProgressProps, 'id'>>()(props, [
      'defaultValue',
      'formatOptions',
      'id',
      'ids',
      'locale',
      'max',
      'min',
      'onValueChange',
      'orientation',
      'translations',
      'value',
    ]),
  )
  const resolvedProps = $derived<UseProgressProps>({
    ...useProgressProps,
    id: useProgressProps.id ?? providedId,
    value,
    onValueChange(details) {
      useProgressProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
  })

  const progress = useProgress(() => resolvedProps)
  const mergedProps = $derived(mergeProps(progress().getRootProps(), localProps))

  ProgressProvider(progress)
</script>

<Ark as="div" bind:ref {...mergedProps} />

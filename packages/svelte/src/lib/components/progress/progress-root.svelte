<script module lang="ts">
  import type { Assign, HTMLProps, Optional, PolymorphicProps } from '$lib/types'
  import type { UseProgressProps } from './use-progress.svelte'

  export interface ProgressRootBaseProps extends Optional<UseProgressProps, 'id'>, PolymorphicProps<'div'> {}
  export interface ProgressRootProps extends Assign<HTMLProps<'div'>, ProgressRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps, reflect } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { ProgressProvider } from './use-progress-context'
  import { useProgress } from './use-progress.svelte'

  const _props: ProgressRootProps = $props()
  const providedId = $props.id()

  const [useProgressProps, localProps] = $derived(
    createSplitProps<Optional<UseProgressProps, 'id'>>()(_props, [
      'defaultValue',
      'id',
      'ids',
      'max',
      'min',
      'onValueChange',
      'orientation',
      'translations',
      'value',
    ]),
  )
  const resolvedProps = $derived({
    ...useProgressProps,
    id: providedId,
  })

  const progress = useProgress(reflect(() => resolvedProps))
  const mergedProps = $derived(mergeProps(progress().getRootProps(), localProps))

  ProgressProvider(progress)
</script>

<Ark as="div" {...mergedProps} />

<script module lang="ts">
import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
import type { UseProgressProps } from './use-progress.svelte'

export interface ProgressRootBaseProps extends UseProgressProps, PolymorphicProps<'div'> {}
export interface ProgressRootProps extends Assign<HTMLProps<'div'>, ProgressRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps, reflect } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { ProgressProvider } from './use-progress-context'
  import { useProgress } from './use-progress.svelte'

  const props: ProgressRootProps = $props()
  const [useProgressProps, localProps] = $derived(
    createSplitProps<UseProgressProps>()(props, [
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

  const progress = useProgress(reflect(() => useProgressProps))
  const mergedProps = $derived(mergeProps(progress().getRootProps(), localProps))

  ProgressProvider(progress)
</script>

<Ark as="div" {...mergedProps} />

<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ProgressTrackBaseProps extends PolymorphicProps<'div'> {}
  export interface ProgressTrackProps extends HTMLProps<'div'>, ProgressTrackBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useProgressContext } from './use-progress-context'

  const props: ProgressTrackProps = $props()
  const progress = useProgressContext()
  const mergedProps = $derived(mergeProps(progress().getTrackProps(), props))
</script>

<Ark as="div" {...mergedProps} />

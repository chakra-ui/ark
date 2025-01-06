<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ProgressCircleTrackBaseProps extends PolymorphicProps<'circle'> {}
  export interface ProgressCircleTrackProps
    extends HTMLProps<'circle'>,
      ProgressCircleTrackBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useProgressContext } from './use-progress-context'

  const props: ProgressCircleTrackProps = $props()
  const progress = useProgressContext()
  const mergedProps = $derived(mergeProps(progress().getCircleTrackProps(), props))
</script>

<Ark as="circle" {...mergedProps} />

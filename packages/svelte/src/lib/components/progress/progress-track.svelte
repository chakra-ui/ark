<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ProgressTrackBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ProgressTrackProps extends HTMLProps<'div'>, ProgressTrackBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useProgressContext } from './use-progress-context'

  let { ref = $bindable(), ...props }: ProgressTrackProps = $props()
  const progress = useProgressContext()
  const mergedProps = $derived(mergeProps(progress().getTrackProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />

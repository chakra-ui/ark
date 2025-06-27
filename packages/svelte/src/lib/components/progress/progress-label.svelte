<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ProgressLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface ProgressLabelProps extends HTMLProps<'label'>, ProgressLabelBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useProgressContext } from './use-progress-context'

  let { ref = $bindable(), ...props }: ProgressLabelProps = $props()
  const progress = useProgressContext()
  const mergedProps = $derived(mergeProps(progress().getLabelProps(), props))
</script>

<Ark as="label" bind:ref {...mergedProps} />

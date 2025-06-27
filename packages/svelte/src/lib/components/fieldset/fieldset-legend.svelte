<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FieldsetLegendBaseProps extends PolymorphicProps<'legend'>, RefAttribute {}
  export interface FieldsetLegendProps extends Assign<HTMLProps<'legend'>, FieldsetLegendBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFieldsetContext } from './use-fieldset-context'

  let { ref = $bindable(), ...props }: FieldsetLegendProps = $props()
  const fieldset = useFieldsetContext()
  const mergedProps = $derived(mergeProps(fieldset?.().getLegendProps(), props))
</script>

<Ark as="legend" bind:ref {...mergedProps} />

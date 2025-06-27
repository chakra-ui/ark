<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CheckboxLabelBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface CheckboxLabelProps extends Assign<HTMLProps<'span'>, CheckboxLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useCheckboxContext } from './use-checkbox-context'

  let { ref = $bindable(), ...props }: CheckboxLabelProps = $props()

  const checkbox = useCheckboxContext()
  const mergedProps = $derived(mergeProps(checkbox().getLabelProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />

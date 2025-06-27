<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CheckboxControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface CheckboxControlProps extends Assign<HTMLProps<'div'>, CheckboxControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useCheckboxContext } from './use-checkbox-context'

  let { ref = $bindable(null), ...props }: CheckboxControlProps = $props()

  const checkbox = useCheckboxContext()
  const mergedProps = $derived(mergeProps(checkbox().getControlProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />

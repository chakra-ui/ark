<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CheckboxIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    indeterminate?: boolean
  }
  export interface CheckboxIndicatorProps extends Assign<HTMLProps<'div'>, CheckboxIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useCheckboxContext } from './use-checkbox-context'

  let { ref = $bindable(), indeterminate, ...rest }: CheckboxIndicatorProps = $props()

  const checkbox = useCheckboxContext()
  const mergedProps = $derived(mergeProps(checkbox().getIndicatorProps(), rest))
  const isVisible = $derived(indeterminate ? checkbox().indeterminate : checkbox().checked)
</script>

<Ark as="div" bind:ref {...mergedProps} hidden={!isVisible} />

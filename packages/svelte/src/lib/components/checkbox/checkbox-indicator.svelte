<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface CheckboxIndicatorBaseProps extends PolymorphicProps<'div'> {
    indeterminate?: boolean
  }
  export interface CheckboxIndicatorProps extends Assign<HTMLProps<'div'>, CheckboxIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useCheckboxContext } from './use-checkbox-context'

  const { indeterminate, ...rest }: CheckboxIndicatorProps = $props()

  const checkbox = useCheckboxContext()
  const mergedProps = $derived(mergeProps(checkbox().getIndicatorProps(), rest))
  const isVisible = $derived(indeterminate ? checkbox().indeterminate : checkbox().checked)
</script>

<Ark as="div" {...mergedProps} hidden={!isVisible} />

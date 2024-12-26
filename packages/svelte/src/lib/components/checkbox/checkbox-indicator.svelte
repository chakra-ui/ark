<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  interface IndicatorProps {
    indeterminate?: boolean
  }

  export interface CheckboxIndicatorBaseProps extends IndicatorProps, PolymorphicProps<'div'> {}
  export interface CheckboxIndicatorProps extends HTMLProps<'div'>, CheckboxIndicatorBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useCheckboxContext } from './use-checkbox-context'

  const { indeterminate, ...rest }: CheckboxIndicatorProps = $props()
  // const props: CheckboxIndicatorProps = $props()
  $inspect('props', indeterminate)
  const checkbox = useCheckboxContext()
  $inspect('checkbox', checkbox())
  const isVisible = $derived(indeterminate ? checkbox().indeterminate : checkbox().checked)
  // const isVisible = $derived(props.indeterminate ? checkbox().indeterminate : checkbox().checked)
  // const isVisible = $derived(checkbox().checked)
  $inspect('isVisible', isVisible)
  const mergedProps = $derived(mergeProps(checkbox().getIndicatorProps(), rest))
  // const mergedProps = $derived(mergeProps(checkbox().getIndicatorProps(), props))
  console.log('--------------')
</script>

<Ark as="div" {...mergedProps} hidden={!isVisible} />

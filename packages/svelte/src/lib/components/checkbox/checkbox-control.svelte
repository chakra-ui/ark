<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface CheckboxControlBaseProps extends PolymorphicProps<'div'> {}
  export interface CheckboxControlProps extends HTMLProps<'div'>, CheckboxControlBaseProps {}
</script>

<script lang="ts">
  import { useCheckboxContext } from './use-checkbox-context'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'

  const props: CheckboxControlProps = $props()

  const checkbox = useCheckboxContext()
  const mergedProps = $derived(mergeProps(checkbox().getControlProps(), props))
</script>

<Ark as="div" {...mergedProps} />

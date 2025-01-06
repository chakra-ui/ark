<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface CheckboxLabelBaseProps extends PolymorphicProps<'span'> {}
  export interface CheckboxLabelProps extends HTMLProps<'span'>, CheckboxLabelBaseProps {}
</script>

<script lang="ts">
  import { useCheckboxContext } from './use-checkbox-context'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'

  const props: CheckboxLabelProps = $props()

  const checkbox = useCheckboxContext()
  const mergedProps = $derived(mergeProps(checkbox().getLabelProps(), props))
</script>

<Ark as="span" {...mergedProps} />

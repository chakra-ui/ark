<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface CheckboxLabelBaseProps extends PolymorphicProps<'span'> {}
  export interface CheckboxLabelProps extends Assign<HTMLProps<'span'>, CheckboxLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useCheckboxContext } from './use-checkbox-context'

  const props: CheckboxLabelProps = $props()

  const checkbox = useCheckboxContext()
  const mergedProps = $derived(mergeProps(checkbox().getLabelProps(), props))
</script>

<Ark as="span" {...mergedProps} />

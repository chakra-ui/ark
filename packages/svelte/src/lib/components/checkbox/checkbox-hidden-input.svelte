<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface CheckboxHiddenInputBaseProps extends PolymorphicProps<'input'> {}
  export interface CheckboxHiddenInputProps
    extends HTMLProps<'input'>,
      CheckboxHiddenInputBaseProps {}
</script>

<script lang="ts">
  import { useCheckboxContext } from './use-checkbox-context'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'

  // TODO: use Field component
  const props: CheckboxHiddenInputProps = $props()

  const checkbox = useCheckboxContext()
  const mergedProps = $derived(mergeProps(checkbox().getHiddenInputProps(), props))
</script>

<Ark as="input" {...mergedProps} />

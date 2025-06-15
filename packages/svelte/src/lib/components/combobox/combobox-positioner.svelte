<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ComboboxPositionerBaseProps extends PolymorphicProps<'div'> {}
  export interface ComboboxPositionerProps extends Assign<HTMLProps<'div'>, ComboboxPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useComboboxContext } from './use-combobox-context'

  const props: ComboboxPositionerProps = $props()

  const combobox = useComboboxContext()
  const mergedProps = $derived(mergeProps(combobox().getPositionerProps(), props))
</script>

<Ark as="div" {...mergedProps} />

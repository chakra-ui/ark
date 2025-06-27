<script module lang="ts">
  import type { InputProps } from '@zag-js/listbox'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface ListboxInputBaseProps extends InputProps, PolymorphicProps<'input'>, RefAttribute {}
  export interface ListboxInputProps extends Assign<HTMLProps<'input'>, ListboxInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.js'
  import { Ark } from '../factory/index.js'
  import { useListboxContext } from './use-listbox-context.js'

  let { ref = $bindable(), ...props }: ListboxInputProps = $props()

  const [inputProps, localProps] = $derived(createSplitProps<InputProps>()(props, ['autoHighlight']))
  const listbox = useListboxContext()
  const mergedProps = $derived(mergeProps(listbox().getInputProps(inputProps), localProps))
</script>

<Ark as="input" bind:ref {...mergedProps} />

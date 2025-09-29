<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FieldInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface FieldInputProps extends Assign<HTMLProps<'input'>, FieldInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFieldContext } from './use-field-context'
  import type { HTMLInputAttributes } from 'svelte/elements'

  let { ref = $bindable(null), value = $bindable(), ...props }: FieldInputProps = $props()
  const field = useFieldContext()

  const nativeInputProps: HTMLInputAttributes = $derived({
    value,
    oninput(e) {
      value = e.currentTarget.value
    },
  })

  const mergedProps = $derived(mergeProps(field?.().getInputProps() ?? {}, nativeInputProps, props))
</script>

<Ark as="input" bind:ref {...mergedProps} />

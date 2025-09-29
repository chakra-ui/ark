<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FieldSelectBaseProps extends PolymorphicProps<'select'>, RefAttribute {}
  export interface FieldSelectProps extends Assign<HTMLProps<'select'>, FieldSelectBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFieldContext } from './use-field-context'

  let { ref = $bindable(null), value = $bindable(), multiple, ...props }: FieldSelectProps = $props()

  const field = useFieldContext()

  const nativeSelectProps: HTMLProps<'select'> = $derived({
    value,
    multiple,
    oninput(e) {
      value = multiple
        ? Array.from(e.currentTarget.selectedOptions).map((option) => option.value)
        : e.currentTarget.value
    },
  })

  const mergedProps = $derived(mergeProps(field?.().getSelectProps() ?? {}, nativeSelectProps, props))
</script>

<Ark as="select" bind:ref {...mergedProps} />

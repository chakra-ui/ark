<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FieldSelectBaseProps extends PolymorphicProps<'select'>, RefAttribute {}
  export interface FieldSelectProps extends Assign<HTMLProps<'select'>, FieldSelectBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFieldContext } from './use-field-context'

  let { ref = $bindable(), ...props }: FieldSelectProps = $props()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(field?.().getSelectProps() ?? {}, props))
</script>

<Ark as="select" bind:ref {...mergedProps} />

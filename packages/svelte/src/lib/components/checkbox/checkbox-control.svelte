<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CheckboxControlBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface CheckboxControlProps extends Assign<HTMLProps<'span'>, CheckboxControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useCheckboxContext } from './use-checkbox-context.ts'

  let { ref = $bindable(null), ...props }: CheckboxControlProps = $props()

  const checkbox = useCheckboxContext()
  const mergedProps = $derived(mergeProps(checkbox().getControlProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />

<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SwitchLabelBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface SwitchLabelProps extends Assign<HTMLProps<'span'>, SwitchLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSwitchContext } from './use-switch-context'

  let { ref = $bindable(null), ...props }: SwitchLabelProps = $props()

  const switchMachine = useSwitchContext()
  const mergedProps = $derived(mergeProps(switchMachine().getLabelProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />

<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface SwitchHiddenInputBaseProps extends PolymorphicProps<'input'> {}
  export interface SwitchHiddenInputProps extends Assign<HTMLProps<'input'>, SwitchHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSwitchContext } from './use-switch-context'

  const props: SwitchHiddenInputProps = $props()

  const switchMachine = useSwitchContext()
  const mergedProps = $derived(mergeProps(switchMachine().getHiddenInputProps(), props))
</script>

<Ark as="input" {...mergedProps} />

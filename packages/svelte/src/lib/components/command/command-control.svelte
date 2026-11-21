<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CommandControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface CommandControlProps extends Assign<HTMLProps<'div'>, CommandControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { parts } from './command.anatomy.ts'
  import { useCommandContext } from './use-command-context.ts'

  let { ref = $bindable(null), ...props }: CommandControlProps = $props()

  const command = useCommandContext()
  const mergedProps = $derived(mergeProps(command().getControlProps(), parts.control.attrs(''), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />

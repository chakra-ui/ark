<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CommandInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface CommandInputProps extends Assign<HTMLProps<'input'>, CommandInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { parts } from './command.anatomy.ts'
  import { useCommandContext } from './use-command-context.ts'

  let { ref = $bindable(null), ...props }: CommandInputProps = $props()

  const command = useCommandContext()
  const mergedProps = $derived(mergeProps(command().getInputProps(), parts.input.attrs(''), props))
</script>

<Ark as="input" bind:ref {...mergedProps} />

<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CommandLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface CommandLabelProps extends Assign<HTMLProps<'label'>, CommandLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { parts } from './command.anatomy.ts'
  import { useCommandContext } from './use-command-context.ts'

  let { ref = $bindable(null), ...props }: CommandLabelProps = $props()

  const command = useCommandContext()
  const mergedProps = $derived(mergeProps(command().getLabelProps(), parts.label.attrs(''), props))
</script>

<Ark as="label" bind:ref {...mergedProps} />

<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CommandItemTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface CommandItemTextProps extends Assign<HTMLProps<'span'>, CommandItemTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { parts } from './command.anatomy.ts'
  import { useCommandContext } from './use-command-context.ts'
  import { useCommandItemPropsContext } from './use-command-item-props-context.ts'

  let { ref = $bindable(null), ...props }: CommandItemTextProps = $props()

  const command = useCommandContext()
  const itemProps = useCommandItemPropsContext()
  const mergedProps = $derived(mergeProps(command().getItemTextProps(itemProps()), parts.itemText.attrs(''), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />

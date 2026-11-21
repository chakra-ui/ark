<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CommandListBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface CommandListProps extends Assign<HTMLProps<'div'>, CommandListBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { parts } from './command.anatomy.ts'
  import { useCommandContext } from './use-command-context.ts'

  let { ref = $bindable(null), ...props }: CommandListProps = $props()

  const keepInputFocus = (event: PointerEvent) => {
    if (event.button === 0) event.preventDefault()
  }

  const command = useCommandContext()
  const mergedProps = $derived(
    mergeProps(command().getListProps(), parts.list.attrs(''), { onpointerdown: keepInputFocus }, props),
  )
</script>

<Ark as="div" bind:ref {...mergedProps} />

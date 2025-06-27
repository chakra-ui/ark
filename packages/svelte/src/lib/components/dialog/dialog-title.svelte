<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface DialogTitleBaseProps extends PolymorphicProps<'h2'>, RefAttribute {}
  export interface DialogTitleProps extends Assign<HTMLProps<'h2'>, DialogTitleBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useDialogContext } from './use-dialog-context'

  let { ref = $bindable(), ...props }: DialogTitleProps = $props()

  const dialog = useDialogContext()
  const mergedProps = $derived(mergeProps(dialog().getTitleProps(), props))
</script>

<Ark as="h2" bind:ref {...mergedProps} />

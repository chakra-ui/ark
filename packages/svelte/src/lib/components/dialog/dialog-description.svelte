<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface DialogDescriptionBaseProps extends PolymorphicProps<'p'>, RefAttribute {}
  export interface DialogDescriptionProps extends Assign<HTMLProps<'p'>, DialogDescriptionBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useDialogContext } from './use-dialog-context'

  let { ref = $bindable(), ...props }: DialogDescriptionProps = $props()

  const dialog = useDialogContext()
  const mergedProps = $derived(mergeProps(dialog().getDescriptionProps(), props))
</script>

<Ark as="p" bind:ref {...mergedProps} />

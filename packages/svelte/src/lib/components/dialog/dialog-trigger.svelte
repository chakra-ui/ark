<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface DialogTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface DialogTriggerProps extends Assign<HTMLProps<'button'>, DialogTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { useDialogContext } from './use-dialog-context'

  let { ref = $bindable(), ...props }: DialogTriggerProps = $props()

  const dialog = useDialogContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(
    mergeProps(
      {
        ...dialog().getTriggerProps(),
        'aria-controls': presence().unmounted ? undefined : dialog().getTriggerProps()['aria-controls'],
      },
      props,
    ),
  )
</script>

<Ark as="button" bind:ref {...mergedProps} />

<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface PopoverTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface PopoverTriggerProps extends Assign<HTMLProps<'button'>, PopoverTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { usePopoverContext } from './use-popover-context'

  const props: PopoverTriggerProps = $props()

  const popover = usePopoverContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(
    mergeProps(
      {
        ...popover().getTriggerProps(),
        'aria-controls': presence().unmounted ? undefined : popover().getTriggerProps()['aria-controls'],
      },
      props,
    ),
  )
</script>

<Ark as="button" {...mergedProps} />

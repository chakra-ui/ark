<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { TriggerProps } from '@zag-js/popover'

  export interface PopoverTriggerBaseProps extends TriggerProps, PolymorphicProps<'button'>, RefAttribute {}
  export interface PopoverTriggerProps extends Assign<HTMLProps<'button'>, PopoverTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { usePopoverContext } from './use-popover-context'

  let { ref = $bindable(null), ...props }: PopoverTriggerProps = $props()
  const [triggerProps, localProps] = $derived(createSplitProps<TriggerProps>()(props, ['value']))

  const popover = usePopoverContext()
  const presence = usePresenceContext()
  const mergedProps = $derived.by(() => {
    const triggerPropsRaw = popover().getTriggerProps(triggerProps)
    return mergeProps(
      {
        ...triggerPropsRaw,
        'aria-controls': presence().unmounted ? undefined : triggerPropsRaw['aria-controls'],
      },
      localProps,
    )
  })
</script>

<Ark as="button" bind:ref {...mergedProps} />

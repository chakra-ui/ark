<script lang="ts" module>
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'

  export interface FloatingPanelTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface FloatingPanelTriggerProps extends Assign<HTMLProps<'button'>, FloatingPanelTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { usePresenceContext } from '../presence/index.js'
  import { useFloatingPanelContext } from './use-floating-panel-context.js'

  let props: FloatingPanelTriggerProps = $props()

  const floatingPanel = useFloatingPanelContext()
  const presence = usePresenceContext()

  const triggerProps = $derived(floatingPanel().getTriggerProps())
  const mergedProps = $derived(
    mergeProps(
      {
        ...triggerProps,
        'aria-controls': presence().unmounted ? undefined : triggerProps['aria-controls'],
      },
      props,
    ),
  )
</script>

<Ark as="button" {...mergedProps} />

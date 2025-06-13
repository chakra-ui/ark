<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { TriggerProps } from '@zag-js/tabs'

  export interface TabsTriggerBaseProps extends TriggerProps, PolymorphicProps<'button'> {}
  export interface TabsTriggerProps extends Assign<HTMLProps<'button'>, TabsTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { Ark } from '../factory'
  import { useTabsContext } from './use-tabs-context'

  const props: TabsTriggerProps = $props()
  const [triggerProps, localProps] = createSplitProps<TriggerProps>()(props, ['value', 'disabled'])
  const tabs = useTabsContext()
  const mergedProps = $derived(mergeProps(tabs().getTriggerProps(triggerProps), localProps))
</script>

<Ark as="button" {...mergedProps} />

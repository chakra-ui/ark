<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { StepActionTriggerProps } from '@zag-js/tour'

  export interface TourActionTriggerBaseProps
    extends StepActionTriggerProps,
      PolymorphicProps<'button'>,
      RefAttribute {}
  export interface TourActionTriggerProps extends HTMLProps<'button'>, TourActionTriggerBaseProps {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTourContext } from './use-tour-context'

  let { ref = $bindable(), ...props }: TourActionTriggerProps = $props()
  const [actionTriggerProps, localProps] = createSplitProps<StepActionTriggerProps>()(props, ['action'])

  const tour = useTourContext()

  const mergedProps = $derived(mergeProps(tour().getActionTriggerProps(actionTriggerProps), localProps))
</script>

<Ark as="button" bind:ref {...mergedProps}>
  {#if localProps.children}
    {@render localProps.children()}
  {:else}
    {actionTriggerProps.action.label}
  {/if}
</Ark>

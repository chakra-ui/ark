<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UsePresenceProps } from '../presence'
  import type { UseCascadeSelectReturn } from './use-cascade-select.svelte'

  export interface CascadeSelectRootProviderBaseProps
    extends UsePresenceProps,
      PolymorphicProps<'div'>,
      RefAttribute {
    value: UseCascadeSelectReturn
  }
  export interface CascadeSelectRootProviderProps
    extends Assign<HTMLProps<'div'>, CascadeSelectRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '$lib/components/factory'
  import { mergeProps } from '@zag-js/svelte'
  import { PresenceProvider, splitPresenceProps, usePresence } from '../presence'
  import { CascadeSelectProvider } from './use-cascade-select-context'

  let { ref = $bindable(null), ...props }: CascadeSelectRootProviderProps = $props()

  const [presenceProps, localProps] = $derived(splitPresenceProps(props))
  const presence = usePresence(() => ({ present: props.value().open, ...presenceProps }))
  const mergedProps = $derived(mergeProps(props.value().getRootProps(), localProps))

  CascadeSelectProvider(() => props.value())
  PresenceProvider(presence)
</script>

<Ark as="div" bind:ref {...mergedProps} />

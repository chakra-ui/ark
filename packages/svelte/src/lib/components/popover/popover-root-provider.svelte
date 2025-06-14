<script module lang="ts">
  import type { UsePopoverReturn } from './use-popover.svelte'
  import type { UsePresenceReturn } from '../presence'
  import type { Snippet } from 'svelte'

  export interface PopoverRootProviderBaseProps {
    value: UsePopoverReturn
    presence: UsePresenceReturn
    children?: Snippet
  }
  export interface PopoverRootProviderProps extends PopoverRootProviderBaseProps {}
</script>

<script lang="ts">
  import { PresenceProvider } from '../presence'
  import { PopoverProvider } from './use-popover-context'

  const { value, presence, children }: PopoverRootProviderProps = $props()

  PopoverProvider(value)
  PresenceProvider(presence)
</script>

{@render children?.()}

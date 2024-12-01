<script module lang="ts">
import type { HTMLProps, PolymorphicProps } from '$lib/types'
import { type UsePresenceProps, usePresence } from './use-presence.svelte'

export interface PresenceBaseProps extends UsePresenceProps, PolymorphicProps<'div'> {}
export interface PresenceProps extends HTMLProps<'div'>, PresenceBaseProps {}
</script>

<script lang="ts">
  import { Ark } from '../factory'
  import { splitPresenceProps } from './split-presence-props.svelte'

  let props: PresenceProps = $props()
  
  const [presenceProps, localProps] = $derived(splitPresenceProps(props))
  const presence = $derived(usePresence(presenceProps))

  $inspect(presence)

</script>

{#if props.present}
  <Ark as="div" data-scope="presence" data-part="root" {...props} />
{/if}

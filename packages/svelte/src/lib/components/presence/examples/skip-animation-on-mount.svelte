<script lang="ts">
  import { Presence, type PresenceProps } from '@ark-ui/svelte/presence'

  const props: PresenceProps = $props()
  let present = $state(true)

  function toggle() {
    present = !present
  }
</script>

<button onclick={toggle}>Toggle</button>

<Presence {...props} {present} skipAnimationOnMount>Content</Presence>

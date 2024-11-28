<script lang="ts">
  import { Presence } from '@ark-ui/svelte/presence'

  let present = $state(false)

  function toggle() {
    present = !present
  }
</script>

<button onclick={toggle}>Toggle</button>

<Presence {present}>Hidden and Hidden</Presence>

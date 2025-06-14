<script lang="ts">
  import { ClientOnly } from '@ark-ui/svelte/client-only'
</script>

<ClientOnly>
  {#snippet fallback()}
    <div>Loading...</div>
  {/snippet}
  <div>This content is only rendered on the client side.</div>
</ClientOnly>

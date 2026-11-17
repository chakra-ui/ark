<script lang="ts">
  import Ark from '../factory.svelte'
</script>

<Ark as="svg" aria-hidden="true">
  {#snippet asChild(props)}
    <svg {...props({ viewBox: '0 0 8 8' })} data-testid="child"><circle cx="4" cy="4" r="4" /></svg>
  {/snippet}
</Ark>

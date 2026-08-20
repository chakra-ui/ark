<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory'
</script>

<Ark as="span">
  {#snippet asChild(props)}
    <a href="#" {...props()}>Ark UI</a>
  {/snippet}
</Ark>

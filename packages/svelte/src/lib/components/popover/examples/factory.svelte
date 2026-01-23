<script lang="ts">
  import { ark } from '@ark-ui/svelte/factory'
</script>

<ark.span>
  {#snippet asChild(props)}
    <a href="#" {...props()}>Ark UI</a>
  {/snippet}
</ark.span>

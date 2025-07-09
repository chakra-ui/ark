<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory'
</script>

<Ark as="div" id="parent" class="parent" style="background: red;">
  {#snippet asChild(props)}
    <Ark as="span" {...props({ id: 'child', class: 'child', style: 'color: blue' })}>Ark UI</Ark>
  {/snippet}
</Ark>

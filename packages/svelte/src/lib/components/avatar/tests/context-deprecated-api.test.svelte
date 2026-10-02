<script lang="ts">
  import { Avatar } from '@ark-ui/svelte/avatar'
</script>

<Avatar.Root>
  <Avatar.Context>
    {#snippet api(avatar)}
      <span>{avatar().loaded ? 'Loaded' : 'Loading'}</span>
    {/snippet}
  </Avatar.Context>
</Avatar.Root>

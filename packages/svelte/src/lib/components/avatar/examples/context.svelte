<script lang="ts">
  import { Avatar } from '@ark-ui/svelte/avatar'
</script>

<Avatar.Root>
  <Avatar.Context>
    {#snippet api(avatar)}
      <Avatar.Fallback>
        {#if avatar().loaded}
          <p>PA</p>
        {:else}
          <p>Loading</p>
        {/if}
      </Avatar.Fallback>
    {/snippet}
  </Avatar.Context>
  <Avatar.Image src="https://i.pravatar.cc/3000" alt="avatar" />
</Avatar.Root>

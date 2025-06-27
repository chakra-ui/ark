<script lang="ts">
  import { Avatar } from '@ark-ui/svelte/avatar'

  const handleStatusChange = (details: Avatar.StatusChangeDetails) => {
    console.log(details.status)
  }
</script>

<Avatar.Root onStatusChange={handleStatusChange}>
  <Avatar.Fallback>PA</Avatar.Fallback>
  <Avatar.Image src="https://i.pravatar.cc/3000" alt="avatar" />
</Avatar.Root>

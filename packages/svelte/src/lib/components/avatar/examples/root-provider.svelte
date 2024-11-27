<script lang="ts">
import { Avatar, useAvatar } from '@ark-ui/svelte/avatar'

const avatar = useAvatar({
  onStatusChange: (status) => {
    console.log('status', status)
  },
})
</script>

<button onclick={() => avatar().setSrc('https://avatars.githubusercontent.com/u/6916170?v=4')}>
  Change Avatar
</button>

<Avatar.RootProvider value={avatar}>
  <Avatar.Fallback>PA</Avatar.Fallback>
  <Avatar.Image src="https://avatars.githubusercontent.com/u/1846056?v=4" alt="avatar" />
</Avatar.RootProvider>

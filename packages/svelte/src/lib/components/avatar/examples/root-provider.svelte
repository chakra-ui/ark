<script lang="ts">
  import { Avatar, useAvatar } from '@ark-ui/svelte/avatar'

  const avatar = useAvatar({
    onStatusChange: (status) => {
      console.log('status', status)
    },
  })

  // biome-ignore lint/style/useConst: <explanation>
  let counter = $state(0)
  const src = $derived(`https://i.pravatar.cc/300?u=${counter}`)
</script>

<button onclick={() => counter++}>Change Avatar</button>

<Avatar.RootProvider value={avatar}>
  <Avatar.Fallback>PA</Avatar.Fallback>
  <Avatar.Image {src} alt="avatar" />
</Avatar.RootProvider>

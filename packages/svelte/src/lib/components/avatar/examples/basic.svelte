<script lang="ts">
import { LocaleProvider } from '$lib/providers'
import { Avatar } from '@ark-ui/svelte/avatar'
</script>

<LocaleProvider locale="de-DE">
<Avatar.Root>
  <Avatar.Fallback>PA</Avatar.Fallback>
  <Avatar.Image src="https://i.pravatar.cc/3000" alt="avatar" />
</Avatar.Root>
</LocaleProvider>

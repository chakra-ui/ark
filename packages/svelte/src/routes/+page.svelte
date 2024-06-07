<script lang="ts">
  //   import Test from '../lib/components/Test.svelte'
  import { AvatarRoot, AvatarFallback, AvatarImage } from '$lib/components'
  const src= $state("https://avatars.githubusercontent.com/u/1234?v=4")
</script>

<h1>Welcome to your library project</h1>
<AvatarRoot>
  <AvatarFallback>CS</AvatarFallback>
  <AvatarImage {src} alt="CS" />
</AvatarRoot>

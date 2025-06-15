<script>
  import { Toggle } from '@ark-ui/svelte/toggle'
  import { Volume, VolumeOff } from 'lucide-svelte'

  let pressed = $state(false)
</script>

<div>
  <Toggle.Root bind:pressed>
    {#if pressed}
      <Volume />
    {:else}
      <VolumeOff />
    {/if}
  </Toggle.Root>
  <p>Volume is {pressed ? 'unmuted' : 'muted'}</p>
</div>

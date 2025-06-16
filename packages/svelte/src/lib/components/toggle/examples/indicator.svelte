<script>
  import { Toggle } from '@ark-ui/svelte/toggle'
  import { Volume, VolumeOff } from 'lucide-svelte'
</script>

<Toggle.Root>
  <Toggle.Indicator>
    {#snippet fallback()}
      <Volume />
    {/snippet}
    <VolumeOff />
  </Toggle.Indicator>
</Toggle.Root>

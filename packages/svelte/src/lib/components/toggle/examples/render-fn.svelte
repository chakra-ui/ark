<script>
  import { Toggle } from '@ark-ui/svelte/toggle'
  import { Bold } from 'lucide-svelte'
</script>

<Toggle.Root>
  <Bold />
  <Toggle.Context>
    {#snippet render(toggle)}
      <span>State: {toggle().pressed ? 'pressed' : 'not pressed'}</span>
    {/snippet}
  </Toggle.Context>
</Toggle.Root>

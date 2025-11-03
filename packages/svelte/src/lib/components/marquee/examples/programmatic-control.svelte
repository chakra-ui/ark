<script lang="ts">
  import { Marquee, useMarquee } from '@ark-ui/svelte/marquee'

  const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']

  const id = $props.id()
  const marquee = useMarquee(() => ({ id }))
</script>

<Marquee.RootProvider value={marquee}>
  <Marquee.Viewport>
    <Marquee.Content>
      {#each items as item}
        <Marquee.Item style="padding: 0 2rem">{item}</Marquee.Item>
      {/each}
    </Marquee.Content>
  </Marquee.Viewport>
</Marquee.RootProvider>

<div style="margin-top: 1rem; display: flex; gap: 0.5rem">
  <button onclick={() => marquee().pause()}>Pause</button>
  <button onclick={() => marquee().resume()}>Resume</button>
</div>

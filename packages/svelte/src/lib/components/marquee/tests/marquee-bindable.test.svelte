<script lang="ts">
  import { Marquee } from '../index.ts'

  let paused = $state(false)
</script>

<Marquee.Root bind:paused>
  <Marquee.Viewport>
    <Marquee.Content>
      <Marquee.Item>Ark UI</Marquee.Item>
    </Marquee.Content>
  </Marquee.Viewport>
  <Marquee.Context>
    {#snippet render(marquee)}
      <button type="button" onclick={() => marquee().pause()}>pause</button>
    {/snippet}
  </Marquee.Context>
</Marquee.Root>
<output data-testid="paused">{String(paused)}</output>

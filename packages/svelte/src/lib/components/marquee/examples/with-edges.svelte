<script lang="ts">
  import { Marquee } from '@ark-ui/svelte/marquee'

  const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']
</script>

<Marquee.Root>
  <Marquee.Edge side="start" />
  <Marquee.Viewport>
    <Marquee.Content>
      {#each items as item}
        <Marquee.Item style="padding: 0 2rem">{item}</Marquee.Item>
      {/each}
    </Marquee.Content>
  </Marquee.Viewport>
  <Marquee.Edge side="end" />
</Marquee.Root>

<script lang="ts">
  import { Marquee } from '@ark-ui/svelte/marquee'

  const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']
</script>

<Marquee.Root side="bottom" style="height: 300px">
  <Marquee.Viewport>
    <Marquee.Content>
      {#each items as item}
        <Marquee.Item style="padding: 1rem 0">{item}</Marquee.Item>
      {/each}
    </Marquee.Content>
  </Marquee.Viewport>
</Marquee.Root>

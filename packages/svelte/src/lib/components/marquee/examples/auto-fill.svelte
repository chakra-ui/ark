<script lang="ts">
  import { Marquee } from '@ark-ui/svelte/marquee'

  const items = ['Apple', 'Banana', 'Cherry']
</script>

<Marquee.Root autoFill spacing="2rem">
  <Marquee.Viewport>
    <Marquee.Content>
      {#each items as item}
        <div style="padding: 0 2rem">{item}</div>
      {/each}
    </Marquee.Content>
  </Marquee.Viewport>
</Marquee.Root>

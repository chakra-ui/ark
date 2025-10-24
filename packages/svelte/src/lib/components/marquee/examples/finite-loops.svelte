<script lang="ts">
  import { Marquee } from '@ark-ui/svelte/marquee'

  const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']

  let loopCount = $state(0)
  let completedCount = $state(0)
</script>

<Marquee.Root
  loopCount={3}
  onLoopComplete={() => loopCount++}
  onComplete={() => completedCount++}
>
  <Marquee.Viewport>
    <Marquee.Content>
      {#each items as item}
        <div style="padding: 0 2rem">{item}</div>
      {/each}
    </Marquee.Content>
  </Marquee.Viewport>
</Marquee.Root>

<div style="margin-top: 1rem">
  <p>Loop completed: {loopCount} times</p>
  <p>Animation completed: {completedCount} times</p>
</div>

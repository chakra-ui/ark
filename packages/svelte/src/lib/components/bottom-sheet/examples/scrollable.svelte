<script lang="ts">
  import { BottomSheet } from '@ark-ui/svelte/bottom-sheet'
</script>

<BottomSheet.Root>
  <BottomSheet.Trigger>Open</BottomSheet.Trigger>
  <BottomSheet.Backdrop />
  <BottomSheet.Content>
    <BottomSheet.Grabber>
      <BottomSheet.GrabberIndicator />
    </BottomSheet.Grabber>
    <BottomSheet.Title>Scrollable Bottom Sheet</BottomSheet.Title>
    <BottomSheet.CloseTrigger>Close</BottomSheet.CloseTrigger>
    <div class="scrollable">
      {#each Array.from({ length: 100 }) as _, index}
        <div>Item {index}</div>
      {/each}
    </div>
  </BottomSheet.Content>
</BottomSheet.Root>

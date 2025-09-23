<script lang="ts">
  import { BottomSheet, useBottomSheet } from '@ark-ui/svelte/bottom-sheet'

  const bottomSheet = useBottomSheet({
    defaultActiveSnapPoint: 0.5,
    snapPoints: [0.25, 0.5, 1],
  })
</script>

<div style="margin-bottom: 1rem">
  <button on:click={() => bottomSheet().setOpen(true)}>Open via API</button>
  <button on:click={() => bottomSheet().setActiveSnapPoint(0.25)} style="margin-left: 0.5rem">Set to 25%</button>
  <button on:click={() => bottomSheet().setActiveSnapPoint(1)} style="margin-left: 0.5rem">Set to 100%</button>
  <p>Current snap point: {bottomSheet().activeSnapPoint}</p>
</div>

<BottomSheet.RootProvider value={bottomSheet}>
  <BottomSheet.Backdrop />
  <BottomSheet.Content>
    <BottomSheet.Grabber>
      <BottomSheet.GrabberIndicator />
    </BottomSheet.Grabber>
    <BottomSheet.Title>Bottom Sheet with RootProvider</BottomSheet.Title>
    <p>This bottom sheet is controlled via the useBottomSheet hook and RootProvider.</p>
    <p>Active snap point: {bottomSheet().activeSnapPoint}</p>
    <button on:click={() => bottomSheet().setOpen(false)}>Close</button>
  </BottomSheet.Content>
</BottomSheet.RootProvider>

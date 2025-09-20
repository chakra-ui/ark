<script lang="ts">
  import { BottomSheet, type BottomSheetOpenChangeDetails } from '@ark-ui/svelte/bottom-sheet'

  let open = false

  const handleOpenChange = (details: BottomSheetOpenChangeDetails) => {
    open = details.open
  }
</script>

<div>
  <button on:click={() => (open = !open)}>{open ? 'Close' : 'Open'} Bottom Sheet</button>
  <p>Sheet is {open ? 'open' : 'closed'}</p>
</div>

<BottomSheet.Root {open} onOpenChange={handleOpenChange}>
  <BottomSheet.Backdrop />
  <BottomSheet.Content>
    <BottomSheet.Grabber>
      <BottomSheet.GrabberIndicator />
    </BottomSheet.Grabber>
    <BottomSheet.Title>Controlled Bottom Sheet</BottomSheet.Title>
    <p>This bottom sheet is controlled via state.</p>
    <button on:click={() => (open = false)}>Close</button>
  </BottomSheet.Content>
</BottomSheet.Root>

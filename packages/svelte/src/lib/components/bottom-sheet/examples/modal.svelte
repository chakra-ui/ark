<script lang="ts">
  import { BottomSheet } from '@ark-ui/svelte/bottom-sheet'
</script>

<BottomSheet.Root modal>
  <BottomSheet.Trigger>Open</BottomSheet.Trigger>
  <BottomSheet.Backdrop />
  <BottomSheet.Content>
    <BottomSheet.Grabber>
      <BottomSheet.GrabberIndicator />
    </BottomSheet.Grabber>
    <BottomSheet.Title>Modal Bottom Sheet</BottomSheet.Title>
    <BottomSheet.CloseTrigger>Close</BottomSheet.CloseTrigger>
  </BottomSheet.Content>
</BottomSheet.Root>

import { BottomSheet, useBottomSheet } from '@ark-ui/react/bottom-sheet'

export const RootProvider = () => {
  const bottomSheet = useBottomSheet({
    defaultActiveSnapPoint: 0.5,
    snapPoints: [0.25, 0.5, 1],
  })

  return (
    <>
      <div>
        <button onClick={() => bottomSheet.setOpen(true)}>Open via API</button>
        <button onClick={() => bottomSheet.setActiveSnapPoint(0.25)}>Set to 25%</button>
        <button onClick={() => bottomSheet.setActiveSnapPoint(1)}>Set to 100%</button>
        <p>Current snap point: {bottomSheet.activeSnapPoint}</p>
      </div>

      <BottomSheet.RootProvider value={bottomSheet}>
        <BottomSheet.Backdrop />
        <BottomSheet.Content>
          <BottomSheet.Grabber>
            <BottomSheet.GrabberIndicator />
          </BottomSheet.Grabber>
          <BottomSheet.Title>Bottom Sheet with RootProvider</BottomSheet.Title>
          <p>This bottom sheet is controlled via the useBottomSheet hook and RootProvider.</p>
          <p>Active snap point: {bottomSheet.activeSnapPoint}</p>
          <button onClick={() => bottomSheet.setOpen(false)}>Close</button>
        </BottomSheet.Content>
      </BottomSheet.RootProvider>
    </>
  )
}

import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { Portal } from 'solid-js/web'
import { Dialog, type DialogProps } from './'

const ComponentUnderTest = (props: DialogProps) => (
  <Dialog.Root {...props}>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog Description</Dialog.Description>
          <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
)

describe('Dialog', () => {
  it('should render', async () => {
    render(() => <ComponentUnderTest />)
  })

  it('should show dialog content when opened', async () => {
    render(() => <ComponentUnderTest />)

    await user.click(screen.getByText('Open Dialog'))
    expect(await screen.findByText('Dialog Title')).toBeVisible()

    await user.click(screen.getByText('Close'))
    expect(await screen.findByText('Dialog Title')).not.toBeVisible()
  })
})

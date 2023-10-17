import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { Portal } from 'solid-js/web'
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
  type DialogProps,
} from './'

const ComponentUnderTest = (props: DialogProps) => (
  <Dialog {...props}>
    <DialogTrigger>Open Dialog</DialogTrigger>
    <Portal>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
          <DialogCloseTrigger>Close</DialogCloseTrigger>
        </DialogContent>
      </DialogPositioner>
    </Portal>
  </Dialog>
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

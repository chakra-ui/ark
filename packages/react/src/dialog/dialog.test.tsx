import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogProps,
  DialogTitle,
  DialogTrigger,
} from './'

const ComponentUnderTest = (props: DialogProps) => (
  <Dialog {...props}>
    <DialogTrigger>
      <button>Open dialog</button>
    </DialogTrigger>
    <DialogPortal>
      <DialogBackdrop />
      <DialogContainer />
      <DialogContent>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogDescription>Dialog description</DialogDescription>
        <div>
          <input placeholder="Enter name..." />
          <button>Save</button>
        </div>
        <DialogCloseTrigger>
          <button>Close</button>
        </DialogCloseTrigger>
      </DialogContent>
    </DialogPortal>
  </Dialog>
)

describe('Dialog', () => {
  it('should render', async () => {
    render(<ComponentUnderTest defaultOpen />)
  })

  it('should invoke onClose if dialog is closed', async () => {
    const onClose = vi.fn()
    render(<ComponentUnderTest defaultOpen onClose={onClose} />)
    await user.click(screen.getByText('Close'))

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})

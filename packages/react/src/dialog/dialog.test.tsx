import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { Dialog, DialogProps } from './dialog'
import { DialogBackdrop } from './dialog-backdrop'
import { DialogCloseButton } from './dialog-close-button'
import { DialogContent } from './dialog-content'
import { DialogDescription } from './dialog-description'
import { DialogPortal } from './dialog-portal'
import { DialogTitle } from './dialog-title'
import { DialogTrigger } from './dialog-trigger'
import { DialogUnderlay } from './dialog-underlay'

const ComponentUnderTest = (props: DialogProps) => (
  <Dialog {...props}>
    <DialogTrigger>
      <button>Open dialog</button>
    </DialogTrigger>
    <DialogPortal>
      <DialogBackdrop />
      <DialogUnderlay />
      <DialogContent>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogDescription>Dialog description</DialogDescription>
        <div>
          <input placeholder="Enter name..." />
          <button>Save</button>
        </div>
        <DialogCloseButton>Close</DialogCloseButton>
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

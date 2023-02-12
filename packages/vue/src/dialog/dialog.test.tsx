import user from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import { Teleport } from 'vue'
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogProps,
  DialogTitle,
  DialogTrigger,
} from '.'

const Component = (props: DialogProps) => (
  <Dialog {...props}>
    <DialogTrigger>
      <button>Open dialog</button>
    </DialogTrigger>
    <Teleport to="body">
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
    </Teleport>
  </Dialog>
)

describe('Dialog', () => {
  it('should render', () => {
    render(Component)
  })

  it('should invoke onClose if dialog is closed', async () => {
    const onClose = vi.fn()
    const { getByText } = render(Component, {
      props: {
        defaultOpen: true,
        onClose,
      },
    })

    await user.click(getByText('Close'))

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})

import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { Teleport } from 'vue'
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
} from '.'
import ControlledComponent from './stories/controlled.stories.vue'

const Component = (props: DialogProps) => (
  <Dialog {...props}>
    <DialogTrigger>
      <button>Open dialog</button>
    </DialogTrigger>
    <Teleport to="body">
      <DialogBackdrop />
      <DialogPositioner />
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

  it('should invoke onOpenChange if dialog is closed', async () => {
    const onOpenChange = vi.fn()
    render(Component, {
      props: {
        open: true,
        onOpenChange,
      },
    })

    await user.click(screen.getByText('Close'))

    expect(onOpenChange).toHaveBeenCalledTimes(1)
  })

  it.skip('should open with external trigger', async () => {
    render(ControlledComponent)

    const controlButton = screen.getByText<HTMLButtonElement>('Toggle Dialog')
    const dialogPositioner = screen.getByTestId('dialog-Positioner')

    expect(dialogPositioner).not.toBeVisible()

    await user.click(controlButton)
    expect(dialogPositioner).toBeVisible()
  })
})

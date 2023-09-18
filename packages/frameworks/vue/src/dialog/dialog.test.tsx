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

  it('should invoke onOpenChange if dialog is closed', async () => {
    const onOpenChange = vi.fn()
    const { getByText } = render(Component, {
      props: {
        open: true,
        onOpenChange,
      },
    })

    await user.click(getByText('Close'))

    expect(onOpenChange).toHaveBeenCalledTimes(1)
  })

  it('should open with external trigger', async () => {
    const { getByText, getByTestId } = render(ControlledComponent)

    const controlButton = getByText<HTMLButtonElement>('Toggle Dialog')
    const dialogContainer = getByTestId('dialog-container')

    expect(dialogContainer).not.toBeVisible()

    await user.click(controlButton)
    expect(dialogContainer).toBeVisible()
  })
})

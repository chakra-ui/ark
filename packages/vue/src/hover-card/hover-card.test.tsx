import user from '@testing-library/user-event'
import { render, waitFor } from '@testing-library/vue'
import { Teleport } from 'vue'
import {
  HoverCard,
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
  type HoverCardProps,
} from '.'

const ComponentUnderTest = (props: HoverCardProps) => (
  <HoverCard openDelay={0} closeDelay={0} {...props}>
    <HoverCardTrigger>
      <a href="https://mastodon.com/zag_js" target="_blank" rel="noreferrer">
        Trigger
      </a>
    </HoverCardTrigger>

    <Teleport to="body">
      <HoverCardPositioner>
        <HoverCardContent>
          <HoverCardArrow>
            <HoverCardArrowTip />
          </HoverCardArrow>
          Content
        </HoverCardContent>
      </HoverCardPositioner>
    </Teleport>
  </HoverCard>
)

describe('HoverCard', () => {
  it('should open on hover', async () => {
    const { getByText } = render(ComponentUnderTest)

    const target = getByText(/Trigger/i)
    await user.hover(target)

    const hoverContent = getByText(/content/i)
    await waitFor(() => expect(hoverContent).toBeVisible())

    await user.unhover(target)
    await waitFor(() => expect(hoverContent).not.toBeVisible())
  })

  it('should have onClose invoked when component is closed', async () => {
    const onClose = vi.fn()

    const { getByText } = render(ComponentUnderTest, { props: { onClose } })

    const target = getByText(/Trigger/i)
    await user.hover(target)

    const hoverContent = getByText(/content/i)
    await waitFor(() => expect(hoverContent).toBeVisible())

    await user.unhover(target)
    await waitFor(() => expect(hoverContent).not.toBeVisible())
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})

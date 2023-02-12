import user from '@testing-library/user-event'
import { render, waitFor } from '@testing-library/vue'
import { Teleport } from 'vue'
import {
  HoverCard,
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardProps,
  HoverCardTrigger,
} from '.'

const wait = (delay = 100) => new Promise((resolve) => setTimeout(resolve, delay))

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

  it('should have onOpenChange invoked when component is opened or closed', async () => {
    const onOpenChange = vi.fn()

    const { getByText } = render(ComponentUnderTest, { props: { onOpenChange } })

    const target = getByText(/Trigger/i)
    await user.hover(target)

    const hoverContent = getByText(/content/i)
    await waitFor(() => expect(hoverContent).toBeVisible())

    await user.unhover(target)
    await waitFor(() => expect(hoverContent).not.toBeVisible())
    expect(onOpenChange).toHaveBeenCalledTimes(3)
  })
})

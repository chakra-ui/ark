import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Portal } from '@zag-js/react'
import {
  HoverCard,
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
} from '.'

const ComponentUnderTest = () => (
  <HoverCard openDelay={0} closeDelay={0}>
    <HoverCardTrigger asChild>
      <a href="https://mastodon.com/zag_js" target="_blank" rel="noreferrer">
        Trigger
      </a>
    </HoverCardTrigger>

    <Portal>
      <HoverCardPositioner>
        <HoverCardContent>
          <HoverCardArrow>
            <HoverCardArrowTip />
          </HoverCardArrow>
          Content
        </HoverCardContent>
      </HoverCardPositioner>
    </Portal>
  </HoverCard>
)

describe('HoverCard', () => {
  it('should open on hover', async () => {
    render(<ComponentUnderTest />)

    const target = screen.getByText(/Trigger/i)
    await user.hover(target)

    const hoverContent = screen.getByText(/content/i)
    await waitFor(() => expect(hoverContent).toBeVisible())

    await user.unhover(target)
    await waitFor(() => expect(hoverContent).not.toBeVisible())
  })
})

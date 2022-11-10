import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { HoverCard } from './hover-card'
import { HoverCardArrow } from './hover-card-arrow'
import { HoverCardContent } from './hover-card-content'
import { HoverCardInnerArrow } from './hover-card-inner-arrow'
import { HoverCardPortal } from './hover-card-portal'
import { HoverCardPositioner } from './hover-card-positioner'
import { HoverCardTrigger } from './hover-card-trigger'

const ComponentUnderTest = () => (
  <HoverCard openDelay={0} closeDelay={0}>
    <HoverCardTrigger href="https://mastodon.com/zag_js" target="_blank">
      Mastodon
    </HoverCardTrigger>

    <HoverCardPortal>
      <HoverCardPositioner>
        <HoverCardContent>
          <HoverCardArrow>
            <HoverCardInnerArrow />
          </HoverCardArrow>
          Mastodon Preview
        </HoverCardContent>
      </HoverCardPositioner>
    </HoverCardPortal>
  </HoverCard>
)

describe('HoverCard', () => {
  it('should open on hover', async () => {
    render(<ComponentUnderTest />)

    const target = screen.getByText(/mastodon/i)
    await user.hover(target)

    const hoverContent = screen.getByText(/mastodon preview/i)
    await waitFor(() => expect(hoverContent).toBeVisible())

    await user.unhover(target)
    await waitFor(() => expect(hoverContent).not.toBeVisible())
  })
})

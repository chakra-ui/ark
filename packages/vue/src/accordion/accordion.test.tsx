import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { Accordion } from './'
import VModelAccordion from './accordion.stories.vue'

describe('Accordion', () => {
  it('should open the accordion item on click', async () => {
    render(
      <Accordion.Root modelValue="0">
        <Accordion.Item value="0">
          <h2>
            <Accordion.Trigger>
              <button data-testid="button">Section 1 title</button>
            </Accordion.Trigger>
          </h2>
          <Accordion.Content data-testid="panel">Panel 1</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    )

    expect(screen.getByTestId('button')).toHaveAttribute('aria-expanded', 'true')
  })

  it('should toggles the accordion on click', async () => {
    render(
      <Accordion.Root>
        <Accordion.Item value="0">
          <h2>
            <Accordion.Trigger>
              <button>Trigger</button>
            </Accordion.Trigger>
          </h2>
          <Accordion.Content>Panel</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    )

    const trigger = screen.getByText('Trigger')

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    // you can't toggle an accordion without passing `allowToggle`
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('should focus the next/previous item on arrow up & down', async () => {
    render(
      <Accordion.Root>
        <Accordion.Item value="0">
          <h2>
            <Accordion.Trigger>
              <button>Section 1 title</button>
            </Accordion.Trigger>
          </h2>
          <Accordion.Content>Panel 1</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="1">
          <Accordion.Trigger>
            <button>Section 2 title</button>
          </Accordion.Trigger>
          <Accordion.Content>Panel 2</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    )
    const first = screen.getByText('Section 1 title')
    const second = screen.getByText('Section 2 title')

    first.focus()

    await user.keyboard('[ArrowDown]')
    expect(second).toHaveFocus()

    await user.keyboard('[ArrowUp]')
    expect(first).toHaveFocus()
  })

  it('should focus the first/last item on home & end', async () => {
    render(
      <Accordion.Root>
        <Accordion.Item value="0">
          <h2>
            <Accordion.Trigger>
              <button>First section</button>
            </Accordion.Trigger>
          </h2>
          <Accordion.Content>Panel 1</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="1">
          <h2>
            <Accordion.Trigger>
              <button>Second section</button>
            </Accordion.Trigger>
          </h2>
          <Accordion.Content>Panel 1</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="2">
          <h2>
            <Accordion.Trigger>
              <button>Last section</button>
            </Accordion.Trigger>
          </h2>
          <Accordion.Content>Panel 2</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    )
    const first = screen.getByText('First section')
    const last = screen.getByText('Last section')

    first.focus()

    await user.keyboard('[Home]')
    expect(first).toHaveFocus()

    await user.keyboard('[End]')
    expect(last).toHaveFocus()
  })

  it('should not collapse the curret visible item', async () => {
    render(
      <Accordion.Root>
        <Accordion.Item value="0">
          <h2>
            <Accordion.Trigger>
              <button>First section</button>
            </Accordion.Trigger>
          </h2>
          <Accordion.Content>Panel 1</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="1">
          <h2>
            <Accordion.Trigger>
              <button>Second section</button>
            </Accordion.Trigger>
          </h2>
          <Accordion.Content>Panel 1</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    )

    const first = screen.getByText('First section')

    await user.click(first)
    expect(first).toHaveAttribute('aria-expanded', 'true')

    await user.click(first)
    expect(first).toHaveAttribute('aria-expanded', 'true')
  })

  it('should collapse the only visible item if the accordiong is collapsible', async () => {
    render(
      <Accordion.Root collapsible>
        <Accordion.Item value="1">
          <h2>
            <Accordion.Trigger>
              <button>First section</button>
            </Accordion.Trigger>
          </h2>
          <Accordion.Content>Panel 1</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="2">
          <h2>
            <Accordion.Trigger>
              <button>Second section</button>
            </Accordion.Trigger>
          </h2>
          <Accordion.Content>Panel 1</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    )

    const firstAccordion = screen.getByText('First section')

    await user.click(firstAccordion)
    expect(firstAccordion).toHaveAttribute('aria-expanded', 'true')

    await user.click(firstAccordion)
    expect(firstAccordion).toHaveAttribute('aria-expanded', 'false')
  })

  it('should be possible to open multiple items in an accordion', async () => {
    render(
      <Accordion.Root multiple>
        <Accordion.Item value="0">
          <h2>
            <Accordion.Trigger>
              <button>First section</button>
            </Accordion.Trigger>
          </h2>
          <Accordion.Content>Panel 1</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="1">
          <h2>
            <Accordion.Trigger>
              <button>Second section</button>
            </Accordion.Trigger>
          </h2>
          <Accordion.Content>Panel 1</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    )

    const first = screen.getByText('First section')
    const second = screen.getByText('Second section')

    await user.click(first)
    expect(first).toHaveAttribute('aria-expanded', 'true')

    await user.click(second)
    expect(second).toHaveAttribute('aria-expanded', 'true')
  })

  it('should have the correct aria attributes', async () => {
    render(
      <Accordion.Root>
        <Accordion.Item value="1">
          <h2>
            <Accordion.Trigger>
              <button>Section 1 title</button>
            </Accordion.Trigger>
          </h2>
          <Accordion.Content>Panel 1</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    )
    const button = screen.getByText('Section 1 title')
    const panel = screen.getByText('Panel 1')

    expect(button).toHaveAttribute('aria-controls')
    expect(button).toHaveAttribute('aria-expanded')
    expect(panel).toHaveAttribute('aria-labelledby')
  })

  it('should move the focus to the next element when pressing tab', async () => {
    render(
      <Accordion.Root>
        <Accordion.Item value="0">
          <h2>
            <Accordion.Trigger>
              <button>First section</button>
            </Accordion.Trigger>
          </h2>
          <Accordion.Content>Panel 1</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="1">
          <h2>
            <Accordion.Trigger>
              <button>Second section</button>
            </Accordion.Trigger>
          </h2>
          <Accordion.Content>Panel 1</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="2">
          <h2>
            <Accordion.Trigger>
              <button>Last section</button>
            </Accordion.Trigger>
          </h2>
          <Accordion.Content>Panel 2</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    )
    const first = screen.getByText('First section')
    const second = screen.getByText('Second section')
    const last = screen.getByText('Last section')

    await user.keyboard('[Tab]')
    expect(first).toHaveFocus()

    await user.keyboard('[Tab]')
    expect(second).toHaveFocus()

    await user.keyboard('[Tab]')
    expect(last).toHaveFocus()
  })

  it('should have the same aria-controls for the button as for the panel', async () => {
    render(
      <Accordion.Root>
        <Accordion.Item value="0">
          <h2>
            <Accordion.Trigger>
              <button>Section 1 title</button>
            </Accordion.Trigger>
          </h2>
          <Accordion.Content>Panel 1</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    )
    const button = screen.getByText('Section 1 title')
    const panel = screen.getByText('Panel 1')
    expect(button.getAttribute('aria-controls')).toEqual(panel.getAttribute('id'))
  })

  it('should set the correct aria-expanded when an item is open/closed', async () => {
    render(
      <Accordion.Root modelValue="0">
        <Accordion.Item value="0">
          <h2>
            <Accordion.Trigger>
              <button>Section 1 title</button>
            </Accordion.Trigger>
          </h2>
          <Accordion.Content>Panel 1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="1">
          <h2>
            <Accordion.Trigger>
              <button>Section 2 title</button>
            </Accordion.Trigger>
          </h2>
          <Accordion.Content>Panel 2</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    )

    const button = screen.getByText('Section 1 title')
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('should have role=region and aria-labelledby', async () => {
    render(
      <Accordion.Root>
        <Accordion.Item value="0">
          <h2>
            <Accordion.Trigger>
              <button>Section 1 title</button>
            </Accordion.Trigger>
          </h2>
          <Accordion.Content>Panel 1</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    )
    const panel = screen.getByText('Panel 1')

    expect(panel).toHaveAttribute('aria-labelledby')
    expect(panel).toHaveAttribute('role', 'region')
  })

  it('is initialized correctly with v-model', () => {
    render(VModelAccordion)

    const button = screen.getByText('Panel 2 trigger')
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('changes v-model value on external trigger', async () => {
    render(VModelAccordion)

    const externalTrigger = screen.getByText('Trigger')
    const expanded = screen.getByText('Panel 3 trigger')
    expect(expanded).toHaveAttribute('aria-expanded', 'false')

    await user.click(externalTrigger)

    expect(expanded).toHaveAttribute('aria-expanded', 'true')
  })
})

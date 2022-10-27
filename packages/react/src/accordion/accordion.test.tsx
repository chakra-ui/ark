import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Accordion } from './accordion'
import { AccordionButton } from './accordion-button'
import { AccordionItem } from './accordion-item'
import { AccordionPanel } from './accordion-panel'

describe('Accordion', () => {
  it('should open the accordion item on click', async () => {
    render(
      <Accordion value="0">
        <AccordionItem value="0">
          <h2>
            <AccordionButton data-testid="button">Section 1 title</AccordionButton>
          </h2>
          <AccordionPanel data-testid="panel">Panel 1</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    )

    expect(screen.getByTestId('button')).toHaveAttribute('aria-expanded', 'true')
  })

  it('should toggles the accordion on click', async () => {
    render(
      <Accordion>
        <AccordionItem value="0">
          <h2>
            <AccordionButton>Trigger</AccordionButton>
          </h2>
          <AccordionPanel>Panel</AccordionPanel>
        </AccordionItem>
      </Accordion>,
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
      <Accordion>
        <AccordionItem value="0">
          <h2>
            <AccordionButton>Section 1 title</AccordionButton>
          </h2>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>

        <AccordionItem value="1">
          <AccordionButton>Section 2 title</AccordionButton>
          <AccordionPanel>Panel 2</AccordionPanel>
        </AccordionItem>
      </Accordion>,
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
      <Accordion>
        <AccordionItem value="0">
          <h2>
            <AccordionButton>First section</AccordionButton>
          </h2>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>

        <AccordionItem value="1">
          <h2>
            <AccordionButton>Second section</AccordionButton>
          </h2>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>

        <AccordionItem value="2">
          <h2>
            <AccordionButton>Last section</AccordionButton>
          </h2>
          <AccordionPanel>Panel 2</AccordionPanel>
        </AccordionItem>
      </Accordion>,
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
      <Accordion>
        <AccordionItem value="0">
          <h2>
            <AccordionButton>First section</AccordionButton>
          </h2>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>

        <AccordionItem value="1">
          <h2>
            <AccordionButton>Second section</AccordionButton>
          </h2>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    )

    const first = screen.getByText('First section')

    await user.click(first)
    expect(first).toHaveAttribute('aria-expanded', 'true')

    await user.click(first)
    expect(first).toHaveAttribute('aria-expanded', 'true')
  })

  it('should collapse the only visible item if the accordiong is collapsible', async () => {
    render(
      <Accordion collapsible>
        <AccordionItem value="1">
          <h2>
            <AccordionButton>First section</AccordionButton>
          </h2>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>

        <AccordionItem value="2">
          <h2>
            <AccordionButton>Second section</AccordionButton>
          </h2>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    )

    const firstAccordion = screen.getByText('First section')

    await user.click(firstAccordion)
    expect(firstAccordion).toHaveAttribute('aria-expanded', 'true')

    await user.click(firstAccordion)
    expect(firstAccordion).toHaveAttribute('aria-expanded', 'false')
  })

  it('should be possible to open multiple items in an accordion', async () => {
    render(
      <Accordion multiple>
        <AccordionItem value="0">
          <h2>
            <AccordionButton>First section</AccordionButton>
          </h2>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>

        <AccordionItem value="1">
          <h2>
            <AccordionButton>Second section</AccordionButton>
          </h2>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>
      </Accordion>,
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
      <Accordion>
        <AccordionItem value="1">
          <h2>
            <AccordionButton>Section 1 title</AccordionButton>
          </h2>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    )
    const button = screen.getByText('Section 1 title')
    const panel = screen.getByText('Panel 1')

    expect(button).toHaveAttribute('aria-controls')
    expect(button).toHaveAttribute('aria-expanded')
    expect(panel).toHaveAttribute('aria-labelledby')
  })

  it('should move the focus to the next element when pressing tab', async () => {
    render(
      <Accordion>
        <AccordionItem value="0">
          <h2>
            <AccordionButton>First section</AccordionButton>
          </h2>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>

        <AccordionItem value="1">
          <h2>
            <AccordionButton>Second section</AccordionButton>
          </h2>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>

        <AccordionItem value="2">
          <h2>
            <AccordionButton>Last section</AccordionButton>
          </h2>
          <AccordionPanel>Panel 2</AccordionPanel>
        </AccordionItem>
      </Accordion>,
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
      <Accordion>
        <AccordionItem value="0">
          <h2>
            <AccordionButton>Section 1 title</AccordionButton>
          </h2>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    )
    const button = screen.getByText('Section 1 title')
    const panel = screen.getByText('Panel 1')
    expect(button.getAttribute('aria-controls')).toEqual(panel.getAttribute('id'))
  })

  it('should set the correct aria-expanded when an item is open/closed', async () => {
    render(
      <Accordion value="0">
        <AccordionItem value="0">
          <h2>
            <AccordionButton>Section 1 title</AccordionButton>
          </h2>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="1">
          <h2>
            <AccordionButton>Section 2 title</AccordionButton>
          </h2>
          <AccordionPanel>Panel 2</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    )

    const button = screen.getByText('Section 1 title')
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('should have role=region and aria-labelledby', async () => {
    render(
      <Accordion>
        <AccordionItem value="0">
          <h2>
            <AccordionButton>Section 1 title</AccordionButton>
          </h2>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    )
    const panel = screen.getByText('Panel 1')

    expect(panel).toHaveAttribute('aria-labelledby')
    expect(panel).toHaveAttribute('role', 'region')
  })
})

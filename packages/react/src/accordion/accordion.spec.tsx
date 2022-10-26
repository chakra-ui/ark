import { render, screen } from '@testing-library/react'
import { Accordion } from './accordion'
import { AccordionButton } from './accordion-button'
import { AccordionItem } from './accordion-item'
import { AccordionPanel } from './accordion-panel'

test('aria-controls for button is same as id for panel', async () => {
  render(
    <Accordion>
      <AccordionItem value="panel-1">
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

test('aria-expanded is true/false when accordion is open/closed', async () => {
  render(
    <Accordion value="panel-1">
      <AccordionItem value="panel-1">
        <h2>
          <AccordionButton>Section 1 title</AccordionButton>
        </h2>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="panel-2">
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

test('panel has role=region and aria-labelledby', async () => {
  render(
    <Accordion>
      <AccordionItem value="panel-1">
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

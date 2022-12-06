import { render, screen } from 'solid-testing-library'
import { Accordion, AccordionProps } from './accordion'
import { AccordionButton } from './accordion-button'
import { AccordionItem } from './accordion-item'
import { AccordionPanel } from './accordion-panel'

const ComponentUnderTest = (props: AccordionProps) => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion {...props}>
      {items.map((item) => (
        <AccordionItem value={item}>
          <AccordionButton>{item} trigger</AccordionButton>
          <AccordionPanel>{item} content</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

describe('Accordion', () => {
  it('should render', async () => {
    render(() => <ComponentUnderTest />)
  })

  it('should have the propper aria attributes for the expanded panel', async () => {
    render(() => <ComponentUnderTest value="panel-1" />)
    expect(screen.getByText('panel-1 trigger')).toHaveAttribute('aria-expanded', 'true')
  })
})

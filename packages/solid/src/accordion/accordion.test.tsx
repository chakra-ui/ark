import { render, screen } from '@solidjs/testing-library'
import { For } from 'solid-js'
import { Accordion, type AccordionProps } from './accordion'
import { AccordionContent } from './accordion-content'
import { AccordionItem } from './accordion-item'
import { AccordionTrigger } from './accordion-trigger'

const ComponentUnderTest = (props: AccordionProps) => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion {...props}>
      <For each={items}>
        {(item) => (
          <AccordionItem value={item}>
            <AccordionTrigger>{item} trigger</AccordionTrigger>
            <AccordionContent>{item} content</AccordionContent>
          </AccordionItem>
        )}
      </For>
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

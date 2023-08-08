import { render, screen } from '@solidjs/testing-library'
import { For } from 'solid-js'
import { Accordion, type AccordionProps } from './'

const ComponentUnderTest = (props: AccordionProps) => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion.Root {...props}>
      <For each={items}>
        {(item) => (
          <Accordion.Item value={item}>
            <Accordion.Trigger>{item} trigger</Accordion.Trigger>
            <Accordion.Content>{item} content</Accordion.Content>
          </Accordion.Item>
        )}
      </For>
    </Accordion.Root>
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

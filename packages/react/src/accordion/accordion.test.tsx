import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { Accordion, type AccordionProps } from './'

const ComponentUnderTest = (props: AccordionProps) => {
  const items = [
    { value: 'React' },
    { value: 'Solid' },
    { value: 'Svelte', disabled: true },
    { value: 'Vue' },
  ]
  return (
    <Accordion.Root {...props}>
      {items.map((item, id) => (
        <Accordion.Item key={id} value={item.value} disabled={item.disabled}>
          <Accordion.Trigger>{item.value} Trigger</Accordion.Trigger>
          <Accordion.Content>{item.value} Content</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

describe('Accordion', () => {
  it('should render', async () => {
    render(<ComponentUnderTest />)
  })

  it('should not have an expanded item by default', async () => {
    render(<ComponentUnderTest />)

    expect(screen.getByRole('button', { name: 'React Trigger' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })

  it('should open item specified in defaultValue', async () => {
    render(<ComponentUnderTest defaultValue={['Solid']} />)

    expect(screen.getByRole('button', { name: 'Solid Trigger' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  it('should collapse an expanded item when collapsible is true', async () => {
    render(<ComponentUnderTest collapsible />)

    await user.click(screen.getByRole('button', { name: 'React Trigger' }))

    expect(screen.getByRole('button', { name: 'React Trigger' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )

    await user.click(screen.getByRole('button', { name: 'React Trigger' }))
    expect(screen.getByRole('button', { name: 'React Trigger' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })

  it('should disable all items when disabled is true', async () => {
    render(<ComponentUnderTest disabled />)
    expect(screen.getByRole('button', { name: 'React Trigger' })).toHaveAttribute('disabled')
  })

  it('should allow multiple items to be expanded when multiple is true', async () => {
    render(<ComponentUnderTest multiple />)

    await user.click(screen.getByRole('button', { name: 'React Trigger' }))
    await user.click(screen.getByRole('button', { name: 'Vue Trigger' }))

    expect(screen.getByRole('button', { name: 'React Trigger' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    expect(screen.getByRole('button', { name: 'Vue Trigger' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  it('should call onValueChange when an item is clicked', async () => {
    const onValueChange = vi.fn()
    render(<ComponentUnderTest onValueChange={onValueChange} />)

    await user.click(screen.getByRole('button', { name: 'React Trigger' }))
    expect(onValueChange).toHaveBeenCalled()
  })

  it('should call onFocusChange when focus changes', async () => {
    const onFocusChange = vi.fn()
    render(<ComponentUnderTest onFocusChange={onFocusChange} />)

    screen.getByRole('button', { name: 'React Trigger' }).focus()
    expect(await screen.findByRole('button', { name: 'React Trigger' })).toHaveFocus()

    expect(onFocusChange).toHaveBeenCalled()
  })

  // TODO @segunadebayo
  it.skip('should render text direction based on dir prop', async () => {
    render(<ComponentUnderTest dir="ltr" />)
    expect(screen.getByRole('button', { name: 'React Trigger' })).toHaveAttribute('dir', 'rtl')
  })

  it('should focus the next/previous item on arrow up & down', async () => {
    render(<ComponentUnderTest />)

    const firstTrigger = screen.getByRole('button', { name: 'React Trigger' })
    const secondTrigger = screen.getByRole('button', { name: 'Solid Trigger' })

    await user.click(firstTrigger)

    await user.type(firstTrigger, '{arrowdown}')
    expect(secondTrigger).toHaveFocus()

    await user.type(secondTrigger, '{arrowup}')
    expect(firstTrigger).toHaveFocus()
  })

  it('should focus the first/last item on home & end', async () => {
    render(<ComponentUnderTest />)

    const firstTrigger = screen.getByRole('button', { name: 'React Trigger' })
    const lastTrigger = screen.getByRole('button', { name: 'Vue Trigger' })

    await user.click(lastTrigger)

    await user.type(lastTrigger, '{home}')
    expect(firstTrigger).toHaveFocus()

    await user.type(firstTrigger, '{end}')
    expect(lastTrigger).toHaveFocus()
  })

  it('should not collapse the current visible item', async () => {
    render(<ComponentUnderTest collapsible={false} />)

    const firstTrigger = screen.getByRole('button', { name: 'React Trigger' })

    await user.click(firstTrigger)
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true')

    await user.click(firstTrigger)
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('should move the focus to the next element when pressing tab', async () => {
    render(<ComponentUnderTest />)

    const firstTrigger = screen.getByRole('button', { name: 'React Trigger' })
    const secondTrigger = screen.getByRole('button', { name: 'Solid Trigger' })

    await user.click(firstTrigger)

    await user.type(firstTrigger, '{tab}')
    expect(secondTrigger).toHaveFocus()
  })
})

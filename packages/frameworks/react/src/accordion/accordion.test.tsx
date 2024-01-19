import { accordionAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { getExports, getParts } from '../setup-test'
import { Accordion, type AccordionRootProps } from './'

const ComponentUnderTest = (props: AccordionRootProps) => {
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
          <Accordion.ItemTrigger>
            {item.value} Trigger
            <Accordion.ItemIndicator>{'>'}</Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>{item.value} Content</Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

describe('Accordion', () => {
  it.each(getParts(accordionAnatomy))('should render part %s', async (part) => {
    render(<ComponentUnderTest />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(accordionAnatomy))('should export %s', async (part) => {
    expect(Accordion[part]).toBeDefined()
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

    const button = screen.getByRole('button', { name: 'React Trigger' })

    await user.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'true')

    await user.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('should disable all items when disabled is true', async () => {
    render(<ComponentUnderTest disabled />)

    const button = screen.getByRole('button', { name: 'React Trigger' })

    expect(button).toBeDisabled()
  })

  it('should allow multiple items to be expanded when multiple is true', async () => {
    render(<ComponentUnderTest multiple />)

    const reactButton = screen.getByRole('button', { name: 'React Trigger' })
    const vueButton = screen.getByRole('button', { name: 'Vue Trigger' })

    await user.click(reactButton)
    await user.click(vueButton)

    expect(reactButton).toHaveAttribute('aria-expanded', 'true')
    expect(vueButton).toHaveAttribute('aria-expanded', 'true')
  })

  it('should call onValueChange when an item is clicked', async () => {
    const onValueChange = vi.fn()
    render(<ComponentUnderTest onValueChange={onValueChange} />)

    const button = screen.getByRole('button', { name: 'React Trigger' })

    await user.click(button)
    expect(onValueChange).toHaveBeenCalled()
  })

  it('should call onFocusChange when focus changes', async () => {
    const onFocusChange = vi.fn()
    render(<ComponentUnderTest onFocusChange={onFocusChange} />)

    const button = screen.getByRole('button', { name: 'React Trigger' })

    button.focus()
    expect(await screen.findByRole('button', { name: 'React Trigger' })).toHaveFocus()

    expect(onFocusChange).toHaveBeenCalled()
  })

  it('should render text direction based on dir prop', async () => {
    render(<ComponentUnderTest dir="rtl" />)

    const button = screen.getByRole('button', { name: 'React Trigger' })

    expect(button).toHaveAttribute('dir', 'rtl')
  })

  it('should focus the next/previous item on arrow up & down', async () => {
    render(<ComponentUnderTest />)

    const firstButton = screen.getByRole('button', { name: 'React Trigger' })
    const secondButton = screen.getByRole('button', { name: 'Solid Trigger' })

    await user.click(firstButton)

    await user.type(firstButton, '{arrowdown}')
    expect(secondButton).toHaveFocus()

    await user.type(secondButton, '{arrowup}')
    expect(firstButton).toHaveFocus()
  })

  it('should focus the first/last item on home & end', async () => {
    render(<ComponentUnderTest />)

    const firstButton = screen.getByRole('button', { name: 'React Trigger' })
    const lastButton = screen.getByRole('button', { name: 'Vue Trigger' })

    await user.click(lastButton)

    await user.type(lastButton, '{home}')
    expect(firstButton).toHaveFocus()

    await user.type(firstButton, '{end}')
    expect(lastButton).toHaveFocus()
  })

  it('should not collapse the current visible item', async () => {
    render(<ComponentUnderTest collapsible={false} />)

    const button = screen.getByRole('button', { name: 'React Trigger' })

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('should move the focus to the next element when pressing tab', async () => {
    render(<ComponentUnderTest />)

    const firstButton = screen.getByRole('button', { name: 'React Trigger' })
    const secondButton = screen.getByRole('button', { name: 'Solid Trigger' })

    await user.click(firstButton)

    await user.type(firstButton, '{tab}')
    expect(secondButton).toHaveFocus()
  })

  it('should lazy mount an accordion item', async () => {
    render(<ComponentUnderTest lazyMount collapsible />)

    const button = screen.getByRole('button', { name: 'React Trigger' })

    expect(screen.queryByText('React Content')).not.toBeInTheDocument()
    await user.click(button)

    expect(screen.queryByText('React Content')).toBeVisible()
    await user.click(button)

    expect(screen.queryByText('React Content')).not.toBeVisible()
  })

  it('should not have aria-controls if lazy mounted', async () => {
    render(<ComponentUnderTest lazyMount />)

    const button = screen.getByRole('button', { name: 'React Trigger' })

    expect(button).not.toHaveAttribute('aria-controls')

    await user.click(button)
    expect(button).toHaveAttribute('aria-controls')
  })

  it('should lazy mount and unmount on exit an accordion item', async () => {
    render(<ComponentUnderTest lazyMount unmountOnExit collapsible />)

    const button = screen.getByRole('button', { name: 'React Trigger' })

    expect(screen.queryByText('React Content')).not.toBeInTheDocument()
    await user.click(button)

    expect(screen.queryByText('React Content')).toBeVisible()
    await user.click(button)

    expect(screen.queryByText('React Content')).not.toBeInTheDocument()
  })
})

import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { LocaleProvider } from '../../../providers'
import { ComponentUnderTest } from './basic'

describe('Accordion', () => {
  it('should not have an expanded item by default', async () => {
    render(() => <ComponentUnderTest />)

    expect(screen.getByRole('button', { name: 'React Trigger' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('should open item specified in defaultValue', async () => {
    render(() => <ComponentUnderTest defaultValue={['Solid']} />)

    expect(screen.getByRole('button', { name: 'Solid Trigger' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('should collapse an expanded item when collapsible is true', async () => {
    render(() => <ComponentUnderTest collapsible={true} />)

    await user.click(screen.getByRole('button', { name: 'React Trigger' }))

    expect(screen.getByRole('button', { name: 'React Trigger' })).toHaveAttribute('aria-expanded', 'true')

    await user.click(screen.getByRole('button', { name: 'React Trigger' }))
    expect(screen.getByRole('button', { name: 'React Trigger' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('should disable a single item', async () => {
    render(() => <ComponentUnderTest />)

    expect(screen.getByRole('button', { name: 'Svelte Trigger' })).toBeDisabled()
  })

  it('should disable all items when disabled is true', async () => {
    render(() => <ComponentUnderTest disabled />)

    expect(screen.getByRole('button', { name: 'React Trigger' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Solid Trigger' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Svelte Trigger' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Vue Trigger' })).toBeDisabled()
  })

  it('should allow multiple items to be expanded when multiple is true', async () => {
    render(() => <ComponentUnderTest multiple={true} />)

    await user.click(screen.getByRole('button', { name: 'React Trigger' }))
    await user.click(screen.getByRole('button', { name: 'Vue Trigger' }))

    expect(screen.getByRole('button', { name: 'React Trigger' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'Vue Trigger' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('should call onValueChange when an item is clicked', async () => {
    const onValueChange = vi.fn()
    render(() => <ComponentUnderTest onValueChange={onValueChange} />)

    await user.click(screen.getByRole('button', { name: 'React Trigger' }))
    expect(onValueChange).toHaveBeenCalled()
  })

  it('should call onFocusChange when focus changes', async () => {
    const onFocusChange = vi.fn()
    render(() => <ComponentUnderTest onFocusChange={onFocusChange} />)

    screen.getByRole('button', { name: 'React Trigger' }).focus()
    expect(await screen.findByRole('button', { name: 'React Trigger' })).toHaveFocus()

    expect(onFocusChange).toHaveBeenCalled()
  })

  it('should render text direction based on dir prop', async () => {
    render(() => (
      <LocaleProvider locale="ar-AE">
        <ComponentUnderTest />
      </LocaleProvider>
    ))
    expect(screen.getByRole('button', { name: 'React Trigger' })).toHaveAttribute('dir', 'rtl')
  })

  it('should focus the next/previous item on arrow up & down', async () => {
    render(() => <ComponentUnderTest />)

    const firstTrigger = screen.getByRole('button', { name: 'React Trigger' })
    const secondTrigger = screen.getByRole('button', { name: 'Solid Trigger' })

    await user.click(firstTrigger)

    await user.type(firstTrigger, '{arrowdown}')
    expect(secondTrigger).toHaveFocus()

    await user.type(secondTrigger, '{arrowup}')
    expect(firstTrigger).toHaveFocus()
  })

  it('should focus the first/last item on home & end', async () => {
    render(() => <ComponentUnderTest />)

    const firstTrigger = screen.getByRole('button', { name: 'React Trigger' })
    const lastTrigger = screen.getByRole('button', { name: 'Vue Trigger' })

    await user.click(lastTrigger)

    await user.type(lastTrigger, '{home}')
    expect(firstTrigger).toHaveFocus()

    await user.type(firstTrigger, '{end}')
    expect(lastTrigger).toHaveFocus()
  })

  it('should not collapse the current visible item', async () => {
    render(() => <ComponentUnderTest collapsible={false} />)

    const firstTrigger = screen.getByRole('button', { name: 'React Trigger' })

    await user.click(firstTrigger)
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true')

    await user.click(firstTrigger)
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('should move the focus to the next element when pressing tab', async () => {
    render(() => <ComponentUnderTest />)

    const firstTrigger = screen.getByRole('button', { name: 'React Trigger' })
    const secondTrigger = screen.getByRole('button', { name: 'Solid Trigger' })

    await user.click(firstTrigger)

    await user.type(firstTrigger, '{tab}')
    expect(secondTrigger).toHaveFocus()
  })

  it('should lazy mount an accordion item', async () => {
    render(() => <ComponentUnderTest lazyMount collapsible />)
    const button = screen.getByRole('button', { name: 'React Trigger' })

    expect(screen.queryByText('React Content')).not.toBeInTheDocument()
    await user.click(button)

    expect(screen.queryByText('React Content')).toBeVisible()
    await user.click(button)

    await waitFor(() => expect(screen.queryByText('React Content')).not.toBeVisible())
  })

  it('should not have aria-controls if lazy mounted', async () => {
    render(() => <ComponentUnderTest lazyMount />)
    const trigger = screen.getByRole('button', { name: 'React Trigger' })
    expect(trigger).not.toHaveAttribute('aria-controls')

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-controls')
  })

  it('should lazy mount and unmount on exit an accordion item', async () => {
    render(() => <ComponentUnderTest lazyMount unmountOnExit collapsible />)
    expect(screen.queryByText('React Content')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'React Trigger' }))

    expect(screen.queryByText('React Content')).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'React Trigger' }))

    await waitFor(() => expect(screen.queryByText('React Content')).not.toBeInTheDocument())
  })
})

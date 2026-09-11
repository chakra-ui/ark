import { fireEvent, render, screen, waitFor, within } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import ComponentUnderTest from './examples/basic.svelte'
import DisabledExample from './examples/disabled.svelte'
import PropsFixture from './menubar.test.svelte'
import VerticalExample from './examples/vertical.svelte'

const focusTrigger = async (name: string) => {
  const trigger = screen.getByText(name)
  trigger.focus()
  fireEvent.focusIn(trigger)
  await waitFor(() => expect(trigger).toHaveFocus())
  return trigger
}

const waitForOpenContent = async () => {
  await waitFor(() => expect(document.activeElement).toHaveAttribute('data-menu-content'))
  return document.activeElement as HTMLElement
}

describe('Menubar', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(ComponentUnderTest)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should expose each menu trigger as a menubar item', () => {
    render(ComponentUnderTest)

    const menubar = screen.getByRole('menubar')
    expect(menubar).toHaveAttribute('data-orientation', 'horizontal')
    expect(within(menubar).getAllByRole('menuitem')).toHaveLength(4)
  })

  it('should skip a disabled trigger when navigating', async () => {
    render(ComponentUnderTest)
    const edit = await focusTrigger('Edit')

    // Develop sits between Edit and View, and is disabled
    fireEvent.keyDown(edit, { key: 'ArrowRight' })
    await waitFor(() => expect(screen.getByText('View')).toHaveFocus())

    fireEvent.keyDown(screen.getByText('View'), { key: 'ArrowLeft' })
    await waitFor(() => expect(screen.getByText('Edit')).toHaveFocus())
  })

  it('should not open a disabled menu on hover while a sibling is open', async () => {
    render(ComponentUnderTest)

    fireEvent.click(screen.getByText('File'))
    await waitFor(() => expect(screen.getByText('New File')).toBeVisible())

    fireEvent.pointerEnter(screen.getByText('Develop'), { pointerType: 'mouse' })
    expect(screen.getByText('Inspect Element')).not.toBeVisible()
    expect(screen.getByText('New File')).toBeVisible()
  })

  it('should open the menu owned by the clicked trigger', async () => {
    render(ComponentUnderTest)

    fireEvent.click(screen.getByText('File'))
    await waitFor(() => expect(screen.getByText('New File')).toBeVisible())
  })

  it('should close the menu when its trigger is clicked again', async () => {
    render(ComponentUnderTest)

    fireEvent.click(screen.getByText('File'))
    await waitFor(() => expect(screen.getByText('New File')).toBeVisible())

    fireEvent.click(screen.getByText('File'))
    await waitFor(() => expect(screen.getByText('New File')).not.toBeVisible())
    expect(screen.getByRole('menubar')).toHaveAttribute('data-has-open-menu', 'false')
  })

  it('should move focus between triggers with the arrow keys', async () => {
    render(ComponentUnderTest)
    const file = await focusTrigger('File')

    fireEvent.keyDown(file, { key: 'ArrowRight' })
    await waitFor(() => expect(screen.getByText('Edit')).toHaveFocus())

    fireEvent.keyDown(screen.getByText('Edit'), { key: 'ArrowLeft' })
    await waitFor(() => expect(screen.getByText('File')).toHaveFocus())
  })

  it('should loop focus back to the first trigger', async () => {
    render(ComponentUnderTest)
    const view = await focusTrigger('View')

    fireEvent.keyDown(view, { key: 'ArrowRight' })
    await waitFor(() => expect(screen.getByText('File')).toHaveFocus())
  })

  it('should not loop focus when loopFocus is false', async () => {
    render(PropsFixture, { props: { loopFocus: false } })
    const view = await focusTrigger('View')

    fireEvent.keyDown(view, { key: 'ArrowRight' })
    await waitFor(() => expect(screen.getByText('View')).toHaveFocus())
  })

  it('should move focus to the first and last trigger with home and end', async () => {
    render(ComponentUnderTest)
    const edit = await focusTrigger('Edit')

    fireEvent.keyDown(edit, { key: 'End' })
    await waitFor(() => expect(screen.getByText('View')).toHaveFocus())

    fireEvent.keyDown(screen.getByText('View'), { key: 'Home' })
    await waitFor(() => expect(screen.getByText('File')).toHaveFocus())
  })

  it('should focus the matching trigger on typeahead', async () => {
    render(ComponentUnderTest)
    const file = await focusTrigger('File')

    fireEvent.keyDown(file, { key: 'v' })
    await waitFor(() => expect(screen.getByText('View')).toHaveFocus())
  })

  it('should switch to the sibling menu with arrow keys while open', async () => {
    render(ComponentUnderTest)

    fireEvent.click(screen.getByText('File'))
    await waitFor(() => expect(screen.getByText('New File')).toBeVisible())
    const content = await waitForOpenContent()

    fireEvent.keyDown(content, { key: 'ArrowRight' })
    await waitFor(() => expect(screen.getByText('Undo')).toBeVisible())
    await waitFor(() => expect(screen.getByText('New File')).not.toBeVisible())
  })

  it('should switch to the sibling menu on hover while open', async () => {
    render(ComponentUnderTest)

    fireEvent.click(screen.getByText('File'))
    await waitFor(() => expect(screen.getByText('New File')).toBeVisible())

    fireEvent.pointerEnter(screen.getByText('Edit'), { pointerType: 'mouse' })
    await waitFor(() => expect(screen.getByText('Undo')).toBeVisible())
    await waitFor(() => expect(screen.getByText('New File')).not.toBeVisible())
  })

  it('should mark the swap as instant so styles can skip the animation', async () => {
    render(ComponentUnderTest)

    fireEvent.click(screen.getByText('File'))
    await waitFor(() => expect(screen.getByText('New File')).toBeVisible())
    const content = await waitForOpenContent()
    expect(content).not.toHaveAttribute('data-instant')

    fireEvent.keyDown(content, { key: 'ArrowRight' })
    await waitFor(() => expect(screen.getByText('Undo')).toBeVisible())

    expect(content).toHaveAttribute('data-instant', '')
    expect(screen.getByText('Undo').closest('[data-menu-content]')).toHaveAttribute('data-instant', '')
  })

  it('should clear the instant flag once the menu is reopened on its own', async () => {
    render(ComponentUnderTest)

    fireEvent.click(screen.getByText('File'))
    await waitFor(() => expect(screen.getByText('New File')).toBeVisible())
    fireEvent.pointerEnter(screen.getByText('Edit'), { pointerType: 'mouse' })
    await waitFor(() => expect(screen.getByText('Undo')).toBeVisible())

    const editContent = screen.getByText('Undo').closest('[data-menu-content]')
    expect(editContent).toHaveAttribute('data-instant', '')

    fireEvent.click(screen.getByText('Edit'))
    await waitFor(() => expect(screen.getByText('Undo')).not.toBeVisible())
    expect(editContent).not.toHaveAttribute('data-instant')

    fireEvent.click(screen.getByText('Edit'))
    await waitFor(() => expect(screen.getByText('Undo')).toBeVisible())
    expect(editContent).not.toHaveAttribute('data-instant')
  })

  it('should navigate the triggers vertically when orientation is vertical', async () => {
    render(VerticalExample)

    expect(screen.getByRole('menubar')).toHaveAttribute('data-orientation', 'vertical')
    const account = await focusTrigger('Account')

    fireEvent.keyDown(account, { key: 'ArrowDown' })
    await waitFor(() => expect(screen.getByText('Workspace')).toHaveFocus())
  })

  it('should not open a menu when the menubar is disabled', async () => {
    render(DisabledExample)

    expect(screen.getByRole('menubar')).toHaveAttribute('data-disabled', '')
    expect(screen.getByText('File')).toBeDisabled()

    fireEvent.click(screen.getByText('File'))
    expect(screen.getByText('File')).toHaveAttribute('aria-expanded', 'false')
  })
})

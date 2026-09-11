import { Menu } from '@ark-ui/react/menu'
import { Menubar } from '@ark-ui/react/menubar'
import { Portal } from '@ark-ui/react/portal'
import { act, render, screen, waitFor, within } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'

interface ComponentUnderTestProps extends Menubar.RootProps {
  menuProps?: Menu.RootProps | undefined
}

const ComponentUnderTest = (props: ComponentUnderTestProps) => {
  const { menuProps, ...rootProps } = props
  return (
    <Menubar.Root {...rootProps}>
      <Menu.Root {...menuProps}>
        <Menu.Trigger>File</Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="new">New File</Menu.Item>
              <Menu.Item value="open">Open</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
      <Menu.Root {...menuProps}>
        <Menu.Trigger>Edit</Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="undo">Undo</Menu.Item>
              <Menu.Item value="redo">Redo</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
      <Menu.Root {...menuProps}>
        <Menu.Trigger disabled>Develop</Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="inspect">Inspect</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
      <Menu.Root {...menuProps}>
        <Menu.Trigger>View</Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="zoom-in">Zoom In</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Menubar.Root>
  )
}

const renderMenubar = async (props: ComponentUnderTestProps = {}) => {
  let result!: ReturnType<typeof render>
  await act(async () => {
    result = render(<ComponentUnderTest {...props} />)
  })
  return result
}

const focusTrigger = async (name: string) => {
  const trigger = screen.getByText(name)
  await act(async () => trigger.focus())
  return trigger
}

describe('Menubar', () => {
  it('should have no a11y violations', async () => {
    const { container } = await renderMenubar()
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should expose each menu trigger as a menubar item', async () => {
    await renderMenubar()

    const menubar = screen.getByRole('menubar')
    expect(menubar).toHaveAttribute('data-orientation', 'horizontal')
    expect(within(menubar).getAllByRole('menuitem')).toHaveLength(4)
  })

  it('should skip a disabled trigger when navigating', async () => {
    await renderMenubar()
    await focusTrigger('Edit')

    // Develop sits between Edit and View, and is disabled
    await user.keyboard('{ArrowRight}')
    await waitFor(() => expect(screen.getByText('View')).toHaveFocus())

    await user.keyboard('{ArrowLeft}')
    await waitFor(() => expect(screen.getByText('Edit')).toHaveFocus())
  })

  it('should not open a disabled menu on hover while a sibling is open', async () => {
    await renderMenubar()

    await user.click(screen.getByText('File'))
    await waitFor(() => expect(screen.getByText('New File')).toBeVisible())

    await user.hover(screen.getByText('Develop'))
    expect(screen.getByText('Inspect')).not.toBeVisible()
    expect(screen.getByText('New File')).toBeVisible()
  })

  it('should open the menu owned by the clicked trigger', async () => {
    await renderMenubar()

    await user.click(screen.getByText('File'))
    await waitFor(() => expect(screen.getByText('New File')).toBeVisible())
  })

  it('should close the menu when its trigger is clicked again', async () => {
    await renderMenubar()

    await user.click(screen.getByText('File'))
    await waitFor(() => expect(screen.getByText('New File')).toBeVisible())

    await user.click(screen.getByText('File'))
    await waitFor(() => expect(screen.getByText('New File')).not.toBeVisible())
    expect(screen.getByRole('menubar')).toHaveAttribute('data-has-open-menu', 'false')
  })

  it('should move focus to the next trigger with arrow right', async () => {
    await renderMenubar()
    await focusTrigger('File')

    await user.keyboard('{ArrowRight}')
    await waitFor(() => expect(screen.getByText('Edit')).toHaveFocus())

    await user.keyboard('{ArrowRight}')
    await waitFor(() => expect(screen.getByText('View')).toHaveFocus())
  })

  it('should loop focus back to the first trigger by default', async () => {
    await renderMenubar()
    await focusTrigger('View')

    await user.keyboard('{ArrowRight}')
    await waitFor(() => expect(screen.getByText('File')).toHaveFocus())
  })

  it('should not loop focus when loopFocus is false', async () => {
    await renderMenubar({ loopFocus: false })
    await focusTrigger('View')

    await user.keyboard('{ArrowRight}')
    await waitFor(() => expect(screen.getByText('View')).toHaveFocus())
  })

  it('should move focus to the first and last trigger with home and end', async () => {
    await renderMenubar()
    await focusTrigger('Edit')

    await user.keyboard('{End}')
    await waitFor(() => expect(screen.getByText('View')).toHaveFocus())

    await user.keyboard('{Home}')
    await waitFor(() => expect(screen.getByText('File')).toHaveFocus())
  })

  it('should focus the matching trigger on typeahead', async () => {
    await renderMenubar()
    await focusTrigger('File')

    await user.keyboard('v')
    await waitFor(() => expect(screen.getByText('View')).toHaveFocus())
  })

  it('should switch to the sibling menu with arrow keys while open', async () => {
    await renderMenubar()

    await user.click(screen.getByText('File'))
    await waitFor(() => expect(screen.getByText('New File')).toBeVisible())

    await user.keyboard('{ArrowRight}')
    await waitFor(() => expect(screen.getByText('Undo')).toBeVisible())
    expect(screen.getByText('New File')).not.toBeVisible()
  })

  it('should switch to the sibling menu on hover while open', async () => {
    await renderMenubar()

    await user.click(screen.getByText('File'))
    await waitFor(() => expect(screen.getByText('New File')).toBeVisible())

    await user.hover(screen.getByText('Edit'))
    await waitFor(() => expect(screen.getByText('Undo')).toBeVisible())
    expect(screen.getByText('New File')).not.toBeVisible()
  })

  it('should mark the swap as instant so styles can skip the animation', async () => {
    await renderMenubar()

    await user.click(screen.getByText('File'))
    await waitFor(() => expect(screen.getByText('New File')).toBeVisible())

    const fileContent = screen.getByText('New File').closest('[data-menu-content]')
    const editContent = screen.getByText('Undo').closest('[data-menu-content]')
    expect(fileContent).not.toHaveAttribute('data-instant')

    await user.keyboard('{ArrowRight}')
    await waitFor(() => expect(screen.getByText('Undo')).toBeVisible())

    // both the outgoing and the incoming menu opt out of the open/close animation
    expect(fileContent).toHaveAttribute('data-instant', '')
    expect(editContent).toHaveAttribute('data-instant', '')
  })

  it('should clear the instant flag once the menu is reopened on its own', async () => {
    await renderMenubar()

    // open File, hover-switch to Edit -> both marked instant
    await user.click(screen.getByText('File'))
    await waitFor(() => expect(screen.getByText('New File')).toBeVisible())
    await user.hover(screen.getByText('Edit'))
    await waitFor(() => expect(screen.getByText('Undo')).toBeVisible())

    const editContent = screen.getByText('Undo').closest('[data-menu-content]')
    expect(editContent).toHaveAttribute('data-instant', '')

    // clicking the trigger closes it on its own, not as part of a swap
    await user.click(screen.getByText('Edit'))
    await waitFor(() => expect(screen.getByText('Undo')).not.toBeVisible())
    expect(editContent).not.toHaveAttribute('data-instant')

    // ...and reopening should animate again
    await user.click(screen.getByText('Edit'))
    await waitFor(() => expect(screen.getByText('Undo')).toBeVisible())
    expect(editContent).not.toHaveAttribute('data-instant')
  })

  it('should navigate the triggers vertically when orientation is vertical', async () => {
    await renderMenubar({ orientation: 'vertical' })

    expect(screen.getByRole('menubar')).toHaveAttribute('data-orientation', 'vertical')
    await focusTrigger('File')

    await user.keyboard('{ArrowDown}')
    await waitFor(() => expect(screen.getByText('Edit')).toHaveFocus())
  })

  it('should not open a menu when the menubar is disabled', async () => {
    await renderMenubar({ disabled: true })

    expect(screen.getByRole('menubar')).toHaveAttribute('data-disabled', '')

    expect(screen.getByText('File')).toBeDisabled()
    await user.click(screen.getByText('File'))
    expect(screen.getByText('New File')).not.toBeVisible()
  })
})

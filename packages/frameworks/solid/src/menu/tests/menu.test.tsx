import { menuAnatomy } from '@ark-ui/anatomy'
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { getParts } from '../../setup-test'
import { ComponentUnderTest } from './basic'
import { ContextMenuComponentUnderTest } from './context-menu'
import { MenuItemGroupComponentUnderTest } from './menu-item-group'
import { NestedMenuComponentUnderTest } from './nested-menu'
import { OptionGroupsComponentUnderTest } from './option-groups'
import { RenderPropComponentUnderTest } from './render-prop'

describe('Menu', () => {
  it.skip.each(getParts(menuAnatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  // it.skip.each(getExports(menuAnatomy))('should export %s', async (part) => {
  //   expect(Menu[part]).toBeDefined()
  // })

  it('should set correct aria attributes on disabled MenuItems', () => {
    render(() => <ComponentUnderTest />)

    expect(screen.getByText('Delivery')).toHaveAttribute('aria-disabled', 'true')
  })

  it('should not fire onValueChange on disabled MenuItems', async () => {
    const onValueChange = vi.fn()

    render(() => <ComponentUnderTest onValueChange={onValueChange} />)

    await user.click(screen.getByText('Delivery'))
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('should apply correct role to MenuItemGroup', async () => {
    render(() => <MenuItemGroupComponentUnderTest />)

    const button = screen.getByRole('button', { name: /open menu/i })

    await user.click(button)

    await waitFor(() => expect(screen.getAllByRole('group')).toHaveLength(2))
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText('Group 1').nextElementSibling).toBe(screen.getByText('Share...'))
  })

  it('should expose internal state as render prop', async () => {
    render(() => <RenderPropComponentUnderTest />)

    const button = screen.getByRole('button', { name: /open menu/i })

    await user.click(button)
    await screen.findByText(/close menu/i)

    await user.click(button)
    await screen.findByText(/open menu/i)
  })

  it('should accept a custom placement', async () => {
    render(() => <ComponentUnderTest dir="rtl" positioning={{ placement: 'left-start' }} />)

    const button = screen.getByRole('button', { name: /open menu/i })
    await user.click(button)

    const menuList = screen.getByRole('menu')
    expect(menuList).toHaveAttribute('data-placement', 'left-start')
  })

  it.skip('should control the open state', async () => {
    render(() => <ComponentUnderTest open />)

    const text = await screen.findByText('main menu content')
    expect(text).toBeVisible()
  })

  it('should be able to lazy mount', async () => {
    render(() => <ComponentUnderTest lazyMount />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    const trigger = screen.getByRole('button', { name: 'Open menu' })

    await user.click(trigger)
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(trigger)
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  it('should not have aria-controls if lazy mounted', async () => {
    render(() => <ComponentUnderTest lazyMount />)

    expect(screen.getByRole('button', { name: 'Open menu' })).not.toHaveAttribute('aria-controls')
  })

  it('should lazy mount and unmount on exit', async () => {
    render(() => <ComponentUnderTest lazyMount unmountOnExit />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    const trigger = screen.getByRole('button', { name: 'Open menu' })

    await user.click(trigger)
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(trigger)
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()
  })

  describe('ContextMenu', () => {
    it('should open on context menu', async () => {
      render(() => <ContextMenuComponentUnderTest />)

      const button = screen.getByRole('button', { name: /open menu/i })
      fireEvent.contextMenu(button)
      await waitFor(() => expect(screen.getByText(/menu content/i)).toBeVisible())
    })
  })

  describe('NestedMenu', () => {
    it.skip('should open on nested menu', async () => {
      render(() => <NestedMenuComponentUnderTest />)

      const button = screen.getByRole('button', { name: /open menu/i })
      await user.click(button)
      await waitFor(() => expect(screen.getByText(/main menu content/i)).toBeVisible())

      const nestedButton = screen.getByText(/Share/i)
      await user.click(nestedButton)
      await waitFor(() => expect(screen.getByText(/nested menu content/i)).toBeVisible())
    })
  })

  describe('OptionGroups', () => {
    render(() => <OptionGroupsComponentUnderTest />)

    it('should select a radio option', async () => {
      render(() => <ComponentUnderTest />)
      const menuButton = screen.getByRole('button', { name: /open menu/i })
      await user.click(menuButton)

      const radioButton = screen.getByRole('menuitemradio', { name: /react/i })
      await user.click(radioButton)
      await waitFor(() => expect(radioButton).toHaveAttribute('aria-checked', 'true'))
    })

    it('should select a checkbox option', async () => {
      render(() => <ComponentUnderTest />)
      const menuButton = screen.getByRole('button', { name: /open menu/i })
      await user.click(menuButton)

      const checkboxButton1 = screen.getByRole('menuitemcheckbox', { name: /ark/i })
      await user.click(checkboxButton1)

      await user.click(menuButton)

      const checkboxButton2 = screen.getByRole('menuitemcheckbox', { name: /panda/i })
      await user.click(checkboxButton2)

      await waitFor(() => expect(checkboxButton1).toHaveAttribute('aria-checked', 'true'))
      await waitFor(() => expect(checkboxButton2).toHaveAttribute('aria-checked', 'true'))
    })
  })
})

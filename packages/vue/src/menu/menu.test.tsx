import user from '@testing-library/user-event'
import { fireEvent, render, waitFor, type RenderOptions } from '@testing-library/vue'
import { nextTick } from 'vue'
import { Menu, MenuContent, MenuContextTrigger, MenuItem, MenuPositioner, MenuTrigger } from '.'
import BasicComponentStory from './stories/basic.stories.vue'
import GroupComponentStory from './stories/group.stories.vue'
import OptionsComponentStory from './stories/options.stories.vue'
import SubMenuComponentStory from './stories/sub-menu.stories.vue'

const TestBasicComponentRender = (opts?: RenderOptions) => {
  return render(BasicComponentStory, opts)
}

describe('Menu', () => {
  it('should set correct aria attributes on disabled MenuItems', () => {
    const { getByText } = TestBasicComponentRender()

    expect(getByText('Delivery')).toHaveAttribute('aria-disabled', 'true')
  })

  it('should not fire onValueChange on disabled MenuItems', async () => {
    const onValueChange = vi.fn()

    const { getByText } = TestBasicComponentRender({ props: { onValueChange } })

    await user.click(getByText('Open menu'))

    await user.click(getByText('Delivery'))

    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('should apply correct role to MenuItemGroup', async () => {
    const { getByRole, getAllByRole, getByText } = render(GroupComponentStory)

    const button = getByRole('button', { name: /open menu/i })

    await user.click(button)

    await waitFor(() => expect(getAllByRole('group')).toHaveLength(2))
    expect(getByText('Group 1').nextElementSibling).toBe(getByText('Share...'))
  })

  it('should expose internal state as render prop', async () => {
    const { getByRole, getByText } = TestBasicComponentRender()

    const button = getByRole('button', { name: /open menu/i })

    await user.click(button)
    await waitFor(() => expect(getByText(/close menu/i)).toBeInTheDocument())

    await user.click(button)
    await waitFor(() => expect(getByText(/open menu/i)).toBeInTheDocument())
  })

  it('should override menu item type', async () => {
    const { getByText } = render(
      <Menu>
        <MenuTrigger>
          <button>Open menu</button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem id="submit" type="submit">
            Submit
          </MenuItem>
          <MenuItem id="button">Button</MenuItem>
        </MenuContent>
      </Menu>,
    )

    const submitOption = getByText('Submit')
    expect(submitOption).toHaveAttribute('type', 'submit')
  })

  it('should accept a custom placement', async () => {
    const { getByRole } = render(
      <Menu dir="rtl" positioning={{ placement: 'left-start' }}>
        <MenuTrigger>
          <button>Open menu</button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem id="1">Pick me</MenuItem>
          <MenuItem id="2">No no, pick me</MenuItem>
        </MenuContent>
      </Menu>,
    )

    const button = getByRole('button', { name: /open menu/i })
    await user.click(button)

    const menuList = getByRole('menu')
    expect(menuList.getAttribute('data-placement')).toEqual('left-start')
  })
})

describe('ContextMenu', () => {
  it('should open on context menu', async () => {
    const { getByRole, getByText } = render(
      <Menu>
        <MenuContextTrigger>
          <button>Open menu</button>
        </MenuContextTrigger>
        <MenuContent>
          <span>menu content</span>
        </MenuContent>
      </Menu>,
    )

    const button = getByRole('button', { name: /open menu/i })
    fireEvent.contextMenu(button)
    await waitFor(() => expect(getByText(/menu content/i)).toBeVisible())
  })
})

describe('NestedMenu', () => {
  it('should open on nested menu', async () => {
    const { getByRole, getByText } = render(SubMenuComponentStory)

    const button = getByRole('button', { name: /open menu/i })
    await user.click(button)
    await waitFor(() => expect(getByText(/main menu content/i)).toBeVisible())

    const nestedButton = getByText(/Share/i)
    await user.click(nestedButton)
    await waitFor(() => expect(getByText(/nested menu content/i)).toBeVisible())
  })
})

describe('MenuOptions', () => {
  it('should select a radio option', async () => {
    const { getByRole } = render(OptionsComponentStory)
    const menuButton = getByRole('button', { name: /open menu/i })
    await user.click(menuButton)

    const radioButton = getByRole('menuitemradio', { name: /react/i })
    await user.click(radioButton)
    await waitFor(() => expect(radioButton).toHaveAttribute('aria-checked', 'true'))
  })

  it('should select a checkbox option', async () => {
    const { getByRole } = render(OptionsComponentStory)
    const menuButton = getByRole('button', { name: /open menu/i })
    await user.click(menuButton)

    const checkboxButton1 = getByRole('menuitemcheckbox', { name: 'Ark' })

    await user.click(checkboxButton1)

    await user.click(menuButton)

    const checkboxButton2 = getByRole('menuitemcheckbox', { name: 'Panda' })
    await user.click(checkboxButton2)

    await waitFor(() => expect(checkboxButton1).toHaveAttribute('aria-checked', 'true'))
    await waitFor(() => expect(checkboxButton2).toHaveAttribute('aria-checked', 'true'))
  })

  it('should control the open state', async () => {
    const { getByText } = render(
      <Menu isOpen>
        <MenuPositioner>
          <MenuContent>
            <span>main menu content</span>
          </MenuContent>
        </MenuPositioner>
      </Menu>,
    )

    // Tick twice
    await nextTick()
    await nextTick()

    const text = getByText('main menu content')
    expect(text).toBeVisible()
  })
})

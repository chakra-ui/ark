import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Async } from '../../../../examples/command/async.js'
import { mount as Basic } from '../../../../examples/command/basic.js'
import { mount as Dialog } from '../../../../examples/command/dialog.js'
import { mount as EmptyState } from '../../../../examples/command/empty-state.js'
import { mount as FromJson } from '../../../../examples/command/from-json.js'
import { mount as Groups } from '../../../../examples/command/groups.js'
import { mount as Keywords } from '../../../../examples/command/keywords.js'
import { mount as Pages } from '../../../../examples/command/pages.js'
import { mount } from '../../../test-utils.js'
import { createListCollection } from '@ark-ui/web/command'

const user = userEvent.setup()

const findInput = () =>
  waitFor(() => {
    const input = screen.getByRole('combobox')
    expect(input).toBeInstanceOf(HTMLInputElement)
    return input as HTMLInputElement
  })

const options = () => screen.queryAllByRole('option')

const optionTexts = () => options().map((option) => option.textContent?.trim())

const highlighted = () => document.querySelector('[role=option][data-highlighted]')

const output = () => document.querySelector('output')!

const fill = async (input: HTMLElement, text: string) => {
  await user.clear(input)
  if (text) await user.type(input, text)
}

const pressRightAfterTyping = async (text: string, highlightedText: string, ...keys: string[]) => {
  const input = await findInput()
  const isHighlighted = () => highlighted()?.textContent?.includes(highlightedText)

  input.focus()
  input.value = text
  input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: text }))
  for (let i = 0; i < 100 && !isHighlighted(); i++) await Promise.resolve()
  for (const key of keys) input.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }))
}

test('typing filters the items', async () => {
  mount(Basic)
  const input = await findInput()
  await waitFor(() => expect(options()).toHaveLength(5))

  await fill(input, 'open')

  await waitFor(() => expect(options()).toHaveLength(2))
  expect(options()[0]).toHaveTextContent(/Open file/)

  await fill(input, 'zzz')

  await waitFor(() => expect(options()).toHaveLength(0))

  await fill(input, '')

  await waitFor(() => expect(options()).toHaveLength(5))
})

test('Enter pressed right after typing selects the first match', async () => {
  mount(Pages)
  await waitFor(() => expect(options()).toHaveLength(3))

  await pressRightAfterTyping('dark', 'Dark', 'Enter')

  await waitFor(() => expect(output()).toHaveTextContent('Selected: dark'))
})

test('an arrow key pressed right after typing is not lost when the list re-renders', async () => {
  mount(Basic)
  await waitFor(() => expect(options()).toHaveLength(5))

  await pressRightAfterTyping('open', 'Open file', 'ArrowDown')

  await waitFor(() => expect(highlighted()).toHaveTextContent(/Open settings/))
})

test('the keyboard moves the highlight while focus stays in the input', async () => {
  mount(Basic)
  const input = await findInput()
  input.focus()
  await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'true'))

  await user.keyboard('{ArrowDown}')

  await waitFor(() => expect(highlighted()).toHaveTextContent(/Open file/))
  expect(input).toHaveFocus()
  expect(input).toHaveAttribute('aria-activedescendant', highlighted()!.id)

  await user.keyboard('{End}')

  await waitFor(() => expect(highlighted()).toHaveTextContent(/Open settings/))

  await user.keyboard('{Home}')

  await waitFor(() => expect(highlighted()).toHaveTextContent(/New file/))

  await user.keyboard('{ArrowUp}')

  await waitFor(() => expect(highlighted()).toHaveTextContent(/New file/))

  await fill(input, 'sav')

  await waitFor(() => expect(highlighted()).toHaveTextContent(/Save/))

  await user.keyboard('{Enter}')

  await waitFor(() => expect(output()).toHaveTextContent('Selected: save'))
  expect(input).toHaveValue('sav')
  expect(input).toHaveFocus()
})

test('clicking an item selects it and keeps focus in the input', async () => {
  mount(Basic)
  const input = await findInput()
  input.focus()

  await user.click(await screen.findByRole('option', { name: /Copy path/ }))

  await waitFor(() => expect(output()).toHaveTextContent('Selected: copy-path'))
  expect(input).toHaveFocus()
})

test('the keyboard skips disabled items and filtering hides empty groups', async () => {
  mount(Groups)
  const input = await findInput()
  input.focus()

  await user.keyboard('{Home}')

  await waitFor(() => expect(highlighted()).toHaveTextContent('Calendar'))

  await user.keyboard('{ArrowDown}{ArrowDown}')

  await waitFor(() => expect(highlighted()).toHaveTextContent('Profile'))
  expect(screen.getByRole('option', { name: 'Calculator' })).toHaveAttribute('aria-disabled', 'true')

  await fill(input, 'bill')

  await waitFor(() => expect(screen.queryByRole('group', { name: 'Suggestions' })).not.toBeInTheDocument())
  expect(screen.getByRole('group', { name: 'Settings' })).toBeVisible()
  expect(options()).toHaveLength(1)
})

test('typing an item keyword finds the item', async () => {
  mount(Keywords)

  await fill(await findInput(), 'logout')

  await waitFor(() => expect(options()).toHaveLength(1))
  expect(options()[0]).toHaveTextContent('Sign out')
})

test('the empty state shows only when nothing matches', async () => {
  mount(EmptyState)
  const empty = document.querySelector('ark-command-empty')!
  const input = await findInput()
  await waitFor(() => expect(input).toHaveValue('xyz'))
  await waitFor(() => expect(empty).toBeVisible())
  expect(empty).toHaveTextContent('No results for “xyz”')

  await fill(input, 'an')

  await waitFor(() => expect(empty).not.toBeVisible())
  expect(options()).toHaveLength(1)

  await fill(input, 'anx')

  await waitFor(() => expect(empty).toBeVisible())
})

test('grouped items from JSON can be found by their keywords', async () => {
  mount(FromJson)
  await waitFor(() => expect(screen.queryAllByRole('group')).toHaveLength(2))

  await fill(await findInput(), 'smaller')

  await waitFor(() => expect(optionTexts()).toEqual(['Zoom out']))
  expect(screen.queryByRole('group', { name: 'File' })).not.toBeInTheDocument()
})

test('a loading indicator shows while async results load', async () => {
  mount(Async)
  const command = document.querySelector('ark-command')!
  const loading = screen.getByText('Loading...', { selector: 'div' })
  await waitFor(() => expect(options()).toHaveLength(6))
  expect(command).not.toHaveAttribute('loading')

  await fill(await findInput(), 'grace')

  await waitFor(() => expect(command).toHaveAttribute('loading'))
  expect(loading).toBeVisible()
  await waitFor(() => expect(command).not.toHaveAttribute('loading'))
  expect(loading).not.toBeVisible()
  await waitFor(() => expect(options()).toHaveLength(1))
  expect(options()[0]).toHaveTextContent('Grace Hopper')
})

test('Enter opens an item page and Backspace goes back', async () => {
  mount(Pages)
  const input = await findInput()
  await waitFor(() => expect(options()).toHaveLength(3))
  await fill(input, 'theme')
  await waitFor(() => expect(highlighted()).toHaveTextContent('Change theme'))

  await user.keyboard('{Enter}')

  await waitFor(() => expect(options()[0]).toHaveTextContent('Light'))
  expect(options()).toHaveLength(3)
  expect(input).toHaveValue('')
  expect(output()).toHaveTextContent('Selected: none')

  await user.keyboard('{Enter}')

  await waitFor(() => expect(output()).toHaveTextContent('Selected: light'))

  await user.keyboard('{Backspace}')

  await waitFor(() => expect(highlighted()).toHaveTextContent('Change theme'))
  expect(options()).toHaveLength(3)
})

test('searching from the top level finds items on nested pages', async () => {
  mount(Pages)
  const input = await findInput()
  await waitFor(() => expect(options()).toHaveLength(3))
  expect(screen.queryByRole('option', { name: 'Dark' })).not.toBeInTheDocument()

  await fill(input, 'dark')

  await waitFor(() => expect(options()).toHaveLength(1))
  const option = screen.getByRole('option', { name: /Dark/ })
  expect(option).toBeVisible()
  expect(option).toHaveTextContent('Change theme')

  await user.keyboard('{Enter}')

  await waitFor(() => expect(output()).toHaveTextContent('Selected: dark'))
})

test('going back restores the previous page and its query', async () => {
  mount(Pages)
  const command = document.querySelector('ark-command')!
  const input = await findInput()
  await fill(input, 'lang')
  await waitFor(() => expect(highlighted()).toHaveTextContent('Change language'))

  await user.keyboard('{Enter}')

  await waitFor(() => expect(input).toHaveValue(''))
  await waitFor(() => expect(optionTexts()).toEqual(['English', 'French']))
  expect(screen.getByRole('button', { name: 'Change language' })).toBeVisible()
  expect(command.page).toBe('language')
  expect(command.canGoBack).toBe(true)
  expect(command.path.map((item) => item.value)).toEqual(['language'])

  expect(command.back()).toBe(true)

  await waitFor(() => expect(input).toHaveValue('lang'))
  await waitFor(() => expect(highlighted()).toHaveTextContent('Change language'))
  expect(command.page).toBeNull()
  expect(command.canGoBack).toBe(false)

  command.setPage('theme')

  await waitFor(() => expect(options()).toHaveLength(3))
  expect(command.up()).toBe(true)
  expect(command.up()).toBe(false)
})

test('the palette opens with Ctrl+K, runs a command and reopens empty', async () => {
  mount(Dialog)
  const command = document.querySelector('ark-command')!
  const dialogContent = document.querySelector('ark-dialog-content')!
  await waitFor(() => expect(command.api).toBeTruthy())
  expect(dialogContent).not.toBeVisible()

  await user.keyboard('{Control>}k{/Control}')

  await waitFor(() => expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeVisible())
  const input = await findInput()
  await waitFor(() => expect(input).toHaveFocus())

  await fill(input, 'term')
  await waitFor(() => expect(highlighted()).toHaveTextContent(/Toggle terminal/))
  await user.keyboard('{Enter}')

  await waitFor(() => expect(output()).toHaveTextContent('Ran: terminal'))
  await waitFor(() => expect(dialogContent).not.toBeVisible())

  await user.keyboard('{Control>}k{/Control}')

  await waitFor(() => expect(dialogContent).toBeVisible())
  expect(input).toHaveValue('')
  await waitFor(() => expect(options()).toHaveLength(5))

  await user.keyboard('{Escape}')

  await waitFor(() => expect(dialogContent).not.toBeVisible())
  await waitFor(() => expect(screen.getByRole('button', { name: /Search commands/ })).toHaveFocus())
})

test('a collection of object items can be searched and selected', async () => {
  mount((root) => {
    root.innerHTML = /* html */ `
      <ark-command>
        <ark-command-input><input aria-label="Search" /></ark-command-input>
        <ark-command-list></ark-command-list>
      </ark-command>`
  })
  const command = document.querySelector('ark-command')!
  command.collection = createListCollection({
    items: [
      { id: 'copy', title: 'Copy link', keywords: ['clipboard'] },
      { id: 'share', title: 'Share' },
    ],
    itemToValue: (item) => item.id,
    itemToString: (item) => item.title,
  })
  const selected: string[] = []
  command.addEventListener('itemselect', (event) => selected.push(event.detail.itemValue))
  await waitFor(() => expect(optionTexts()).toEqual(['Copy link', 'Share']))

  await fill(await findInput(), 'clipboard')

  await waitFor(() => expect(optionTexts()).toEqual(['Copy link']))

  await user.keyboard('{Enter}')

  await waitFor(() => expect(selected).toEqual(['copy']))
})

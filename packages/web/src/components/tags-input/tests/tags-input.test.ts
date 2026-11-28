import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as AllowDuplicates } from '../examples/allow-duplicates.js'
import { mount as Basic } from '../examples/basic.js'
import { mount as BlurBehavior } from '../examples/blur-behavior.js'
import { mount as Controlled } from '../examples/controlled.js'
import { mount as Delimiter } from '../examples/delimiter.js'
import { mount as DisabledEditing } from '../examples/disabled-editing.js'
import { mount as MaxWithOverflow } from '../examples/max-with-overflow.js'
import { mount as PasteBehavior } from '../examples/paste-behavior.js'
import { mount as Readonly } from '../examples/readonly.js'
import { mount as SanitizeValue } from '../examples/sanitize-value.js'
import { mount as Validation } from '../examples/validation.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const root = () => document.querySelector('ark-tags-input')!

const input = () => document.querySelector<HTMLInputElement>('ark-tags-input-input input')!

const hiddenInput = () => document.querySelector<HTMLInputElement>('ark-tags-input-hidden-input input')!

const tags = () => Array.from(document.querySelectorAll('ark-tags-input-item'), (item) => item.getAttribute('value'))

const preview = (value: string) =>
  document.querySelector<HTMLElement>(`ark-tags-input-item-preview[data-value="${value}"]`)!

const settle = () => new Promise((resolve) => setTimeout(resolve, 50))

const start = (example: (root: HTMLElement) => void, attributes: Record<string, string>) =>
  mount((container) => {
    example(container)
    const el = container.querySelector('ark-tags-input')!
    for (const [name, value] of Object.entries(attributes)) el.setAttribute(name, value)
  })

const listenFor = (type: string) => {
  const listener = vi.fn()
  root().addEventListener(type, (event) => listener((event as CustomEvent).detail))
  return listener
}

test('Enter adds the typed tag, clears the input and reports the value', async () => {
  mount(Basic)
  const changed = listenFor('valuechange')
  await user.click(screen.getByText('Frameworks'))
  await waitFor(() => expect(input()).toHaveFocus())

  await user.keyboard('React{Enter}')

  await waitFor(() => expect(tags()).toEqual(['React']))
  expect(screen.getByText('React', { selector: 'ark-tags-input-item-text' })).toBeVisible()
  expect(input()).toHaveValue('')
  expect(hiddenInput()).toHaveValue('React')
  expect(changed).toHaveBeenLastCalledWith(expect.objectContaining({ value: ['React'] }))

  await user.keyboard('Vue,')

  await waitFor(() => expect(tags()).toEqual(['React', 'Vue']))
})

test('a delimiter pattern splits tags on every matching character', async () => {
  mount(Delimiter)
  await user.click(input())

  await user.keyboard('react;vue solid,')

  await waitFor(() => expect(tags()).toEqual(['react', 'vue', 'solid']))
})

test('Backspace on an empty input highlights the last tag and a second Backspace deletes it', async () => {
  start(Basic, { 'default-value': 'React,Vue' })
  await waitFor(() => expect(tags()).toEqual(['React', 'Vue']))
  await user.click(input())

  await user.keyboard('{Backspace}')

  await waitFor(() => expect(preview('Vue')).toHaveAttribute('data-highlighted', ''))
  expect(tags()).toEqual(['React', 'Vue'])

  await user.keyboard('{Backspace}')

  await waitFor(() => expect(tags()).toEqual(['React']))
})

test('the delete trigger removes its tag and the clear trigger removes them all', async () => {
  start(Basic, { 'default-value': 'React,Solid,Vue' })
  await waitFor(() => expect(tags()).toHaveLength(3))

  await user.click(screen.getByRole('button', { name: 'Delete tag Solid' }))

  await waitFor(() => expect(tags()).toEqual(['React', 'Vue']))

  await user.click(screen.getByRole('button', { name: 'Clear all tags' }))

  await waitFor(() => expect(tags()).toEqual([]))
  expect(input()).toHaveFocus()
  expect(document.querySelector('ark-tags-input-clear-trigger button')).not.toBeVisible()
})

test('a duplicate tag is not added', async () => {
  start(Basic, { 'default-value': 'React' })
  await user.click(input())

  await user.keyboard('React{Enter}')
  await settle()

  expect(tags()).toEqual(['React'])
})

test('allow-duplicates adds the same tag twice', async () => {
  mount(AllowDuplicates)
  await user.click(input())

  await user.keyboard('React{Enter}React{Enter}')

  await waitFor(() => expect(tags()).toEqual(['React', 'React']))
})

test('max stops adding tags once it is reached', async () => {
  start(Basic, { 'default-value': 'React,Vue', max: '2' })
  await user.click(input())

  await user.keyboard('Solid{Enter}')
  await settle()

  expect(tags()).toEqual(['React', 'Vue'])
  expect(input()).toHaveValue('Solid')
})

test('allow-overflow adds past max and reports the overflow', async () => {
  start(MaxWithOverflow, { 'default-value': 'React,Vue,Solid' })
  const invalid = listenFor('valueinvalid')
  await user.click(input())

  await user.keyboard('Svelte{Enter}')

  await waitFor(() => expect(tags()).toEqual(['React', 'Vue', 'Solid', 'Svelte']))
  await waitFor(() => expect(invalid).toHaveBeenCalledWith(expect.objectContaining({ reason: 'rangeOverflow' })))
})

test('add-on-paste turns pasted text into tags split by the delimiter', async () => {
  mount(PasteBehavior)
  await user.click(input())

  await user.paste('React,Vue,Solid')

  await waitFor(() => expect(tags()).toEqual(['React', 'Vue', 'Solid']))
  expect(input()).toHaveValue('')
})

test('pasting without add-on-paste leaves the text in the input', async () => {
  mount(Basic)
  await user.click(input())

  await user.paste('React,Vue')
  await settle()

  expect(tags()).toEqual([])
  expect(input()).toHaveValue('React,Vue')
})

test('validate rejects a tag and reports it through valueinvalid', async () => {
  mount(Validation)
  const invalid = listenFor('valueinvalid')
  await user.click(input())

  await user.keyboard('ab{Enter}')

  await waitFor(() =>
    expect(invalid).toHaveBeenCalledWith(expect.objectContaining({ reason: 'invalidTag', values: ['ab'] })),
  )
  expect(tags()).toEqual([])

  await user.clear(input())
  await user.keyboard('abc{Enter}')

  await waitFor(() => expect(tags()).toEqual(['abc']))
})

test('sanitizeValue cleans a tag before it is added', async () => {
  mount(SanitizeValue)
  await user.click(input())

  await user.keyboard('  Ada@Example.COM {Enter}')

  await waitFor(() => expect(tags()).toEqual(['ada@example.com']))
})

test('an editable tag is edited by double-click and saved with Enter', async () => {
  start(Basic, { 'default-value': 'React,Vue', editable: '' })
  await waitFor(() => expect(tags()).toEqual(['React', 'Vue']))

  await user.dblClick(preview('Vue'))

  const editor = await screen.findByRole('textbox', { name: /Editing tag Vue/ })
  expect(editor).toHaveValue('Vue')
  expect(preview('Vue')).not.toBeVisible()

  await user.clear(editor)
  await user.keyboard('Svelte{Enter}')

  await waitFor(() => expect(tags()).toEqual(['React', 'Svelte']))
  expect(preview('Svelte')).toBeVisible()
})

test('tags cannot be edited without the editable attribute', async () => {
  start(DisabledEditing, { 'default-value': 'React' })
  await waitFor(() => expect(tags()).toEqual(['React']))

  await user.dblClick(preview('React'))
  await settle()

  expect(preview('React')).toBeVisible()
  expect(document.querySelector('ark-tags-input-item-input input')).not.toBeVisible()
})

test('blur-behavior add turns the typed text into a tag when focus leaves', async () => {
  mount((container) => {
    BlurBehavior(container)
    container.append(Object.assign(document.createElement('button'), { textContent: 'Next' }))
  })
  await user.click(input())
  await user.keyboard('React')

  await user.click(screen.getByRole('button', { name: 'Next' }))

  await waitFor(() => expect(tags()).toEqual(['React']))
})

test('a readonly tags input keeps its tags and disables its input', async () => {
  mount(Readonly)
  await waitFor(() => expect(tags()).toEqual(['React', 'Solid', 'Vue']))
  expect(root()).toHaveAttribute('data-readonly', '')
  expect(input()).toBeDisabled()

  await user.click(screen.getByRole('button', { name: 'Delete tag Solid' }))
  await settle()

  expect(tags()).toEqual(['React', 'Solid', 'Vue'])
})

test('the disabled attribute set after mount disables the input and the triggers', async () => {
  start(Basic, { 'default-value': 'React' })
  await waitFor(() => expect(input()).toBeEnabled())

  root().setAttribute('disabled', '')

  await waitFor(() => expect(input()).toBeDisabled())
  expect(root()).toHaveAttribute('data-disabled', '')
  expect(screen.getByRole('button', { name: 'Delete tag React' })).toBeDisabled()
})

test('a controlled tags input keeps its value attribute in sync and follows it when set', async () => {
  mount(Controlled)
  await waitFor(() => expect(tags()).toEqual(['React', 'Solid']))
  await user.click(input())

  await user.keyboard('Vue{Enter}')

  await waitFor(() => expect(root()).toHaveAttribute('value', 'React,Solid,Vue'))
  expect(tags()).toEqual(['React', 'Solid', 'Vue'])

  root().setAttribute('value', 'Svelte')

  await waitFor(() => expect(tags()).toEqual(['Svelte']))
  expect(hiddenInput()).toHaveValue('Svelte')
})

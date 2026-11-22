import { waitFor } from '@testing-library/dom'

import '@ark-ui/web/clipboard'
import '@ark-ui/web/combobox'
import '@ark-ui/web/command'
import '@ark-ui/web/timer'
import { mount as Combobox } from '../../components/combobox/examples/basic.js'
import { mount as Command } from '../../components/command/examples/basic.js'
import { mount } from '../../test-utils.js'

const visibleItems = (item: string, text: string) =>
  Array.from(document.querySelectorAll<HTMLElement>(item))
    .filter((element) => !element.hidden)
    .map((element) => element.querySelector(text)?.textContent?.trim())

test('a method called before the element is connected runs once it starts', async () => {
  const timer = document.createElement('ark-timer')

  timer.start()
  expect(timer.api).toBeUndefined()

  mount((root) => root.append(timer))

  await waitFor(() => expect(timer.api?.running).toBe(true))
})

test('a method called on a running element takes effect right away', async () => {
  mount((root) => {
    root.innerHTML = /* html */ `<ark-clipboard value="https://ark-ui.com"></ark-clipboard>`
  })
  const clipboard = document.querySelector('ark-clipboard')!
  await clipboard.ready

  clipboard.copy()

  await waitFor(async () => expect(await navigator.clipboard.readText()).toBe('https://ark-ui.com'))
  expect(clipboard.api?.copied).toBe(true)
})

test('removing the element cancels calls that have not run yet', async () => {
  const root = mount(() => {})
  const timer = document.createElement('ark-timer')

  root.append(timer)
  timer.start()
  timer.remove()

  root.append(timer)
  await timer.ready

  expect(timer.api?.running).toBe(false)
})

test('methods are listed in the element metadata', () => {
  const Timer = customElements.get('ark-timer') as unknown as { meta: { methods: string[] } }

  expect(Timer.meta.methods).toEqual(['start', 'pause', 'resume', 'reset', 'restart'])
})

test('setting combobox inputValue filters the items like typing does', async () => {
  mount(Combobox)
  const combobox = document.querySelector('ark-combobox')!

  combobox.inputValue = 'ban'

  await waitFor(() => expect(visibleItems('ark-combobox-item', 'ark-combobox-item-text')).toEqual(['Banana']))
  expect(combobox.inputValue).toBe('ban')
  expect(document.querySelector('ark-combobox-input input')).toHaveValue('ban')
})

test('setting command inputValue filters the items', async () => {
  mount(Command)
  const command = document.querySelector('ark-command')!

  command.inputValue = 'open'

  await waitFor(() =>
    expect(visibleItems('ark-command-item', 'ark-command-item-text')).toEqual(['Open file', 'Open settings']),
  )
  expect(command.inputValue).toBe('open')
})

test('ready resolves once the element has started, and again after it reconnects', async () => {
  const root = mount(() => {})
  const timer = document.createElement('ark-timer')

  root.append(timer)
  const firstStart = timer.ready
  await firstStart

  expect(timer.api).toBeDefined()

  timer.remove()

  expect(timer.ready).not.toBe(firstStart)

  root.append(timer)
  await timer.ready

  expect(timer.api).toBeDefined()
})

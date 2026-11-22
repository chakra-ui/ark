import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import '@ark-ui/web/accordion'
import '@ark-ui/web/select'
import { mount as Accordion } from '../../components/accordion/examples/basic.js'
import { mount as Select } from '../../components/select/examples/basic.js'
import { mount } from '../../test-utils.js'

const selectItem = (value: string) => document.querySelector(`ark-select-item[value="${value}"]`)!

test('an item reports its state, and parts inside it share that state', async () => {
  const user = userEvent.setup()
  mount(Select)
  const select = document.querySelector('ark-select')!
  await select.ready

  expect(selectItem('vue').state).toEqual({ value: 'vue', selected: true, highlighted: false, disabled: false })

  await user.click(screen.getByRole('combobox'))
  await user.click(screen.getByRole('option', { name: 'React' }))

  await waitFor(() => expect(selectItem('react').state).toMatchObject({ selected: true }))
  expect(selectItem('vue').state).toMatchObject({ selected: false })
  expect(selectItem('react').querySelector('ark-select-item-indicator')!.state).toEqual(selectItem('react').state)
})

test('a root reports its machine state', async () => {
  mount(Select)
  const select = document.querySelector('ark-select')!
  await select.ready

  expect(select.state).toMatchObject({ open: false, disabled: false })

  select.open = true

  await waitFor(() => expect(select.state).toMatchObject({ open: true }))
})

test('a part with its own state getter reports that state', async () => {
  mount(Accordion)
  await document.querySelector('ark-accordion')!.ready

  const [first, second] = document.querySelectorAll('ark-accordion-item-trigger')

  expect(first.state).toMatchObject({ expanded: true })
  expect(second.state).toMatchObject({ expanded: false })
})

test('state is undefined until the element connects', () => {
  const item = document.createElement('ark-select-item')

  expect(item.state).toBeUndefined()
  expect(document.createElement('ark-select').state).toBeUndefined()
})

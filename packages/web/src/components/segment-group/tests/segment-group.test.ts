import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Controlled } from '../examples/controlled.js'
import { mount as Disabled } from '../examples/disabled.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const checkedLabel = () => document.querySelector('label[data-state=checked]')

const radio = (value: string) => document.querySelector<HTMLInputElement>(`input[value=${value}]`)

test('clicking an item selects it and reports the change', async () => {
  mount(Controlled)
  const group = document.querySelector('ark-segment-group')!
  await waitFor(() => expect(document.querySelectorAll('input[type=radio]')).toHaveLength(4))

  await user.click(screen.getByText('Solid', { exact: true }))

  await waitFor(() => expect(document.querySelector('output')).toHaveTextContent('value: Solid'))
  expect(group).toHaveAttribute('value', 'Solid')
  await waitFor(() => expect(radio('Solid')).toBeChecked())
  expect(checkedLabel()).toHaveTextContent('Solid')
  expect(document.querySelector('input[name=framework]:checked')).toHaveAttribute('value', 'Solid')
})

test('arrow keys move the selection and skip disabled items', async () => {
  mount(Disabled)
  await waitFor(() => expect(checkedLabel()).toHaveTextContent('React'))
  radio('React')!.focus()

  await user.keyboard('{ArrowRight}')

  await waitFor(() => expect(checkedLabel()).toHaveTextContent('Solid'))

  await user.keyboard('{ArrowRight}')

  await waitFor(() => expect(checkedLabel()).toHaveTextContent('Vue'))

  await user.keyboard('{ArrowLeft}')

  await waitFor(() => expect(checkedLabel()).toHaveTextContent('Solid'))
})

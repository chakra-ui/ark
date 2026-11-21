import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Controlled } from '../../../../examples/segment-group/controlled.js'
import { mount as Disabled } from '../../../../examples/segment-group/disabled.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const checkedLabel = () => document.querySelector('label[data-state=checked]')

test('segment group selects a clicked item and emits valuechange', async () => {
  mount(Controlled)
  const group = document.querySelector('ark-segment-group')!
  await waitFor(() => expect(document.querySelectorAll('input[type=radio]')).toHaveLength(4))

  await user.click(screen.getByText('Solid', { exact: true }))
  await waitFor(() => expect(document.querySelector('output')).toHaveTextContent('value: Solid'))
  expect(group).toHaveAttribute('value', 'Solid')
  await waitFor(() => expect(document.querySelector('input[value=Solid]')).toBeChecked())
  expect(checkedLabel()).toHaveTextContent('Solid')
  expect(document.querySelector<HTMLInputElement>('input[name=framework]:checked')?.value).toBe('Solid')
})

test('segment group moves the selection with arrow keys and skips disabled items', async () => {
  mount(Disabled)
  await waitFor(() => expect(checkedLabel()).toHaveTextContent('React'))

  document.querySelector<HTMLInputElement>('input[value=React]')!.focus()
  await user.keyboard('{ArrowRight}')
  await waitFor(() => expect(checkedLabel()).toHaveTextContent('Solid'))

  await user.keyboard('{ArrowRight}')
  await waitFor(() => expect(checkedLabel()).toHaveTextContent('Vue'))

  await user.keyboard('{ArrowLeft}')
  await waitFor(() => expect(checkedLabel()).toHaveTextContent('Solid'))
})

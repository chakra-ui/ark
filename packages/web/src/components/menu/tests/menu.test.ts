import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as AsyncFiltering } from '../examples/async-filtering.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const texts = (elements: Iterable<Element>) => Array.from(elements, (element) => element.textContent?.trim())

test('async filtering loads matching people and assigns the chosen one', async () => {
  mount(AsyncFiltering)
  const trigger = await waitFor(() => {
    const trigger = screen.getByRole('button', { name: 'Assign' })
    expect(trigger).toHaveAttribute('aria-haspopup')
    return trigger
  })
  await user.click(trigger)
  const input = await screen.findByRole('searchbox', { name: 'Search people' })

  await user.type(input, 'ken')

  expect(await screen.findByText('Searching...')).toBeInTheDocument()
  await waitFor(() => expect(screen.queryByText('Searching...')).not.toBeInTheDocument())
  await waitFor(() => expect(texts(screen.getAllByRole('menuitemradio'))).toEqual(['Ken Thompson']))

  await user.click(screen.getByRole('menuitemradio', { name: 'Ken Thompson' }))

  await waitFor(() => expect(trigger).toHaveTextContent('Ken Thompson'))
})

import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/highlight/basic.js'
import { mount as DynamicQuery } from '../../../../examples/highlight/dynamic-query.js'
import { mount as ExactMatch } from '../../../../examples/highlight/exact-match.js'
import { mount as Multiple } from '../../../../examples/highlight/multiple.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const markTexts = () => Array.from(document.querySelectorAll('ark-highlight mark')).map((mark) => mark.textContent)

test('wraps the first match in a mark', async () => {
  mount(Basic)

  await waitFor(() => expect(markTexts()).toEqual(['component']))
  expect(document.querySelector('ark-highlight')).toHaveTextContent(
    'Ark UI is a headless component library for building accessible web applications.',
  )
})

test('match-all and exact-match change which words are marked', async () => {
  mount(ExactMatch)
  const [partial, exact] = document.querySelectorAll('ark-highlight')

  await waitFor(() => expect(partial.querySelectorAll('mark')).toHaveLength(3))
  expect(exact.querySelectorAll('mark')).toHaveLength(1)
})

test('the query property accepts an array and re-renders', async () => {
  mount(Multiple)
  const highlight = document.querySelector('ark-highlight')!

  await waitFor(() => expect(markTexts()).toEqual(['React', 'Vue']))

  highlight.query = 'Svelte'

  await waitFor(() => expect(markTexts()).toEqual(['Svelte']))
})

test('typing updates the query', async () => {
  mount(DynamicQuery)
  const input = await screen.findByPlaceholderText('Search text...')

  await user.clear(input)
  await user.type(input, 'accessible')

  await waitFor(() => expect(markTexts()).toEqual(['accessible']))
})

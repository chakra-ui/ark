import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import CheckboxTree from './checkbox-indicator.test.svelte'

const indicator = (id: string) => screen.getByTestId(`checkbox-${id}`)

describe('TreeView / NodeCheckboxIndicator', () => {
  it('should render the fallback when unchecked', () => {
    render(CheckboxTree)
    expect(indicator('src')).toHaveTextContent('empty')
    expect(indicator('src/a')).toHaveTextContent('empty')
  })

  it('should render checked and indeterminate states as nodes are checked', async () => {
    render(CheckboxTree)
    await userEvent.click(indicator('src/a'))
    expect(indicator('src/a')).toHaveTextContent('checked')
    expect(indicator('src/b')).toHaveTextContent('empty')
    expect(indicator('src')).toHaveTextContent('partial')

    await userEvent.click(indicator('src/b'))
    expect(indicator('src')).toHaveTextContent('checked')
  })
})

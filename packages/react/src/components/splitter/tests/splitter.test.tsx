import { cleanup, render } from '@testing-library/react/pure'
import { axe } from 'vitest-axe'
import { Splitter, splitterAnatomy } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('Splitter / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(splitterAnatomy))('should render part! %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(splitterAnatomy))('should export %s', async (part) => {
    expect(Splitter[part]).toBeDefined()
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})

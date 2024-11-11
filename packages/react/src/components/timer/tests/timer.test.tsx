import { cleanup, render } from '@testing-library/react/pure'
import { axe } from 'vitest-axe'
import { Timer, timerAnatomy } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('Timer / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  const renderedParts = getParts(timerAnatomy).filter(
    (part) =>
      !part.includes('[data-part="item-value"]') && !part.includes('[data-part="item-label"]'),
  )
  const exportedParts = getExports(timerAnatomy).filter(
    (part) => !['ItemValue', 'ItemLabel'].includes(part),
  )

  it.each(renderedParts)('should render part! %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(exportedParts)('should export %s', async (part) => {
    // @ts-expect-error
    expect(Timer[part]).toBeDefined()
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})

import { cleanup, render, screen } from '@testing-library/react/pure'
import { anatomy } from '@zag-js/progress'
import { axe } from 'vitest-axe'
import { Progress } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('Progress / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(anatomy))('should render part! %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(anatomy))('should export %s', async (part) => {
    expect(Progress[part]).toBeDefined()
  })
})

describe('Progress', () => {
  afterEach(() => {
    cleanup()
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should render', async () => {
    render(<ComponentUnderTest value={7} />)

    screen.getByText('7 percent')
  })

  it('should handle custom max range', async () => {
    render(<ComponentUnderTest value={30} max={30} />)

    screen.getByText('100 percent')
  })
})

import { progressAnatomy } from '@ark-ui/anatomy'
import { cleanup, render, screen } from '@testing-library/react/pure'
import { Progress } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('Progress / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(progressAnatomy))('should render part! %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(progressAnatomy))('should export %s', async (part) => {
    expect(Progress[part]).toBeDefined()
  })
})

describe('Progress', () => {
  afterEach(() => {
    cleanup()
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

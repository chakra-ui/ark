import { progressAnatomy } from '@ark-ui/anatomy'
// eslint-disable-next-line testing-library/no-manual-cleanup
import { cleanup, render, screen } from '@testing-library/react/pure'
import { Progress } from '../'
import { getExports, getParts } from '../../setup-test'
import { ComponentUnderTest } from './basic'

describe('Progress / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(progressAnatomy))('should render part! %s', async (part) => {
    // eslint-disable-next-line testing-library/no-node-access
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

  it('should handle default value', async () => {
    render(<ComponentUnderTest defaultValue={7} />)

    screen.getByText('7 percent')
  })

  it('should handle custom max range', async () => {
    render(<ComponentUnderTest defaultValue={30} max={30} />)

    screen.getByText('100 percent')
  })
})

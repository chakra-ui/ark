import { render, screen } from '@solidjs/testing-library'
import { anatomy } from '@zag-js/progress'
import { Progress } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('Progress', () => {
  it.each(getParts(anatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest />)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(anatomy))('should export %s', async (part) => {
    expect(Progress[part]).toBeDefined()
  })

  it('should handle default value', async () => {
    render(() => <ComponentUnderTest value={7} />)

    screen.getByText('7 percent')
  })

  it('should handle custom max range', async () => {
    render(() => <ComponentUnderTest value={30} max={30} />)

    screen.getByText('100 percent')
  })
})

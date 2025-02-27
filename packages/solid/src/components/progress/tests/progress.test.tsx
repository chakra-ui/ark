import { render, screen } from '@solidjs/testing-library'
import { ComponentUnderTest } from './basic'

describe('Progress', () => {
  it('should handle value', async () => {
    render(() => <ComponentUnderTest value={7} />)

    screen.getByText('7%')
  })

  it('should handle custom max range', async () => {
    render(() => <ComponentUnderTest value={30} max={30} />)

    screen.getByText('100%')
  })
})

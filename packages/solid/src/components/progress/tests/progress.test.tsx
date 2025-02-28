import { render, screen } from '@solidjs/testing-library'
import { ComponentUnderTest } from './basic'

describe('Progress', () => {
  it('should handle value', async () => {
    render(() => <ComponentUnderTest value={42} />)

    screen.getByText('42%')
  })

  it('should handle custom max range', async () => {
    render(() => <ComponentUnderTest value={30} max={30} />)

    screen.getByText('100%')
  })
})

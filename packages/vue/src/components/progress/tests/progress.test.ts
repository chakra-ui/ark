import { render, screen } from '@testing-library/vue'
import ComponentUnderTest from './progress.test.vue'

describe('Progress', () => {
  it('should handle value', async () => {
    render(ComponentUnderTest, {
      props: {
        defaultValue: 42,
      },
    })

    screen.getByText('42%')
  })

  it('should handle custom max range', async () => {
    render(ComponentUnderTest, {
      props: {
        defaultValue: 30,
        max: 30,
      },
    })

    screen.getByText('100%')
  })
})

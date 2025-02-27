import { render, screen } from '@testing-library/vue'
import ComponentUnderTest from './progress.test.vue'

describe('Progress', () => {
  it('should handle value', async () => {
    render(ComponentUnderTest, {
      props: {
        defaultValue: 7,
      },
    })

    screen.getByText('7%')
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

import { progressAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@testing-library/vue'
import { Progress } from '../'
import { getExports, getParts } from '../../setup-test'
import ComponentUnderTest from './progress.test.vue'

describe('Progress', () => {
  it.each(getParts(progressAnatomy))('should render part! %s', async (part) => {
    render(ComponentUnderTest)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(progressAnatomy))('should export %s', async (part) => {
    expect(Progress[part]).toBeDefined()
  })

  it('should handle default value', async () => {
    render(ComponentUnderTest, {
      props: {
        modelValue: 7,
      },
    })

    screen.getByText('7 percent')
  })

  it('should handle custom max range', async () => {
    render(ComponentUnderTest, {
      props: {
        modelValue: 30,
        max: 30,
      },
    })

    screen.getByText('100 percent')
  })
})

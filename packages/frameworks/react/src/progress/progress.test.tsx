import { progressAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@testing-library/react'
import { getExports, getParts } from '../setup-test'
import { Progress, type ProgressProps } from './'

const ComponentUnderTest = (props: ProgressProps) => (
  <Progress.Root {...props}>
    <Progress.Label>Label</Progress.Label>
    <Progress.ValueText />
    <Progress.Indicator state="loading" />
    <Progress.Track>
      <Progress.Range />
    </Progress.Track>
    <Progress.Circle>
      <Progress.CircleTrack />
      <Progress.CircleRange />
    </Progress.Circle>
  </Progress.Root>
)

describe('Progress', () => {
  it.each(getParts(progressAnatomy))('should render part! %s', async (part) => {
    render(<ComponentUnderTest />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(progressAnatomy))('should export %s', async (part) => {
    expect(Progress[part]).toBeDefined()
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

import { ratingGroupAnatomy } from '@ark-ui/anatomy'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { getParts } from '../setup-test'
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItem,
  RatingGroupLabel,
  type RatingGroupProps,
} from './'

const ComponentUnderTest = (props: RatingGroupProps) => (
  <RatingGroup {...props}>
    <RatingGroupLabel>GroupLabel</RatingGroupLabel>
    <RatingGroupControl>
      {({ sizeArray }) =>
        sizeArray.map((index) => (
          <RatingGroupItem key={index} index={index}>
            {({ isHalf, isHighlighted }) => {
              if (isHalf) return 'half'
              if (isHighlighted) return 'highlighted'
              return 'empty'
            }}
          </RatingGroupItem>
        ))
      }
    </RatingGroupControl>
  </RatingGroup>
)

describe('Rating Group', () => {
  it.each(getParts(ratingGroupAnatomy))('should render part! %s', async (part) => {
    render(<ComponentUnderTest />)
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it('should apply default value', async () => {
    render(<ComponentUnderTest defaultValue={2} max={5} />)

    const input = screen.getByRole('textbox', { hidden: true })

    expect(input).toHaveValue('2')
  })

  it('should apply value', async () => {
    render(<ComponentUnderTest value={1} defaultValue={2} max={5} />)

    const input = screen.getByRole('textbox', { hidden: true })

    expect(input).toHaveValue('1')
  })

  it('should trigger onValueChange on click', async () => {
    const onValueChange = vi.fn()
    render(<ComponentUnderTest value={1} onValueChange={onValueChange} max={5} />)

    const maxStarRadio = screen.getByRole('radio', { name: '5 stars' })
    fireEvent.click(maxStarRadio)

    await waitFor(() => expect(onValueChange).toHaveBeenNthCalledWith(1, { value: 5 }))
  })

  it('should update rating on click', async () => {
    render(<ComponentUnderTest defaultValue={0} max={5} />)

    const input = screen.getByRole('textbox', { hidden: true })
    const maxStarRadio = screen.getByRole('radio', { name: '5 stars' })
    fireEvent.click(maxStarRadio)

    await waitFor(() => expect(input).toHaveValue('5'))
  })
})

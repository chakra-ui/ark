import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { Rating, RatingGroup, RatingGroupControl, RatingGroupLabel, type RatingGroupProps } from '.'

const ComponentUnderTest = (props: RatingGroupProps) => (
  <RatingGroup {...props}>
    <RatingGroupLabel>GroupLabel</RatingGroupLabel>
    <RatingGroupControl>
      {({ sizeArray }) =>
        sizeArray.map((index) => (
          <Rating key={index} index={index}>
            {({ isHalf, isHighlighted }) => {
              if (isHalf) return 'half'
              if (isHighlighted) return 'highlighted'
              return 'empty'
            }}
          </Rating>
        ))
      }
    </RatingGroupControl>
  </RatingGroup>
)

describe('Rating Group', () => {
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

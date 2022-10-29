import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { Rating, RatingGroup, RatingItem, RatingLabel, RatingProps } from '.'

const ComponentUnderTest = (props: RatingProps) => (
  <Rating {...props}>
    <RatingLabel>Rating label</RatingLabel>
    <RatingGroup style={{ fontSize: '2em' }}>
      {({ sizeArray }) =>
        sizeArray.map((index) => (
          <RatingItem key={index} index={index}>
            {({ isHalf, isHighlighted }) => {
              if (isHalf) return 'half'
              if (isHighlighted) return 'highlighted'
              return 'empty'
            }}
          </RatingItem>
        ))
      }
    </RatingGroup>
  </Rating>
)

describe('Rating', () => {
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

  it('should trigger onChange on click', async () => {
    const onChange = vi.fn()
    render(<ComponentUnderTest value={1} onChange={onChange} max={5} />)

    const maxStarRadio = screen.getByRole('radio', { name: '5 stars' })
    fireEvent.click(maxStarRadio)

    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))
  })

  it('should update rating on click', async () => {
    render(<ComponentUnderTest defaultValue={0} max={5} />)

    const input = screen.getByRole('textbox', { hidden: true })
    const maxStarRadio = screen.getByRole('radio', { name: '5 stars' })
    fireEvent.click(maxStarRadio)

    await waitFor(() => expect(input).toHaveValue('5'))
  })
})

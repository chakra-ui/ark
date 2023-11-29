import { ratingGroupAnatomy } from '@ark-ui/anatomy'
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library'
import { Index } from 'solid-js'
import { vi } from 'vitest'
import { getExports, getParts } from '../setup-test'
import { RatingGroup, type RatingGroupProps } from './'

const ComponentUnderTest = (props: RatingGroupProps) => (
  <RatingGroup.Root {...props}>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      {(api) => (
        <Index each={api().items}>
          {(index) => (
            <RatingGroup.Item index={index()}>
              {(api) => {
                if (api().isHalf) return 'half'
                if (api().isHighlighted) return 'highlighted'
                return 'empty'
              }}
            </RatingGroup.Item>
          )}
        </Index>
      )}
    </RatingGroup.Control>
  </RatingGroup.Root>
)

describe('Rating Group', () => {
  it.each(getParts(ratingGroupAnatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest />)
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(ratingGroupAnatomy))('should export %s', async (part) => {
    expect(RatingGroup[part]).toBeDefined()
  })

  it('should apply default value', async () => {
    render(() => <ComponentUnderTest value={2} count={5} />)

    const input = screen.getByRole('textbox', { hidden: true })

    expect(input).toHaveValue('2')
  })

  it('should trigger onValueChange on click', async () => {
    const onValueChange = vi.fn()
    render(() => <ComponentUnderTest value={1} onValueChange={onValueChange} count={5} />)

    const maxStarRadio = screen.getByRole('radio', { name: '5 stars' })
    fireEvent.click(maxStarRadio)

    await waitFor(() => expect(onValueChange).toHaveBeenNthCalledWith(1, { value: 5 }))
  })

  it('should update rating on click', async () => {
    render(() => <ComponentUnderTest value={0} count={5} />)

    const input = screen.getByRole('textbox', { hidden: true })
    const maxStarRadio = screen.getByRole('radio', { name: '5 stars' })
    fireEvent.click(maxStarRadio)

    await waitFor(() => expect(input).toHaveValue('5'))
  })
})

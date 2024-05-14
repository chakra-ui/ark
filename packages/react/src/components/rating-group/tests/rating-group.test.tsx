import { ratingGroupAnatomy } from '@ark-ui/anatomy'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react/pure'
import { vi } from 'vitest'
import { RatingGroup } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('Rating Group / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(ratingGroupAnatomy))('should render part! %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(ratingGroupAnatomy))('should export %s', async (part) => {
    expect(RatingGroup[part]).toBeDefined()
  })
})

describe('Rating Group', () => {
  afterEach(() => {
    cleanup()
  })

  it('should apply default value', async () => {
    render(<ComponentUnderTest defaultValue={2} count={5} />)

    const input = screen.getByRole('textbox', { hidden: true })

    expect(input).toHaveValue('2')
  })

  it('should apply value', async () => {
    render(<ComponentUnderTest value={1} defaultValue={2} count={5} />)

    const input = screen.getByRole('textbox', { hidden: true })

    expect(input).toHaveValue('1')
  })

  it('should trigger onValueChange on click', async () => {
    const onValueChange = vi.fn()
    render(<ComponentUnderTest value={1} onValueChange={onValueChange} count={5} />)

    const maxStarRadio = screen.getByRole('radio', { name: '5 stars' })
    fireEvent.click(maxStarRadio)

    await waitFor(() => expect(onValueChange).toHaveBeenNthCalledWith(1, { value: 5 }))
  })

  it('should update rating on click', async () => {
    render(<ComponentUnderTest defaultValue={0} count={5} />)

    const input = screen.getByRole('textbox', { hidden: true })
    const maxStarRadio = screen.getByRole('radio', { name: '5 stars' })
    fireEvent.click(maxStarRadio)

    await waitFor(() => expect(input).toHaveValue('5'))
  })
})

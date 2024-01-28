import { carouselAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { Carousel } from '../'
import { getExports, getParts } from '../../setup-test'
import { ComponentUnderTest } from './basic'

describe('Carousel', () => {
  it.each(getParts(carouselAnatomy))('should render part %s', async (part) => {
    render(() => <ComponentUnderTest />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(carouselAnatomy))('should export %s', async (part) => {
    expect(Carousel[part]).toBeDefined()
  })

  it('should have the correct disabled / enabled states for control buttons', async () => {
    render(() => <ComponentUnderTest />)
    const prevButton = screen.getByRole('button', { name: 'Previous Slide' })
    const nextButton = screen.getByRole('button', { name: 'Next Slide' })

    // first slide
    expect(prevButton).toBeDisabled()
    expect(nextButton).toBeEnabled()

    // second slide
    await user.click(nextButton)
    expect(prevButton).toBeEnabled()
    expect(nextButton).toBeEnabled()

    // last slide
    await user.click(nextButton)
    expect(prevButton).toBeEnabled()
    expect(nextButton).toBeDisabled()
  })

  it('goes to the indicated slide on indicator click', async () => {
    render(() => <ComponentUnderTest />)
    const indicators = screen.getAllByTestId('indicator')
    const slides = screen.getAllByTestId('item')

    expect(slides[0]).toHaveAttribute('data-current', '')
    expect(indicators[0]).toHaveAttribute('data-current', '')

    await user.click(indicators[2])

    expect(indicators[0]).not.toHaveAttribute('data-current', '')
    expect(slides[0]).not.toHaveAttribute('data-current', '')
    expect(indicators[2]).toHaveAttribute('data-current', '')
    expect(slides[2]).toHaveAttribute('data-current', '')
  })
})

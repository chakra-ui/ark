import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ValueTextComponentUnderTest from './tests/angle-slider-value-text.test.svelte'

describe('AngleSlider', () => {
  it('should render the value in value text without children', () => {
    render(ValueTextComponentUnderTest)
    expect(screen.getByTestId('value-text')).toHaveTextContent('45deg')
  })
})

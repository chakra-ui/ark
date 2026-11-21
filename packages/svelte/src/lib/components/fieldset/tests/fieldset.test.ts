import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import FieldWithoutControlTest from './fieldset-field.test.svelte'

describe('Fieldset / Field', () => {
  it('should disable a field without a tracked control', () => {
    render(FieldWithoutControlTest)
    expect(screen.getByTestId('field')).toHaveAttribute('data-disabled')
    expect(screen.getByText('Label')).toHaveAttribute('data-disabled')
  })
})

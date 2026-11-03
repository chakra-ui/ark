import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './signature-pad-field.test.svelte'

describe('SignaturePad / Field', () => {
  it('should describe the control with the helper and error text', async () => {
    render(ComponentUnderTest)
    expect(await screen.findByRole('application')).toHaveAccessibleDescription('Error Info Additional Info')
  })
})

import { render, screen } from '@testing-library/svelte'
import SelectFieldTest from './select-field.test.svelte'

describe('Select / Field', () => {
  it('should describe the trigger with the helper text', () => {
    render(SelectFieldTest)
    expect(screen.getByRole('combobox')).toHaveAccessibleDescription('Additional Info')
  })

  it('should describe the trigger with the error text when invalid', () => {
    render(SelectFieldTest, { props: { invalid: true } })
    expect(screen.getByRole('combobox')).toHaveAccessibleDescription('Error Info Additional Info')
  })

  it('should give the hidden select the same description as the trigger', () => {
    render(SelectFieldTest)
    const describedBy = screen.getByRole('combobox').getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()
    expect(document.querySelector('select')).toHaveAttribute('aria-describedby', describedBy)
  })
})

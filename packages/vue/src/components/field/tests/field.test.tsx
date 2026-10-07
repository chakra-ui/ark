import user from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import ComponentUnderTest from './field.test.vue'
import StandaloneControls from './field-standalone.test.vue'
import NativeDefaults from './field-native-defaults.test.vue'
import { nextTick } from 'vue'

describe('Field', () => {
  it('should set textbox as required', async () => {
    render(ComponentUnderTest, { props: { required: true } })
    expect(screen.getByRole('textbox', { name: /label/i })).toBeRequired()
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('should set textbox as disabled', async () => {
    render(ComponentUnderTest, { props: { disabled: true } })
    expect(screen.getByRole('textbox', { name: /label/i })).toBeDisabled()
    expect(document.querySelector('[data-part="root"]')).toHaveAttribute('data-disabled')
    expect(screen.getByText('Label')).toHaveAttribute('data-disabled')
    expect(screen.getByText('Some additional Info')).toHaveAttribute('data-disabled')
  })

  it('should set textbox as readonly', async () => {
    render(ComponentUnderTest, { props: { readOnly: true } })
    expect(screen.getByRole('textbox', { name: /label/i })).toHaveAttribute('readonly')
  })

  it('should display helper text', async () => {
    render(ComponentUnderTest)
    expect(screen.getByText('Some additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(ComponentUnderTest, { props: { invalid: true } })
    await nextTick()
    expect(screen.getByText('Error Info')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription(expect.stringContaining('Error Info'))
  })

  it('should focus on input when label is clicked', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('textbox', { name: /label/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(ComponentUnderTest, { props: { invalid: false } })
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })

  it('should allow input to be controlled', async () => {
    render(ComponentUnderTest, { props: { modelValue: 'Input is controlled' } })

    expect(screen.getByRole('textbox', { name: /label/i })).toHaveValue('Input is controlled')
  })

  it('should sync controlled input value with v-model', async () => {
    const { emitted, rerender } = render(ComponentUnderTest, { props: { modelValue: 'a' } })
    const textbox = screen.getByRole('textbox', { name: /label/i })

    await rerender({ modelValue: 'b' })
    expect(textbox).toHaveValue('b')

    await user.type(textbox, 'c')
    expect(emitted('update:modelValue')).toContainEqual(['bc'])
  })

  it('should set aria-describedby to the ids of the error and helper text', async () => {
    render(ComponentUnderTest)
    const textbox = screen.getByRole('textbox', { name: /label/i })
    await waitFor(() => expect(textbox).toHaveAttribute('aria-describedby'))
  })

  it('should render input, textarea, and select outside Field.Root', () => {
    render(StandaloneControls)

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('should preserve native initial values when uncontrolled', () => {
    render(NativeDefaults)

    expect(document.querySelector('input[name="code"]')).toHaveValue('MAPS')
    expect(document.querySelector('textarea[name="notes"]')).toHaveValue('Hello')
    expect(screen.getByRole('combobox')).toHaveValue('us')

    const formData = new FormData(screen.getByTestId('form') as HTMLFormElement)
    expect(formData.get('code')).toBe('MAPS')
    expect(formData.get('notes')).toBe('Hello')
    expect(formData.get('country')).toBe('us')
  })
})

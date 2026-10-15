import { render, screen } from '@testing-library/vue'
import ComponentUnderTest from './field-description.test.vue'

const description = 'Error text Helper text'

describe('Field / description', () => {
  it('should describe the checkbox with the helper and error text', async () => {
    render(ComponentUnderTest)
    expect(await screen.findByTestId('checkbox')).toHaveAccessibleDescription(description)
  })

  it('should describe the switch with the helper and error text', async () => {
    render(ComponentUnderTest)
    expect(await screen.findByTestId('switch')).toHaveAccessibleDescription(description)
  })

  it('should describe the combobox input with the helper and error text', async () => {
    render(ComponentUnderTest)
    expect(await screen.findByTestId('combobox')).toHaveAccessibleDescription(description)
  })

  it('should describe the editable input with the helper and error text', async () => {
    render(ComponentUnderTest)
    expect(await screen.findByTestId('editable')).toHaveAccessibleDescription(description)
  })

  it('should describe the number input with the helper and error text', async () => {
    render(ComponentUnderTest)
    expect(await screen.findByTestId('number-input')).toHaveAccessibleDescription(description)
  })

  it('should describe the password input with the helper and error text', async () => {
    render(ComponentUnderTest)
    expect(await screen.findByTestId('password-input')).toHaveAccessibleDescription(description)
  })

  it('should describe the select trigger with the helper and error text', async () => {
    render(ComponentUnderTest)
    expect(await screen.findByTestId('select')).toHaveAccessibleDescription(description)
  })

  it('should describe the tags input with the helper and error text', async () => {
    render(ComponentUnderTest)
    expect(await screen.findByTestId('tags-input')).toHaveAccessibleDescription(description)
  })

  it('should describe the color picker trigger and channel input with the helper and error text', async () => {
    render(ComponentUnderTest)
    expect(await screen.findByTestId('color-picker-trigger')).toHaveAccessibleDescription(description)
    expect(await screen.findByTestId('color-picker-channel-input')).toHaveAccessibleDescription(description)
  })

  it('should describe the pin input group with the helper and error text', async () => {
    render(ComponentUnderTest)
    expect(await screen.findByTestId('pin-input')).toHaveAccessibleDescription(description)
  })

  it('should describe the file upload trigger and dropzone with the helper and error text', async () => {
    render(ComponentUnderTest)
    expect(await screen.findByTestId('file-upload-trigger')).toHaveAccessibleDescription(description)
    expect(await screen.findByTestId('file-upload-dropzone')).toHaveAccessibleDescription(description)
  })

  it('should describe the rating group and its items with the helper and error text', async () => {
    render(ComponentUnderTest)
    expect(await screen.findByTestId('rating-group')).toHaveAccessibleDescription(description)
    for (const item of await screen.findAllByTestId('rating-group-item')) {
      expect(item).toHaveAccessibleDescription(description)
    }
  })

  it('should describe the signature pad with the helper and error text', async () => {
    render(ComponentUnderTest)
    expect(await screen.findByTestId('signature-pad')).toHaveAccessibleDescription(description)
  })

  it('should label the pin input group with the field label', async () => {
    render(ComponentUnderTest)
    const group = await screen.findByTestId('pin-input')
    expect(group).toHaveRole('group')
    expect(group).toHaveAccessibleName('Label')
  })
})

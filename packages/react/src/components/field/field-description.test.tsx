import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { Checkbox } from '@ark-ui/react/checkbox'
import { createListCollection } from '@ark-ui/react/collection'
import { ColorPicker, parseColor } from '@ark-ui/react/color-picker'
import { Combobox } from '@ark-ui/react/combobox'
import { Editable } from '@ark-ui/react/editable'
import { Field } from '@ark-ui/react/field'
import { FileUpload } from '@ark-ui/react/file-upload'
import { NumberInput } from '@ark-ui/react/number-input'
import { PasswordInput } from '@ark-ui/react/password-input'
import { PinInput } from '@ark-ui/react/pin-input'
import { RatingGroup } from '@ark-ui/react/rating-group'
import { Select } from '@ark-ui/react/select'
import { SignaturePad } from '@ark-ui/react/signature-pad'
import { Switch } from '@ark-ui/react/switch'
import { TagsInput } from '@ark-ui/react/tags-input'

const collection = createListCollection({ items: ['React', 'Vue'] })

const InvalidField = (props: { children: ReactNode }) => (
  <Field.Root invalid>
    <Field.Label>Label</Field.Label>
    {props.children}
    <Field.HelperText>Helper text</Field.HelperText>
    <Field.ErrorText>Error text</Field.ErrorText>
  </Field.Root>
)

const ComponentUnderTest = () => (
  <>
    <InvalidField>
      <Checkbox.Root>
        <Checkbox.Control />
        <Checkbox.HiddenInput data-testid="checkbox" />
      </Checkbox.Root>
    </InvalidField>
    <InvalidField>
      <Switch.Root>
        <Switch.Control />
        <Switch.HiddenInput data-testid="switch" />
      </Switch.Root>
    </InvalidField>
    <InvalidField>
      <Combobox.Root collection={collection}>
        <Combobox.Control>
          <Combobox.Input data-testid="combobox" />
        </Combobox.Control>
      </Combobox.Root>
    </InvalidField>
    <InvalidField>
      <Editable.Root defaultEdit>
        <Editable.Area>
          <Editable.Input data-testid="editable" />
        </Editable.Area>
      </Editable.Root>
    </InvalidField>
    <InvalidField>
      <NumberInput.Root>
        <NumberInput.Input data-testid="number-input" />
      </NumberInput.Root>
    </InvalidField>
    <InvalidField>
      <PasswordInput.Root>
        <PasswordInput.Control>
          <PasswordInput.Input data-testid="password-input" />
        </PasswordInput.Control>
      </PasswordInput.Root>
    </InvalidField>
    <InvalidField>
      <Select.Root collection={collection}>
        <Select.Control>
          <Select.Trigger data-testid="select">
            <Select.ValueText placeholder="Pick" />
          </Select.Trigger>
        </Select.Control>
        <Select.HiddenSelect />
      </Select.Root>
    </InvalidField>
    <InvalidField>
      <TagsInput.Root>
        <TagsInput.Control>
          <TagsInput.Input data-testid="tags-input" />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput.Root>
    </InvalidField>
    <InvalidField>
      <ColorPicker.Root defaultValue={parseColor('#ff0000')}>
        <ColorPicker.Control>
          <ColorPicker.ChannelInput channel="hex" data-testid="color-picker-channel-input" />
          <ColorPicker.Trigger data-testid="color-picker-trigger" />
        </ColorPicker.Control>
        <ColorPicker.HiddenInput />
      </ColorPicker.Root>
    </InvalidField>
    <InvalidField>
      <PinInput.Root count={2}>
        <PinInput.Control data-testid="pin-input">
          <PinInput.Input index={0} />
          <PinInput.Input index={1} />
        </PinInput.Control>
        <PinInput.HiddenInput />
      </PinInput.Root>
    </InvalidField>
    <InvalidField>
      <FileUpload.Root>
        <FileUpload.Dropzone data-testid="file-upload-dropzone">
          <FileUpload.Trigger data-testid="file-upload-trigger">Choose</FileUpload.Trigger>
        </FileUpload.Dropzone>
        <FileUpload.HiddenInput />
      </FileUpload.Root>
    </InvalidField>
    <InvalidField>
      <RatingGroup.Root count={2}>
        <RatingGroup.Control data-testid="rating-group">
          <RatingGroup.Item index={1} data-testid="rating-group-item" />
          <RatingGroup.Item index={2} data-testid="rating-group-item" />
        </RatingGroup.Control>
        <RatingGroup.HiddenInput />
      </RatingGroup.Root>
    </InvalidField>
    <InvalidField>
      <SignaturePad.Root>
        <SignaturePad.Control data-testid="signature-pad">
          <SignaturePad.Segment />
        </SignaturePad.Control>
      </SignaturePad.Root>
    </InvalidField>
  </>
)

const description = 'Error text Helper text'

describe('Field / description', () => {
  it('should describe the checkbox with the helper and error text', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByTestId('checkbox')).toHaveAccessibleDescription(description)
  })

  it('should describe the switch with the helper and error text', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByTestId('switch')).toHaveAccessibleDescription(description)
  })

  it('should describe the combobox input with the helper and error text', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByTestId('combobox')).toHaveAccessibleDescription(description)
  })

  it('should describe the editable input with the helper and error text', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByTestId('editable')).toHaveAccessibleDescription(description)
  })

  it('should describe the number input with the helper and error text', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByTestId('number-input')).toHaveAccessibleDescription(description)
  })

  it('should describe the password input with the helper and error text', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByTestId('password-input')).toHaveAccessibleDescription(description)
  })

  it('should describe the select trigger with the helper and error text', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByTestId('select')).toHaveAccessibleDescription(description)
  })

  it('should describe the tags input with the helper and error text', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByTestId('tags-input')).toHaveAccessibleDescription(description)
  })

  it('should describe the color picker trigger and channel input with the helper and error text', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByTestId('color-picker-trigger')).toHaveAccessibleDescription(description)
    expect(screen.getByTestId('color-picker-channel-input')).toHaveAccessibleDescription(description)
  })

  it('should describe the pin input group with the helper and error text', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByTestId('pin-input')).toHaveAccessibleDescription(description)
  })

  it('should describe the file upload trigger and dropzone with the helper and error text', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByTestId('file-upload-trigger')).toHaveAccessibleDescription(description)
    expect(screen.getByTestId('file-upload-dropzone')).toHaveAccessibleDescription(description)
  })

  it('should describe the rating group and its items with the helper and error text', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByTestId('rating-group')).toHaveAccessibleDescription(description)
    for (const item of screen.getAllByTestId('rating-group-item')) {
      expect(item).toHaveAccessibleDescription(description)
    }
  })

  it('should describe the signature pad with the helper and error text', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByTestId('signature-pad')).toHaveAccessibleDescription(description)
  })

  it('should label the pin input group with the field label', () => {
    render(<ComponentUnderTest />)
    const group = screen.getByTestId('pin-input')
    expect(group).toHaveRole('group')
    expect(group).toHaveAccessibleName('Label')
  })
})

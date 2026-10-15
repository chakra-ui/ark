<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import { createListCollection } from '@ark-ui/svelte/collection'
  import { ColorPicker, parseColor } from '@ark-ui/svelte/color-picker'
  import { Combobox } from '@ark-ui/svelte/combobox'
  import { Editable } from '@ark-ui/svelte/editable'
  import { Field } from '@ark-ui/svelte/field'
  import { FileUpload } from '@ark-ui/svelte/file-upload'
  import { NumberInput } from '@ark-ui/svelte/number-input'
  import { PasswordInput } from '@ark-ui/svelte/password-input'
  import { PinInput } from '@ark-ui/svelte/pin-input'
  import { RatingGroup } from '@ark-ui/svelte/rating-group'
  import { Select } from '@ark-ui/svelte/select'
  import { SignaturePad } from '@ark-ui/svelte/signature-pad'
  import { Switch } from '@ark-ui/svelte/switch'
  import { TagsInput } from '@ark-ui/svelte/tags-input'

  const collection = createListCollection({ items: ['React', 'Vue'] })
  const color = parseColor('#ff0000')
</script>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <Checkbox.Root>
    <Checkbox.Control />
    <Checkbox.HiddenInput data-testid="checkbox" />
  </Checkbox.Root>
  <Field.HelperText>Helper text</Field.HelperText>
  <Field.ErrorText>Error text</Field.ErrorText>
</Field.Root>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <Switch.Root>
    <Switch.Control />
    <Switch.HiddenInput data-testid="switch" />
  </Switch.Root>
  <Field.HelperText>Helper text</Field.HelperText>
  <Field.ErrorText>Error text</Field.ErrorText>
</Field.Root>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <Combobox.Root collection={collection}>
    <Combobox.Control>
      <Combobox.Input data-testid="combobox" />
    </Combobox.Control>
  </Combobox.Root>
  <Field.HelperText>Helper text</Field.HelperText>
  <Field.ErrorText>Error text</Field.ErrorText>
</Field.Root>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <Editable.Root defaultEdit>
    <Editable.Area>
      <Editable.Input data-testid="editable" />
    </Editable.Area>
  </Editable.Root>
  <Field.HelperText>Helper text</Field.HelperText>
  <Field.ErrorText>Error text</Field.ErrorText>
</Field.Root>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <NumberInput.Root>
    <NumberInput.Input data-testid="number-input" />
  </NumberInput.Root>
  <Field.HelperText>Helper text</Field.HelperText>
  <Field.ErrorText>Error text</Field.ErrorText>
</Field.Root>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <PasswordInput.Root>
    <PasswordInput.Control>
      <PasswordInput.Input data-testid="password-input" />
    </PasswordInput.Control>
  </PasswordInput.Root>
  <Field.HelperText>Helper text</Field.HelperText>
  <Field.ErrorText>Error text</Field.ErrorText>
</Field.Root>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <Select.Root collection={collection}>
    <Select.Control>
      <Select.Trigger data-testid="select">
        <Select.ValueText placeholder="Pick" />
      </Select.Trigger>
    </Select.Control>
    <Select.HiddenSelect />
  </Select.Root>
  <Field.HelperText>Helper text</Field.HelperText>
  <Field.ErrorText>Error text</Field.ErrorText>
</Field.Root>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <TagsInput.Root>
    <TagsInput.Control>
      <TagsInput.Input data-testid="tags-input" />
    </TagsInput.Control>
    <TagsInput.HiddenInput />
  </TagsInput.Root>
  <Field.HelperText>Helper text</Field.HelperText>
  <Field.ErrorText>Error text</Field.ErrorText>
</Field.Root>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <ColorPicker.Root defaultValue={color}>
    <ColorPicker.Control>
      <ColorPicker.ChannelInput channel="hex" data-testid="color-picker-channel-input" />
      <ColorPicker.Trigger data-testid="color-picker-trigger" />
    </ColorPicker.Control>
    <ColorPicker.HiddenInput />
  </ColorPicker.Root>
  <Field.HelperText>Helper text</Field.HelperText>
  <Field.ErrorText>Error text</Field.ErrorText>
</Field.Root>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <PinInput.Root count={2}>
    <PinInput.Control data-testid="pin-input">
      <PinInput.Input index={0} />
      <PinInput.Input index={1} />
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.Root>
  <Field.HelperText>Helper text</Field.HelperText>
  <Field.ErrorText>Error text</Field.ErrorText>
</Field.Root>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <FileUpload.Root>
    <FileUpload.Dropzone data-testid="file-upload-dropzone">
      <FileUpload.Trigger data-testid="file-upload-trigger">Choose</FileUpload.Trigger>
    </FileUpload.Dropzone>
    <FileUpload.HiddenInput />
  </FileUpload.Root>
  <Field.HelperText>Helper text</Field.HelperText>
  <Field.ErrorText>Error text</Field.ErrorText>
</Field.Root>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <RatingGroup.Root count={2}>
    <RatingGroup.Control data-testid="rating-group">
      <RatingGroup.Item index={1} data-testid="rating-group-item" />
      <RatingGroup.Item index={2} data-testid="rating-group-item" />
    </RatingGroup.Control>
    <RatingGroup.HiddenInput />
  </RatingGroup.Root>
  <Field.HelperText>Helper text</Field.HelperText>
  <Field.ErrorText>Error text</Field.ErrorText>
</Field.Root>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <SignaturePad.Root>
    <SignaturePad.Control data-testid="signature-pad">
      <SignaturePad.Segment />
    </SignaturePad.Control>
  </SignaturePad.Root>
  <Field.HelperText>Helper text</Field.HelperText>
  <Field.ErrorText>Error text</Field.ErrorText>
</Field.Root>

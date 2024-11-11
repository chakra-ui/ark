<p align="center">
  <img alt="License" src="https://img.shields.io/npm/l/@ark-ui/solid?style=for-the-badge" />
  <img alt="GitHub stars" src="https://img.shields.io/github/stars/chakra-ui/ark?logo=github&style=for-the-badge" />
  <img alt="Downloads" src="https://img.shields.io/npm/dt/@ark-ui/solid?style=for-the-badge" />
</p>

# Welcome to Ark UI

Ark UI is a headless, open-source UI library with over 45+ components designed for building
reusable, scalable Design Systems. It supports a wide range of JavaScript frameworks, offering
dedciated packages for each supported framework.

## Supported Frameworks

Ark UI is available for the following JavaScript frameworks:

- **React**: `@ark-ui/react`
- **Solid**: `@ark-ui/solid`
- **Vue**: `@ark-ui/vue`

## Available Components

- [Accordion](https://ark-ui.com/solid/docs/components/accordion)
- [Avatar](https://ark-ui.com/solid/docs/components/avatar)
- [Carousel](https://ark-ui.com/solid/docs/components/carousel)
- [Checkbox](https://ark-ui.com/solid/docs/components/checkbox)
- [Clipboard](https://ark-ui.com/solid/docs/components/clipboard)
- [Collapsible](https://ark-ui.com/solid/docs/components/collapsible)
- [Color Picker](https://ark-ui.com/solid/docs/components/color-picker)
- [Combobox](https://ark-ui.com/solid/docs/components/combobox)
- [Date Picker](https://ark-ui.com/solid/docs/components/date-picker)
- [Dialog](https://ark-ui.com/solid/docs/components/dialog)
- [Editable](https://ark-ui.com/solid/docs/components/editable)
- [Field](https://ark-ui.com/solid/docs/components/field)
- [Fieldset](https://ark-ui.com/solid/docs/components/fieldset)
- [File Upload](https://ark-ui.com/solid/docs/components/file-upload)
- [Hover Card](https://ark-ui.com/solid/docs/components/hover-card)
- [Menu](https://ark-ui.com/solid/docs/components/menu)
- [Number Input](https://ark-ui.com/solid/docs/components/number-input)
- [Pagination](https://ark-ui.com/solid/docs/components/pagination)
- [Pin Input](https://ark-ui.com/solid/docs/components/pin-input)
- [Popover](https://ark-ui.com/solid/docs/components/popover)
- [Progress - Circular](https://ark-ui.com/solid/docs/components/progress-circular)
- [Progress - Linear](https://ark-ui.com/solid/docs/components/progress-linear)
- [QR Code](https://ark-ui.com/solid/docs/components/qr-code)
- [Radio Group](https://ark-ui.com/solid/docs/components/radio-group)
- [Rating Group](https://ark-ui.com/solid/docs/components/rating-group)
- [Segment Group](https://ark-ui.com/solid/docs/components/segment-group)
- [Select](https://ark-ui.com/solid/docs/components/select)
- [Signature Pad](https://ark-ui.com/solid/docs/components/signature-pad)
- [Slider](https://ark-ui.com/solid/docs/components/slider)
- [Splitter](https://ark-ui.com/solid/docs/components/splitter)
- [Switch](https://ark-ui.com/solid/docs/components/switch)
- [Tabs](https://ark-ui.com/solid/docs/components/tabs)
- [Tags Input](https://ark-ui.com/solid/docs/components/tags-input)
- [Time Picker](https://ark-ui.com/solid/docs/components/time-picker)
- [Toast](https://ark-ui.com/solid/docs/components/toast)
- [Toggle Group](https://ark-ui.com/solid/docs/components/toggle-group)
- [Tooltip](https://ark-ui.com/solid/docs/components/tooltip)
- [Tree View](https://ark-ui.com/solid/docs/components/tree-view)

## Installation

To install `@ark-ui/solid`, run the following command:

```bash
npm install @ark-ui/solid
```

or with yarn:

```bash
yarn add @ark-ui/solid
```

## Usage

To use a component from `@ark-ui/solid`, import it and include it in your application:

```tsx
import { Slider } from '@ark-ui/solid'
import { createSignal } from 'solid-js'

export const MySlider = () => {
  const [value, setValue] = createSignal([30])

  return (
    <Slider.Root min={-50} max={50} value={value()} onValueChange={(e) => setValue(e.value)}>
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText>{value}</Slider.ValueText>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} />
      </Slider.Control>
    </Slider.Root>
  )
}
```

## Documentation

For more detailed documentation and examples, please visit the
[official documentation](https://ark-ui.com/).

## Roadmap

You can request, vote for, and check upcoming features on our [roadmap](https://ark-ui.canny.io/).

## Contribution

We welcome contributions to Ark UI. Please read our
[contributing guidelines](https://github.com/chakra-ui/ark/blob/main/CONTRIBUTING.md) for more
information on how to contribute.

## License

This project is licensed under the terms of the
[MIT license](https://github.com/chakra-ui/ark/blob/main/LICENSE).

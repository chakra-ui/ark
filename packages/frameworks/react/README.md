# @ark-ui/react

`@ark-ui/react` is an open-source UI component library designed to make building high-quality, accessible web applications easier. The library focuses on providing low-level UI components with an emphasis on accessibility, customization, and developer experience.

## Key Features

- **Accessible**: Components in Ark UI are designed with accessibility in mind, adhering to WAI-ARIA design patterns and handling implementation details such as aria and role attributes, focus management, and keyboard navigation.
- **Headless**: Components are shipped without styles, giving developers full control over styling.
- **Customizable**: The open component architecture allows for customization and customization, providing granular access to each component part.
- **Powered by state machines**: Predictable, simplified, and robust component behavior.
- **Developer Experience**: The library provides a fully-typed API with a consistent and predictable experience.

## Available Components

At the moment, `@ark-ui/react`offers the following components:

- [Accordion](https://ark-ui.com/docs/react/components/accordion)
- [Avatar](https://ark-ui.com/docs/react/components/avatar)
- [Carousel](https://ark-ui.com/docs/react/components/carousel)
- [Checkbox](https://ark-ui.com/docs/react/components/checkbox)
- [Color Picker](https://ark-ui.com/docs/react/components/color-picker)
- [Combobox](https://ark-ui.com/docs/react/components/combobox)
- [Date Picker](https://ark-ui.com/docs/react/components/date-picker)
- [Dialog](https://ark-ui.com/docs/react/components/dialog)
- [Editable](https://ark-ui.com/docs/react/components/editable)
- [Hover Card](https://ark-ui.com/docs/react/components/hover-card)
- [Menu](https://ark-ui.com/docs/react/components/menu)
- [Number Input](https://ark-ui.com/docs/react/components/number-input)
- [Pagination](https://ark-ui.com/docs/react/components/pagination)
- [Pin Input](https://ark-ui.com/docs/react/components/pin-input)
- [Popover](https://ark-ui.com/docs/react/components/popover)
- [Pressable](https://ark-ui.com/docs/react/components/pressable)
- [Radio Group](https://ark-ui.com/docs/react/components/radio-group)
- [Range Slider](https://ark-ui.com/docs/react/components/range-slider)
- [Rating Group](https://ark-ui.com/docs/react/components/rating-group)
- [Segment Group](https://ark-ui.com/docs/react/components/segment-group)
- [Select](https://ark-ui.com/docs/react/components/select)
- [Slider](https://ark-ui.com/docs/react/components/slider)
- [Splitter](https://ark-ui.com/docs/react/components/splitter)
- [Switch](https://ark-ui.com/docs/react/components/switch)
- [Tabs](https://ark-ui.com/docs/react/components/tabs)
- [Tags Input](https://ark-ui.com/docs/react/components/tags-input)
- [Toast](https://ark-ui.com/docs/react/components/toast)
- [Tooltip](https://ark-ui.com/docs/react/components/tooltip)

## Installation

To install `@ark-ui/react`, run the following command:

```bash
npm install @ark-ui/react
```

or with yarn:

```bash
yarn add @ark-ui/react
```

## Usage

To use a component from `@ark-ui/react`, import it and include it in your application:

```tsx
import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderOutput,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from '@ark-ui/react'
import { useState } from 'react'

export const MySlider = () => {
  const [value, setValue] = useState(30)

  return (
    <Slider min={-50} max={50} value={value} onChange={(e) => setValue(e.value)}>
      <SliderLabel>Label</SliderLabel>
      <SliderOutput>{value}</SliderOutput>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </SliderControl>
    </Slider>
  )
}
```

## Documentation

For more detailed documentation and examples, please visit the [official documentation](https://ark-ui.com/).

## Contribution

We welcome contributions to `@ark-ui/react`. Please read our [contributing guidelines](https://github.com/chakra-ui/ark/blob/main/CONTRIBUTING.md) for more information on how to contribute.

## Licence

This project is licensed under the terms of the [MIT license](https://github.com/chakra-ui/ark/blob/main/LICENSE).

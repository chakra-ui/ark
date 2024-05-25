# Welcome to Ark UI

Ark UI is a headless, open-source UI library with over 30+ components designed for building
reusable, scalable Design Systems. It supports a wide range of JavaScript frameworks, offering
dedciated packages for each supported framework.

## Supported Frameworks

Ark UI is available for the following JavaScript frameworks:

- **React**: `@ark-ui/react`
- **Solid**: `@ark-ui/solid`
- **Vue**: `@ark-ui/vue`

## Available Components

- [Accordion](https://ark-ui.com/docs/components/accordion)
- [Avatar](https://ark-ui.com/docs/components/avatar)
- [Carousel](https://ark-ui.com/docs/components/carousel)
- [Checkbox](https://ark-ui.com/docs/components/checkbox)
- [Color Picker](https://ark-ui.com/docs/components/color-picker)
- [Combobox](https://ark-ui.com/docs/components/combobox)
- [Date Picker](https://ark-ui.com/docs/components/date-picker)
- [Dialog](https://ark-ui.com/docs/components/dialog)
- [Editable](https://ark-ui.com/docs/components/editable)
- [File Upload](https://ark-ui.com/docs/components/file-upload)
- [Hover Card](https://ark-ui.com/docs/components/hover-card)
- [Menu](https://ark-ui.com/docs/components/menu)
- [Number Input](https://ark-ui.com/docs/components/number-input)
- [Pagination](https://ark-ui.com/docs/components/pagination)
- [Pin Input](https://ark-ui.com/docs/components/pin-input)
- [Popover](https://ark-ui.com/docs/components/popover)
- [Progress](https://ark-ui.com/docs/components/progress)
- [Radio Group](https://ark-ui.com/docs/components/radio-group)
- [Range Slider](https://ark-ui.com/docs/components/slider)
- [Rating Group](https://ark-ui.com/docs/components/rating-group)
- [Segment Group](https://ark-ui.com/docs/components/segment-group)
- [Select](https://ark-ui.com/docs/components/select)
- [Slider](https://ark-ui.com/docs/components/slider)
- [Splitter](https://ark-ui.com/docs/components/splitter)
- [Switch](https://ark-ui.com/docs/components/switch)
- [Tabs](https://ark-ui.com/docs/components/tabs)
- [Tags Input](https://ark-ui.com/docs/components/tags-input)
- [Toast](https://ark-ui.com/docs/components/toast)
- [Toggle Group](https://ark-ui.com/docs/components/toggle-group)
- [Tooltip](https://ark-ui.com/docs/components/tooltip)
- [Tree View](https://ark-ui.com/docs/components/tree-view)

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
import { Slider, type SliderProps } from '@ark-ui/solid'
import { createSignal } from 'solid-js'

export const MySlider = (props: SliderProps) => {
  const [value, setValue] = createSignal([42])

  return (
    <Slider.Root
      min={0}
      max={100}
      value={value()}
      onValueChange={(e) => setValue(e.value)}
      {...props}
    >
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} />
      </Slider.Control>
      <Slider.MarkerGroup>
        <Slider.Marker value={25}>25</Slider.Marker>
        <Slider.Marker value={50}>50</Slider.Marker>
        <Slider.Marker value={75}>75</Slider.Marker>
      </Slider.MarkerGroup>
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

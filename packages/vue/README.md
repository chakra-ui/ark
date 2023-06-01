# @ark-ui/vue

`@ark-ui/vue` is an open-source UI component library designed to make building high-quality, accessible web applications easier. The library focuses on providing low-level UI components with an emphasis on accessibility, customization, and developer experience.

## Key Features

- **Accessible**: Components in Ark UI are designed with accessibility in mind, adhering to WAI-ARIA design patterns and handling implementation details such as aria and role attributes, focus management, and keyboard navigation.
- **Headless**: Components are shipped without styles, giving developers full control over styling.
- **Customizable**: The open component architecture allows for customization and customization, providing granular access to each component part.
- **Powered by state machines**: Predictable, simplified, and robust component behavior.
- **Developer Experience**: The library provides a fully-typed API with a consistent and predictable experience.

## Available Components

At the moment, `@ark-ui/vue`offers the following components:

- [Accordion](https://ark-ui.com/docs/vue/components/accordion)
- [Carousel](https://ark-ui.com/docs/vue/components/carousel)
- [Checkbox](https://ark-ui.com/docs/vue/components/checkbox)
- [Color Picker](https://ark-ui.com/docs/vue/components/color-picker)
- [Combobox](https://ark-ui.com/docs/vue/components/combobox)
- [Dialog](https://ark-ui.com/docs/vue/components/dialog)
- [Editable](https://ark-ui.com/docs/vue/components/editable)
- [Hover Card](https://ark-ui.com/docs/vue/components/hover-card)
- [Menu](https://ark-ui.com/docs/vue/components/menu)
- [Number Input](https://ark-ui.com/docs/vue/components/number-input)
- [Pagination](https://ark-ui.com/docs/vue/components/pagination)
- [Pin Input](https://ark-ui.com/docs/vue/components/pin-input)
- [Popover](https://ark-ui.com/docs/vue/components/popover)
- [Pressable](https://ark-ui.com/docs/vue/components/pressable)
- [Radio Group](https://ark-ui.com/docs/vue/components/radio-group)
- [Range Slider](https://ark-ui.com/docs/vue/components/range-slider)
- [Rating Group](https://ark-ui.com/docs/vue/components/rating-group)
- [Select](https://ark-ui.com/docs/vue/components/select)
- [Slider](https://ark-ui.com/docs/vue/components/slider)
- [Splitter](https://ark-ui.com/docs/vue/components/splitter)
- [Tabs](https://ark-ui.com/docs/vue/components/tabs)
- [Tags Input](https://ark-ui.com/docs/vue/components/tags-input)
- [Toast](https://ark-ui.com/docs/vue/components/toast)
- [Tooltip](https://ark-ui.com/docs/vue/components/tooltip)

## Installation

To install `@ark-ui/vue`, run the following command:

```bash
npm install @ark-ui/vue
```

or with yarn:

```bash
yarn add @ark-ui/vue
```

## Usage

To use a component from `@ark-ui/vue`, import it and include it in your application:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderOutput,
  SliderRange,
  SliderThumb,
  SliderTrack,
  type SliderProps,
} from '@ark-ui/vue'

const sliderValue = ref<SliderProps['modelValue']>(30)
</script>
<template>
  <Slider :min="-50" :max="50" v-model="sliderValue">
    <SliderLabel>Label</SliderLabel>
    <SliderOutput>{{ sliderValue }}</SliderOutput>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb />
    </SliderControl>
  </Slider>
</template>
```

## Documentation

For more detailed documentation and examples, please visit the [official documentation](https://ark-ui.com/).

## Contribution

We welcome contributions to `@ark-ui/vue`. Please read our [contributing guidelines](https://github.com/chakra-ui/ark/blob/main/CONTRIBUTING.md) for more information on how to contribute.

## Licence

This project is licensed under the terms of the [MIT license](https://github.com/chakra-ui/ark/blob/main/LICENSE).

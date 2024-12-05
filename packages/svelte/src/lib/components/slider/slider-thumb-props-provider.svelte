<script lang="ts">
  import type { ThumbProps } from '@zag-js/slider'
  import { SliderThumbPropsProvider } from './use-slider-thumb-props-context'

  export let value: ThumbProps
  SliderThumbPropsProvider(value)
</script>

<slot /> 

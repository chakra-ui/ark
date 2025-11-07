<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { ThumbProps } from '@zag-js/slider'

  export interface SliderThumbPropsProviderProps {
    value: ThumbProps
    children?: Snippet
  }
</script>

<script lang="ts">
  import { SliderThumbPropsProvider } from './use-slider-thumb-props-context'

  let { value, children }: SliderThumbPropsProviderProps = $props()
  SliderThumbPropsProvider(value)
</script>

{@render children?.()}

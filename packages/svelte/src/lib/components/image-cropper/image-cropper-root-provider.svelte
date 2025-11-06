<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseImageCropperReturn } from './use-image-cropper.svelte'

  interface RootProviderProps {
    value: UseImageCropperReturn
  }

  export interface ImageCropperRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface ImageCropperRootProviderProps extends ImageCropperRootProviderBaseProps {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { ImageCropperProvider } from './use-image-cropper-context'
  import { Ark } from '../factory'

  let { ref = $bindable(null), value, ...props }: ImageCropperRootProviderProps = $props()

  ImageCropperProvider(value)
  const mergedProps = $derived(mergeProps(value().getRootProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />

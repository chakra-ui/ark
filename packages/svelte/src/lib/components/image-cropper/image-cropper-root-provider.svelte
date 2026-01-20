<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseImageCropperReturn } from './use-image-cropper.svelte'

  export interface ImageCropperRootProviderBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    value: UseImageCropperReturn
  }
  export interface ImageCropperRootProviderProps
    extends Assign<HTMLProps<'div'>, ImageCropperRootProviderBaseProps> {}
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

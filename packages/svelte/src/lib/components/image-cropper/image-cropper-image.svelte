<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ImageCropperImageBaseProps extends PolymorphicProps<'img'>, RefAttribute {}
  export interface ImageCropperImageProps extends Assign<HTMLProps<'img'>, ImageCropperImageBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useImageCropperContext } from './use-image-cropper-context'

  let { ref = $bindable(null), ...props }: ImageCropperImageProps = $props()
  const imageCropper = useImageCropperContext()
  const mergedProps = $derived(mergeProps(imageCropper().getImageProps(), props))
</script>

<Ark as="img" bind:ref {...mergedProps} />

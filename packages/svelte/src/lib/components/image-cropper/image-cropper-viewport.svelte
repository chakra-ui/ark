<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ImageCropperViewportBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ImageCropperViewportProps extends Assign<HTMLProps<'div'>, ImageCropperViewportBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useImageCropperContext } from './use-image-cropper-context'

  let { ref = $bindable(null), ...props }: ImageCropperViewportProps = $props()
  const imageCropper = useImageCropperContext()
  const mergedProps = $derived(mergeProps(imageCropper().getViewportProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />

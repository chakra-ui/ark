<script module lang="ts">
  import type { SelectionState } from '@zag-js/image-cropper'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ImageCropperSelectionState extends SelectionState {}
  export interface ImageCropperSelectionBaseProps
    extends PolymorphicProps<'div', ImageCropperSelectionState>, RefAttribute {}
  export interface ImageCropperSelectionProps extends Assign<HTMLProps<'div'>, ImageCropperSelectionBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useImageCropperContext } from './use-image-cropper-context.ts'

  let { ref = $bindable(null), ...props }: ImageCropperSelectionProps = $props()
  const imageCropper = useImageCropperContext()
  const mergedProps = $derived(mergeProps(imageCropper().getSelectionProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} state={imageCropper().getSelectionState()} />

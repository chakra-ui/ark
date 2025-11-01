<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseImageCropperProps } from './use-image-cropper.svelte'

  export interface ImageCropperRootBaseProps extends UseImageCropperProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface ImageCropperRootProps extends Assign<HTMLProps<'div'>, ImageCropperRootBaseProps> {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { ImageCropperProvider } from './use-image-cropper-context'
  import { useImageCropper } from './use-image-cropper.svelte'

  let {
    ref = $bindable(null),
    zoom = $bindable(),
    rotation = $bindable(),
    flip = $bindable(),
    ...props
  }: ImageCropperRootProps = $props()
  const providedId = $props.id()

  const [useImageCropperProps, localProps] = $derived(
    createSplitProps<UseImageCropperProps>()(props, [
      'aspectRatio',
      'cropShape',
      'defaultFlip',
      'defaultRotation',
      'defaultZoom',
      'fixedCropArea',
      'flip',
      'id',
      'ids',
      'initialCrop',
      'maxHeight',
      'maxWidth',
      'maxZoom',
      'minHeight',
      'minWidth',
      'minZoom',
      'nudgeStep',
      'nudgeStepCtrl',
      'nudgeStepShift',
      'onCropChange',
      'onFlipChange',
      'onRotationChange',
      'onZoomChange',
      'rotation',
      'translations',
      'zoom',
      'zoomSensitivity',
      'zoomStep',
    ]),
  )

  const resolvedProps = $derived<UseImageCropperProps>({
    ...useImageCropperProps,
    id: useImageCropperProps.id ?? providedId,
    zoom,
    rotation,
    flip,
    onZoomChange(details) {
      useImageCropperProps.onZoomChange?.(details)
      if (zoom !== undefined) zoom = details.zoom
    },
    onRotationChange(details) {
      useImageCropperProps.onRotationChange?.(details)
      if (rotation !== undefined) rotation = details.rotation
    },
    onFlipChange(details) {
      useImageCropperProps.onFlipChange?.(details)
      if (flip !== undefined) flip = details.flip
    },
  })

  const imageCropper = useImageCropper(() => resolvedProps)
  const mergedProps = $derived(mergeProps(imageCropper().getRootProps(), localProps))

  ImageCropperProvider(imageCropper)
</script>

<Ark as="div" bind:ref {...mergedProps} />

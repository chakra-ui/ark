<script module lang="ts">
  import type { HandleProps } from '@zag-js/image-cropper'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ImageCropperHandleBaseProps extends PolymorphicProps<'div'>, RefAttribute, HandleProps {}
  export interface ImageCropperHandleProps extends Assign<HTMLProps<'div'>, ImageCropperHandleBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.ts'
  import { Ark } from '../factory/index.ts'
  import { useImageCropperContext } from './use-image-cropper-context.ts'

  let { ref = $bindable(null), ...props }: ImageCropperHandleProps = $props()
  const imageCropper = useImageCropperContext()

  const [handleProps, localProps] = $derived(createSplitProps<HandleProps>()(props, ['position']))

  const mergedProps = $derived(mergeProps(imageCropper().getHandleProps(handleProps), localProps))
</script>

<Ark as="div" bind:ref {...mergedProps} />

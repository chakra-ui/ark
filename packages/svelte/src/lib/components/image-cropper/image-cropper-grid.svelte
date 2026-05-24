<script module lang="ts">
  import type { GridProps } from '@zag-js/image-cropper'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ImageCropperGridBaseProps extends PolymorphicProps<'div'>, RefAttribute, GridProps {}
  export interface ImageCropperGridProps extends Assign<HTMLProps<'div'>, ImageCropperGridBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.ts'
  import { Ark } from '../factory/index.ts'
  import { useImageCropperContext } from './use-image-cropper-context.ts'

  let { ref = $bindable(null), ...props }: ImageCropperGridProps = $props()
  const imageCropper = useImageCropperContext()

  const [gridProps, localProps] = $derived(createSplitProps<GridProps>()(props, ['axis']))

  const mergedProps = $derived(mergeProps(imageCropper().getGridProps(gridProps), localProps))
</script>

<Ark as="div" bind:ref {...mergedProps} />

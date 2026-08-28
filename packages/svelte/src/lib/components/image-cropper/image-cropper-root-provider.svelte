<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseImageCropperReturn } from './use-image-cropper.svelte.ts'

  export interface ImageCropperRootProviderBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    value: UseImageCropperReturn
  }
  export interface ImageCropperRootProviderProps extends Assign<HTMLProps<'div'>, ImageCropperRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { ImageCropperProvider } from './use-image-cropper-context.ts'
  import { Ark } from '../factory/index.ts'

  let { ref = $bindable(null), value, ...props }: ImageCropperRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  ImageCropperProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} />

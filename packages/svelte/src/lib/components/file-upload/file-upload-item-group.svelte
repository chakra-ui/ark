<script module lang="ts">
  import type { ItemGroupProps } from '@zag-js/file-upload'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FileUploadItemGroupBaseProps extends PolymorphicProps<'div'>, RefAttribute, ItemGroupProps {}
  export interface FileUploadItemGroupProps extends Assign<HTMLProps<'div'>, FileUploadItemGroupBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFileUploadContext } from './use-file-upload-context'
  import { FileUploadItemGroupPropsProvider } from './use-file-upload-item-group-props-context'
  import { createSplitProps } from '../../utils/create-split-props'

  let { ref = $bindable(null), ...props }: FileUploadItemGroupProps = $props()
  const fileUpload = useFileUploadContext()

  const [itemGroupProps, localProps] = $derived(createSplitProps<ItemGroupProps>()(props, ['type']))
  const mergedProps = $derived(mergeProps(fileUpload().getItemGroupProps(itemGroupProps), localProps))

  FileUploadItemGroupPropsProvider(() => itemGroupProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />

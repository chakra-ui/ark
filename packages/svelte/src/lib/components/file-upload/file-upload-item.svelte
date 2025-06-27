<script module lang="ts">
  import type { ItemProps } from '@zag-js/file-upload'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FileUploadItemBaseProps extends ItemProps, PolymorphicProps<'li'>, RefAttribute {}
  export interface FileUploadItemProps extends Assign<HTMLProps<'li'>, FileUploadItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { useFileUploadContext } from './use-file-upload-context'
  import { FileUploadItemPropsProvider } from './use-file-upload-item-props-context'

  let { ref = $bindable(null), ...props }: FileUploadItemProps = $props()
  const fileUpload = useFileUploadContext()

  const [itemProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['file']))

  const mergedProps = $derived(mergeProps(fileUpload().getItemProps(itemProps), localProps))

  FileUploadItemPropsProvider(() => itemProps)
</script>

<Ark as="li" bind:ref {...mergedProps} />

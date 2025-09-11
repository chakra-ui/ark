<script module lang="ts">
  import type { ItemProps } from '@zag-js/file-upload'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  type ItemBaseProps = Omit<ItemProps, 'type'>

  export interface FileUploadItemBaseProps extends ItemBaseProps, PolymorphicProps<'li'>, RefAttribute {}
  export interface FileUploadItemProps extends Assign<HTMLProps<'li'>, FileUploadItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { useFileUploadContext } from './use-file-upload-context'
  import { FileUploadItemPropsProvider } from './use-file-upload-item-props-context'
  import { useFileUploadItemGroupPropsContext } from './use-file-upload-item-group-props-context'

  let { ref = $bindable(null), ...props }: FileUploadItemProps = $props()
  const fileUpload = useFileUploadContext()

  const [itemProps, localProps] = $derived(createSplitProps<ItemBaseProps>()(props, ['file']))

  const itemGroupProps = useFileUploadItemGroupPropsContext()
  const itemPropsWithType = $derived({ ...itemProps, type: itemGroupProps().type })

  const mergedProps = $derived(mergeProps(fileUpload().getItemProps(itemPropsWithType), localProps))

  FileUploadItemPropsProvider(() => itemPropsWithType)
</script>

<Ark as="li" bind:ref {...mergedProps} />

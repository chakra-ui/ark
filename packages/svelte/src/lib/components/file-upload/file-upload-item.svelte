<script module lang="ts">
  import type { ItemProps, ItemState } from '@zag-js/file-upload'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  type ItemBaseProps = Omit<ItemProps, 'type'>

  export interface FileUploadItemState extends ItemState {}
  export interface FileUploadItemBaseProps
    extends ItemBaseProps, PolymorphicProps<'li', FileUploadItemState>, RefAttribute {}
  export interface FileUploadItemProps extends Assign<HTMLProps<'li'>, FileUploadItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.ts'
  import { Ark } from '../factory/index.ts'
  import { useFileUploadContext } from './use-file-upload-context.ts'
  import { FileUploadItemPropsProvider } from './use-file-upload-item-props-context.ts'
  import { useFileUploadItemGroupPropsContext } from './use-file-upload-item-group-props-context.ts'

  let { ref = $bindable(null), ...props }: FileUploadItemProps = $props()
  const fileUpload = useFileUploadContext()

  const [itemProps, localProps] = $derived(createSplitProps<ItemBaseProps>()(props, ['file']))

  const itemGroupProps = useFileUploadItemGroupPropsContext()
  const itemPropsWithType = $derived({ ...itemProps, type: itemGroupProps().type })

  const mergedProps = $derived(mergeProps(fileUpload().getItemProps(itemPropsWithType), localProps))

  FileUploadItemPropsProvider(() => itemPropsWithType)
</script>

<Ark as="li" bind:ref {...mergedProps} state={fileUpload().getItemState(itemPropsWithType)} />

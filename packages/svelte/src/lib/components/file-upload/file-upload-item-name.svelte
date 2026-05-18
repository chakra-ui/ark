<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FileUploadItemNameBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface FileUploadItemNameProps extends Assign<HTMLProps<'div'>, FileUploadItemNameBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useFileUploadContext } from './use-file-upload-context.ts'
  import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context.ts'

  let { ref = $bindable(null), ...props }: FileUploadItemNameProps = $props()
  const fileUpload = useFileUploadContext()
  const itemProps = useFileUploadItemPropsContext()
  const mergedProps = $derived(mergeProps(fileUpload().getItemNameProps(itemProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps}>
  {#if props.children}
    {@render props.children?.()}
  {:else}
    {itemProps().file.name}
  {/if}
</Ark>

<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FileUploadHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface FileUploadHiddenInputProps extends Assign<HTMLProps<'input'>, FileUploadHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useFieldContext } from '../field/index.ts'
  import { useFileUploadContext } from './use-file-upload-context.ts'

  let { ref = $bindable(null), ...props }: FileUploadHiddenInputProps = $props()
  const fileUpload = useFileUploadContext()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(fileUpload().getHiddenInputProps(), props))
</script>

<Ark as="input" bind:ref aria-describedby={field?.()?.ariaDescribedby} {...mergedProps} />

<script lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import { Ark } from '../factory'
  import { type UseDownloadProps, useDownload } from './use-download.svelte'

  export type { DownloadableData, MaybePromise } from './use-download.svelte'

  export interface DownloadTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute, UseDownloadProps {}

  export interface DownloadTriggerProps extends Assign<HTMLProps<'button'>, DownloadTriggerBaseProps> {}

  let { ref = $bindable(null), fileName, data, mimeType, onclick, ...restProps }: DownloadTriggerProps = $props()

  const { download } = useDownload(() => ({ fileName, mimeType, data }))

  const handleClick = (e: MouseEvent & { currentTarget: HTMLButtonElement }) => {
    onclick?.(e)
    if (e.defaultPrevented) return
    download()
  }
</script>

<Ark as="button" bind:ref {...restProps} type="button" onclick={handleClick} />

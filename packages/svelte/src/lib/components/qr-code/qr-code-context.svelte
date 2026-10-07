<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseQrCodeContext } from './use-qr-code-context.ts'

  export interface QrCodeContextProps {
    render?: Snippet<[UseQrCodeContext]>
    /**
     * @deprecated Use `render` instead.
     */
    api?: Snippet<[UseQrCodeContext]>
  }
</script>

<script lang="ts">
  import { useQrCodeContext } from './use-qr-code-context.ts'

  const { render, api }: QrCodeContextProps = $props()
  const qrCode = useQrCodeContext()
</script>

{@render (render ?? api)?.(qrCode)}

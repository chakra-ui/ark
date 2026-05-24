<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseQrCodeContext } from './use-qr-code-context.ts'

  export interface QrCodeContextProps {
    api?: Snippet<[UseQrCodeContext]>
  }
</script>

<script lang="ts">
  import { useQrCodeContext } from './use-qr-code-context.ts'

  const { api }: QrCodeContextProps = $props()
  const qrCode = useQrCodeContext()
</script>

{@render api?.(qrCode)}

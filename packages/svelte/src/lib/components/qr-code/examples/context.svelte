<script lang="ts">
  import { QrCode } from '@ark-ui/svelte/qr-code'
  import type { UseQrCodeContext } from '@ark-ui/svelte/qr-code'
</script>

<QrCode.Root value="http://ark-ui.com">
  <QrCode.Context>
    {#snippet api(qrCode: UseQrCodeContext)}
      <QrCode.Frame>
        {#if qrCode().value === 'http://ark-ui.com'}
          <QrCode.Pattern />
        {:else}
          <p>Loading...</p>
        {/if}
      </QrCode.Frame>
    {/snippet}
  </QrCode.Context>
</QrCode.Root>

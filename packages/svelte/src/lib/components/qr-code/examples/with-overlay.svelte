<script lang="ts">
  import { QrCode } from '@ark-ui/svelte/qr-code'
</script>

<QrCode.Root value="http://ark-ui.com" encoding={{ ecc: 'H' }}>
  <QrCode.Frame>
    <QrCode.Pattern />
  </QrCode.Frame>
  <QrCode.Overlay>
    <img src="https://ark-ui.com/icon-192.png" alt="Ark UI Logo" />
  </QrCode.Overlay>
</QrCode.Root>

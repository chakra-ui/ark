<script lang="ts">
  import { QrCode } from '@ark-ui/svelte/qr-code'
</script>

<QrCode.Root defaultValue="http://ark-ui.com" encoding={{ ecc: 'H' }}>
  <QrCode.Frame>
    <QrCode.Pattern />
  </QrCode.Frame>
</QrCode.Root>

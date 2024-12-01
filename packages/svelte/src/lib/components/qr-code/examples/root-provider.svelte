<script lang="ts">
  import { QrCode, useQrCode } from '@ark-ui/svelte/qr-code'

  const qrCode = useQrCode({ value: 'http://ark-ui.com' })

  const setValue = () => qrCode().setValue('https://ark-ui.com')
</script>

<button onclick={setValue}>Set Value</button>

<QrCode.RootProvider value={qrCode}>
  <QrCode.Frame>
    <QrCode.Pattern />
  </QrCode.Frame>
</QrCode.RootProvider>

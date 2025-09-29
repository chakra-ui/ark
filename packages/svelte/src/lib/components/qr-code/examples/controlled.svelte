<script lang="ts">
  import { QrCode } from '@ark-ui/svelte/qr-code'

  let value = $state('http://ark-ui.com')
</script>

<QrCode.Root bind:value>
  <QrCode.Frame>
    <QrCode.Pattern />
  </QrCode.Frame>
  <QrCode.DownloadTrigger fileName="qr-code.png" mimeType="image/png">Download</QrCode.DownloadTrigger>
</QrCode.Root>

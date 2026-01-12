<script lang="ts">
  import { QrCode, useQrCode } from '@ark-ui/svelte/qr-code'
  import styles from 'styles/qr-code.module.css'

  const id = $props.id()
  const qrCode = useQrCode({ id, value: 'http://ark-ui.com' })
</script>

<div class="stack">
  <QrCode.RootProvider class={styles.Root} value={qrCode}>
    <QrCode.Frame class={styles.Frame}>
      <QrCode.Pattern class={styles.Pattern} />
    </QrCode.Frame>
  </QrCode.RootProvider>
  <output>{qrCode().value}</output>
</div>

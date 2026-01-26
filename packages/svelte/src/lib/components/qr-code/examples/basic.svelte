<script lang="ts">
  import { QrCode } from '@ark-ui/svelte/qr-code'
  import styles from 'styles/qr-code.module.css'
</script>

<QrCode.Root class={styles.Root} defaultValue="http://ark-ui.com">
  <QrCode.Frame class={styles.Frame}>
    <QrCode.Pattern class={styles.Pattern} />
  </QrCode.Frame>
</QrCode.Root>

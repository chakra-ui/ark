<script lang="ts">
  import { DownloadTrigger } from '@ark-ui/svelte/download-trigger'
  import { DownloadIcon, ImageIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/download-trigger.module.css'

  const fetchImage = async () => {
    const response = await fetch('https://picsum.photos/200/300')
    return response.blob()
  }
</script>

<div class={styles.Root}>
  <div class={styles.Preview}>
    <ImageIcon />
    <span class={styles.PreviewText}>random-image.jpg (fetched on download)</span>
  </div>
  <DownloadTrigger class={button.Root} data={fetchImage} fileName="random-image.jpg" mimeType="image/jpeg">
    <DownloadIcon /> Download Image
  </DownloadTrigger>
</div>

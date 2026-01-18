<script lang="ts">
  import { DownloadTrigger } from '@ark-ui/svelte/download-trigger'
  import { DownloadIcon, FileIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/download-trigger.module.css'

  const content = 'Hello, World! This is a sample text file.'
</script>

<div class={styles.Root}>
  <div class={styles.Preview}>
    <FileIcon />
    <span class={styles.PreviewText}>{content}</span>
  </div>
  <DownloadTrigger class={button.Root} data={content} fileName="hello.txt" mimeType="text/plain">
    <DownloadIcon /> Download txt
  </DownloadTrigger>
</div>

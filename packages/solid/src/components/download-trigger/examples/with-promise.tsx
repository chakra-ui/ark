import { DownloadTrigger } from '@ark-ui/solid/download-trigger'
import { DownloadIcon, ImageIcon } from 'lucide-solid'
import button from 'styles/button.module.css'
import styles from 'styles/download-trigger.module.css'

export const WithPromise = () => {
  const fetchImage = async () => {
    const response = await fetch('https://picsum.photos/200/300')
    return response.blob()
  }

  return (
    <div class={styles.Root}>
      <div class={styles.Preview}>
        <ImageIcon />
        <span class={styles.PreviewText}>random-image.jpg (fetched on download)</span>
      </div>
      <DownloadTrigger class={button.Root} data={fetchImage} fileName="random-image.jpg" mimeType="image/jpeg">
        <DownloadIcon /> Download Image
      </DownloadTrigger>
    </div>
  )
}

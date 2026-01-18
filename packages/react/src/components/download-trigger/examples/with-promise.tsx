import { DownloadTrigger } from '@ark-ui/react/download-trigger'
import { DownloadIcon, ImageIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/download-trigger.module.css'

export const WithPromise = () => {
  const fetchImage = async () => {
    const response = await fetch('https://picsum.photos/200/300')
    return response.blob()
  }

  return (
    <div className={styles.Root}>
      <div className={styles.Preview}>
        <ImageIcon />
        <span className={styles.PreviewText}>random-image.jpg (fetched on download)</span>
      </div>
      <DownloadTrigger className={button.Root} data={fetchImage} fileName="random-image.jpg" mimeType="image/jpeg">
        <DownloadIcon /> Download Image
      </DownloadTrigger>
    </div>
  )
}

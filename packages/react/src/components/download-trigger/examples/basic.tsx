import { DownloadTrigger } from '@ark-ui/react/download-trigger'
import { DownloadIcon, FileIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/download-trigger.module.css'

const content = 'Hello, World! This is a sample text file.'

export const Basic = () => {
  return (
    <div className={styles.Root}>
      <div className={styles.Preview}>
        <FileIcon />
        <span className={styles.PreviewText}>{content}</span>
      </div>
      <DownloadTrigger className={button.Root} data={content} fileName="hello.txt" mimeType="text/plain">
        <DownloadIcon /> Download txt
      </DownloadTrigger>
    </div>
  )
}

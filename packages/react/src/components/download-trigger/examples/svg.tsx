import { DownloadTrigger } from '@ark-ui/react/download-trigger'
import { DownloadIcon, FileIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/download-trigger.module.css'

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/>
</svg>`

export const Svg = () => {
  return (
    <div className={styles.Root}>
      <div className={styles.Preview}>
        <FileIcon />
        <span className={styles.PreviewText}>circle.svg</span>
      </div>
      <DownloadTrigger className={button.Root} data={svgContent} fileName="circle.svg" mimeType="image/svg+xml">
        <DownloadIcon /> Download SVG
      </DownloadTrigger>
    </div>
  )
}

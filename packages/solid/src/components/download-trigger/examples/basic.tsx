import { DownloadTrigger } from '@ark-ui/solid/download-trigger'

export const Basic = () => {
  return (
    <DownloadTrigger data="Hello world" fileName="hello.txt" mimeType="text/plain">
      Download txt
    </DownloadTrigger>
  )
}

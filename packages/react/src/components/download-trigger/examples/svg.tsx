import { DownloadTrigger } from '@ark-ui/react/download-trigger'

export const Svg = () => {
  return (
    <DownloadTrigger
      data='<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/></svg>'
      fileName="circle.svg"
      mimeType="image/svg+xml"
    >
      Download SVG
    </DownloadTrigger>
  )
}

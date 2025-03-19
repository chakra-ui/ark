import { DownloadTrigger } from '@ark-ui/react/download-trigger'

export const WithPromise = () => {
  const fetchImage = async () => {
    const response = await fetch('https://picsum.photos/200/300')
    return response.blob()
  }

  return (
    <DownloadTrigger data={fetchImage} fileName="random-image.jpg" mimeType="image/jpeg">
      Download Image
    </DownloadTrigger>
  )
}

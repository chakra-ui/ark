<script lang="ts">
  import { DownloadTrigger } from '@ark-ui/svelte/download-trigger'

  const fetchImage = async () => {
    const response = await fetch('https://picsum.photos/200/300')
    return response.blob()
  }
</script>

<DownloadTrigger data={fetchImage} fileName="random-image.jpg" mimeType="image/jpeg">Download Image</DownloadTrigger>

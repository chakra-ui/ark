<script setup lang="ts">
import { FileUpload, type FileUploadFileError } from '@ark-ui/vue/file-upload'

const errorMessages: Record<FileUploadFileError, string> = {
  TOO_MANY_FILES: '📊 Too many files selected (max 3 allowed)',
  FILE_INVALID_TYPE: '🚫 Invalid file type (only images and PDFs allowed)',
  FILE_TOO_LARGE: '📏 File too large (max 1MB)',
  FILE_TOO_SMALL: '📐 File too small (min 1KB)',
  FILE_INVALID: '⚠️ Invalid file',
  FILE_EXISTS: '🔄 File already exists',
}
</script>

<template>
  <FileUpload.Root :maxFiles="3" :maxFileSize="1024 * 1024" :minFileSize="1024" accept="image/*,application/pdf">
    <FileUpload.Label>File Upload with Validation</FileUpload.Label>
    <FileUpload.Trigger>Select Files</FileUpload.Trigger>

    <!-- Accepted Files Section -->
    <div data-status="accepted">
      <h3>✅ Accepted Files</h3>
      <FileUpload.ItemGroup>
        <FileUpload.Context v-slot="{ acceptedFiles }">
          <div v-if="acceptedFiles.length === 0">No files uploaded yet</div>
          <FileUpload.Item
            v-else
            v-for="file in acceptedFiles"
            :file="file"
            :key="file.name"
            class="file-item"
            data-status="accepted"
          >
            <FileUpload.ItemPreview type="image/*">
              <FileUpload.ItemPreviewImage />
            </FileUpload.ItemPreview>
            <FileUpload.ItemPreview type="application/pdf">
              <div data-type="pdf">PDF</div>
            </FileUpload.ItemPreview>
            <FileUpload.ItemName />
            <FileUpload.ItemSizeText />
            <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
          </FileUpload.Item>
        </FileUpload.Context>
      </FileUpload.ItemGroup>
    </div>

    <!-- Rejected Files Section -->
    <div data-status="rejected">
      <h3>❌ Rejected Files</h3>
      <FileUpload.ItemGroup>
        <FileUpload.Context v-slot="{ rejectedFiles }">
          <div v-if="rejectedFiles.length === 0">No rejected files</div>
          <FileUpload.Item
            v-else
            v-for="fileRejection in rejectedFiles"
            :file="fileRejection.file"
            :key="fileRejection.file.name"
            class="file-item"
            data-status="rejected"
          >
            <FileUpload.ItemName />
            <FileUpload.ItemSizeText />
            <div>
              <strong>Validation Errors:</strong>
              <div v-for="(error, index) in fileRejection.errors" :key="index" :data-error-code="error">
                {{ errorMessages[error] || `❓ ${error}` }}
              </div>
            </div>
          </FileUpload.Item>
        </FileUpload.Context>
      </FileUpload.ItemGroup>
    </div>

    <FileUpload.HiddenInput />
  </FileUpload.Root>
</template>

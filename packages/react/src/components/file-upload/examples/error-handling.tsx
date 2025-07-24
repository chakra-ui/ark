import { FileUpload, type FileUploadFileError } from '@ark-ui/react/file-upload'

const errorMessages: Record<FileUploadFileError, string> = {
  TOO_MANY_FILES: '📊 Too many files selected (max 3 allowed)',
  FILE_INVALID_TYPE: '🚫 Invalid file type (only images and PDFs allowed)',
  FILE_TOO_LARGE: '📏 File too large (max 1MB)',
  FILE_TOO_SMALL: '📐 File too small (min 1KB)',
  FILE_INVALID: '⚠️ Invalid file',
  FILE_EXISTS: '🔄 File already exists',
}

export const ErrorHandling = () => {
  return (
    <FileUpload.Root
      maxFiles={3}
      maxFileSize={1024 * 1024} // 1MB
      minFileSize={1024} // 1KB
      accept="image/*,application/pdf"
    >
      <FileUpload.Label>File Upload with Validation</FileUpload.Label>
      <FileUpload.Trigger>Select Files</FileUpload.Trigger>

      {/* Accepted Files Section */}
      <div data-status="accepted">
        <h3>✅ Accepted Files</h3>
        <FileUpload.ItemGroup>
          <FileUpload.Context>
            {({ acceptedFiles }) =>
              acceptedFiles.length === 0 ? (
                <div>No files uploaded yet</div>
              ) : (
                acceptedFiles.map((file) => (
                  <FileUpload.Item key={file.name} file={file} className="file-item" data-status="accepted">
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
                ))
              )
            }
          </FileUpload.Context>
        </FileUpload.ItemGroup>
      </div>

      {/* Rejected Files Section */}
      <div data-status="rejected">
        <h3>❌ Rejected Files</h3>
        <FileUpload.ItemGroup>
          <FileUpload.Context>
            {({ rejectedFiles }) =>
              rejectedFiles.length === 0 ? (
                <div>No rejected files</div>
              ) : (
                rejectedFiles.map((fileRejection) => (
                  <FileUpload.Item
                    key={fileRejection.file.name}
                    file={fileRejection.file}
                    className="file-item"
                    data-status="rejected"
                  >
                    <FileUpload.ItemName />
                    <FileUpload.ItemSizeText />
                    <div>
                      <strong>Validation Errors:</strong>
                      {fileRejection.errors.map((error, index) => (
                        <div key={index} data-error-code={error}>
                          {errorMessages[error as FileUploadFileError] || `❓ ${error}`}
                        </div>
                      ))}
                    </div>
                  </FileUpload.Item>
                ))
              )
            }
          </FileUpload.Context>
        </FileUpload.ItemGroup>
      </div>

      <FileUpload.HiddenInput />
    </FileUpload.Root>
  )
}

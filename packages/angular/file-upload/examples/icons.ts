import { ChangeDetectionStrategy, Component } from '@angular/core'

const iconHost = {
  '[attr.aria-hidden]': 'true',
} as const

@Component({
  selector: 'file-upload-alert-circle-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: iconHost,
  template: `
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  `,
})
export class FileUploadAlertCircleIcon {}

@Component({
  selector: 'file-upload-camera-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: iconHost,
  template: `
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  `,
})
export class FileUploadCameraIcon {}

@Component({
  selector: 'file-upload-check-circle-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: iconHost,
  template: `
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  `,
})
export class FileUploadCheckCircleIcon {}

@Component({
  selector: 'file-upload-clipboard-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: iconHost,
  template: `
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  `,
})
export class FileUploadClipboardIcon {}

@Component({
  selector: 'file-upload-file-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: iconHost,
  template: `
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  `,
})
export class FileUploadFileIcon {}

@Component({
  selector: 'file-upload-folder-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: iconHost,
  template: `
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      />
    </svg>
  `,
})
export class FileUploadFolderIcon {}

@Component({
  selector: 'file-upload-image-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: iconHost,
  template: `
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21" />
    </svg>
  `,
})
export class FileUploadImageIcon {}

@Component({
  selector: 'file-upload-paperclip-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: iconHost,
  template: `
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        d="m16 6-8.41 8.41a2 2 0 0 0 2.83 2.83L19 8.66a4 4 0 0 0-5.66-5.66L4.76 11.59a6 6 0 1 0 8.48 8.48L21 12.3"
      />
    </svg>
  `,
})
export class FileUploadPaperclipIcon {}

@Component({
  selector: 'file-upload-upload-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: iconHost,
  template: `
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 3v12" />
      <path d="m17 8-5-5-5 5" />
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    </svg>
  `,
})
export class FileUploadUploadIcon {}

@Component({
  selector: 'file-upload-x-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: iconHost,
  template: `
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  `,
})
export class FileUploadXIcon {}

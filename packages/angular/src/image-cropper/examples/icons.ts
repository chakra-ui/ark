import { ChangeDetectionStrategy, Component } from '@angular/core'

const imageCropperIconStyles = `
  :host {
    display: inline-flex;
    flex-shrink: 0;
    width: 1em;
    height: 1em;
    line-height: 1;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`

@Component({
  selector: 'image-cropper-crop-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [imageCropperIconStyles],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2v14a2 2 0 0 0 2 2h14" />
      <path d="M18 22V8a2 2 0 0 0-2-2H2" />
    </svg>
  `,
})
export class ImageCropperCropIcon {}

@Component({
  selector: 'image-cropper-flip-horizontal-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [imageCropperIconStyles],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m3 7 5 5-5 5V7" />
      <path d="m21 7-5 5 5 5V7" />
      <path d="M12 20v2" />
      <path d="M12 14v2" />
      <path d="M12 8v2" />
      <path d="M12 2v2" />
    </svg>
  `,
})
export class ImageCropperFlipHorizontalIcon {}

@Component({
  selector: 'image-cropper-flip-vertical-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [imageCropperIconStyles],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m17 3-5 5-5-5h10" />
      <path d="m17 21-5-5-5 5h10" />
      <path d="M4 12h2" />
      <path d="M10 12h4" />
      <path d="M18 12h2" />
    </svg>
  `,
})
export class ImageCropperFlipVerticalIcon {}

@Component({
  selector: 'image-cropper-rectangle-horizontal-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [imageCropperIconStyles],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect width="18" height="14" x="3" y="5" rx="2" />
    </svg>
  `,
})
export class ImageCropperRectangleHorizontalIcon {}

@Component({
  selector: 'image-cropper-rectangle-vertical-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [imageCropperIconStyles],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect width="14" height="18" x="5" y="3" rx="2" />
    </svg>
  `,
})
export class ImageCropperRectangleVerticalIcon {}

@Component({
  selector: 'image-cropper-refresh-cw-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [imageCropperIconStyles],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M3 12a9 9 0 0 1 15.74-5.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15.74 5.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  `,
})
export class ImageCropperRefreshCwIcon {}

@Component({
  selector: 'image-cropper-rotate-ccw-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [imageCropperIconStyles],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  `,
})
export class ImageCropperRotateCcwIcon {}

@Component({
  selector: 'image-cropper-rotate-cw-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [imageCropperIconStyles],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  `,
})
export class ImageCropperRotateCwIcon {}

@Component({
  selector: 'image-cropper-square-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [imageCropperIconStyles],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
    </svg>
  `,
})
export class ImageCropperSquareIcon {}

@Component({
  selector: 'image-cropper-zoom-in-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [imageCropperIconStyles],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
      <path d="M11 8v6" />
      <path d="M8 11h6" />
    </svg>
  `,
})
export class ImageCropperZoomInIcon {}

@Component({
  selector: 'image-cropper-zoom-out-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [imageCropperIconStyles],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
      <path d="M8 11h6" />
    </svg>
  `,
})
export class ImageCropperZoomOutIcon {}

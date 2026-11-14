// Stand-in for `lucide-solid`, which doesn't support Solid 2 yet. Examples keep importing from
// 'lucide-solid'; tsconfig, vitest and storybook alias that path here. Not part of the published package.
import type { JSX } from '@solidjs/web'
import * as lucide from 'lucide'
import type { IconNode } from 'lucide'
import { omit } from 'solid-js'

export interface LucideProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  size?: number | string
  strokeWidth?: number | string
  [key: `data-${string}`]: string | undefined
}

const toMarkup = (node: IconNode) =>
  node
    .map(([tag, attrs]) => {
      const props = Object.entries(attrs)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ')
      return `<${tag} ${props}></${tag}>`
    })
    .join('')

const toKebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

function createIcon(name: string, node: IconNode) {
  const markup = toMarkup(node)
  return (props: LucideProps) => {
    const rest = omit(props, 'size', 'strokeWidth', 'color', 'class')
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size ?? 24}
        height={props.size ?? 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke={props.color ?? 'currentColor'}
        stroke-width={props.strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
        class={['lucide', `lucide-${toKebab(name)}`, props.class]}
        aria-hidden="true"
        {...rest}
        innerHTML={markup}
      />
    )
  }
}

export const AccessibilityIcon = createIcon('Accessibility', lucide.Accessibility)
export const AlignCenterIcon = createIcon('AlignCenter', lucide.AlignCenter)
export const AlignJustifyIcon = createIcon('AlignJustify', lucide.AlignJustify)
export const AlignLeftIcon = createIcon('AlignLeft', lucide.AlignLeft)
export const AlignRightIcon = createIcon('AlignRight', lucide.AlignRight)
export const ArrowDownIcon = createIcon('ArrowDown', lucide.ArrowDown)
export const ArrowDownLeft = createIcon('ArrowDownLeft', lucide.ArrowDownLeft)
export const ArrowLeftIcon = createIcon('ArrowLeft', lucide.ArrowLeft)
export const ArrowLeftRightIcon = createIcon('ArrowLeftRight', lucide.ArrowLeftRight)
export const ArrowRightIcon = createIcon('ArrowRight', lucide.ArrowRight)
export const ArrowUpDownIcon = createIcon('ArrowUpDown', lucide.ArrowUpDown)
export const ArrowUpIcon = createIcon('ArrowUp', lucide.ArrowUp)
export const BoldIcon = createIcon('Bold', lucide.Bold)
export const CalendarIcon = createIcon('Calendar', lucide.Calendar)
export const Check = createIcon('Check', lucide.Check)
export const CheckIcon = createIcon('Check', lucide.Check)
export const ChevronDownIcon = createIcon('ChevronDown', lucide.ChevronDown)
export const ChevronLeftIcon = createIcon('ChevronLeft', lucide.ChevronLeft)
export const ChevronRight = createIcon('ChevronRight', lucide.ChevronRight)
export const ChevronRightIcon = createIcon('ChevronRight', lucide.ChevronRight)
export const ChevronUpIcon = createIcon('ChevronUp', lucide.ChevronUp)
export const ChevronsLeftIcon = createIcon('ChevronsLeft', lucide.ChevronsLeft)
export const ChevronsRightIcon = createIcon('ChevronsRight', lucide.ChevronsRight)
export const ChevronsUpDownIcon = createIcon('ChevronsUpDown', lucide.ChevronsUpDown)
export const CircleAlertIcon = createIcon('CircleAlert', lucide.CircleAlert)
export const CircleCheckIcon = createIcon('CircleCheck', lucide.CircleCheck)
export const ClapperboardIcon = createIcon('Clapperboard', lucide.Clapperboard)
export const ClipboardCopyIcon = createIcon('ClipboardCopy', lucide.ClipboardCopy)
export const CornerDownLeftIcon = createIcon('CornerDownLeft', lucide.CornerDownLeft)
export const CropIcon = createIcon('Crop', lucide.Crop)
export const DownloadIcon = createIcon('Download', lucide.Download)
export const EllipsisVerticalIcon = createIcon('EllipsisVertical', lucide.EllipsisVertical)
export const ExternalLink = createIcon('ExternalLink', lucide.ExternalLink)
export const ExternalLinkIcon = createIcon('ExternalLink', lucide.ExternalLink)
export const EyeIcon = createIcon('Eye', lucide.Eye)
export const EyeOffIcon = createIcon('EyeOff', lucide.EyeOff)
export const File = createIcon('File', lucide.File)
export const FileIcon = createIcon('File', lucide.File)
export const FlipHorizontalIcon = createIcon('FlipHorizontal', lucide.FlipHorizontal)
export const FlipVerticalIcon = createIcon('FlipVertical', lucide.FlipVertical)
export const Folder = createIcon('Folder', lucide.Folder)
export const FolderIcon = createIcon('Folder', lucide.Folder)
export const FolderOpenIcon = createIcon('FolderOpen', lucide.FolderOpen)
export const GripVertical = createIcon('GripVertical', lucide.GripVertical)
export const HeartIcon = createIcon('Heart', lucide.Heart)
export const ImageIcon = createIcon('Image', lucide.Image)
export const InfoIcon = createIcon('Info', lucide.Info)
export const ItalicIcon = createIcon('Italic', lucide.Italic)
export const KeyboardIcon = createIcon('Keyboard', lucide.Keyboard)
export const LayersIcon = createIcon('Layers', lucide.Layers)
export const ListChecksIcon = createIcon('ListChecks', lucide.ListChecks)
export const LoaderCircleIcon = createIcon('LoaderCircle', lucide.LoaderCircle)
export const LoaderIcon = createIcon('Loader', lucide.Loader)
export const Maximize2 = createIcon('Maximize2', lucide.Maximize2)
export const Minus = createIcon('Minus', lucide.Minus)
export const MinusIcon = createIcon('Minus', lucide.Minus)
export const MoonIcon = createIcon('Moon', lucide.Moon)
export const MoreHorizontalIcon = createIcon('MoreHorizontal', lucide.MoreHorizontal)
export const PaletteIcon = createIcon('Palette', lucide.Palette)
export const PaperclipIcon = createIcon('Paperclip', lucide.Paperclip)
export const PauseIcon = createIcon('Pause', lucide.Pause)
export const PencilIcon = createIcon('Pencil', lucide.Pencil)
export const Pin = createIcon('Pin', lucide.Pin)
export const PinOff = createIcon('PinOff', lucide.PinOff)
export const Pipette = createIcon('Pipette', lucide.Pipette)
export const PlayIcon = createIcon('Play', lucide.Play)
export const PlusIcon = createIcon('Plus', lucide.Plus)
export const RectangleHorizontalIcon = createIcon('RectangleHorizontal', lucide.RectangleHorizontal)
export const RectangleVerticalIcon = createIcon('RectangleVertical', lucide.RectangleVertical)
export const RefreshCwIcon = createIcon('RefreshCw', lucide.RefreshCw)
export const RocketIcon = createIcon('Rocket', lucide.Rocket)
export const RotateCcwIcon = createIcon('RotateCcw', lucide.RotateCcw)
export const RotateCwIcon = createIcon('RotateCw', lucide.RotateCw)
export const SaveIcon = createIcon('Save', lucide.Save)
export const SearchIcon = createIcon('Search', lucide.Search)
export const SparklesIcon = createIcon('Sparkles', lucide.Sparkles)
export const SquareCheckBigIcon = createIcon('SquareCheckBig', lucide.SquareCheckBig)
export const SquareIcon = createIcon('Square', lucide.Square)
export const SquareMinusIcon = createIcon('SquareMinus', lucide.SquareMinus)
export const StarIcon = createIcon('Star', lucide.Star)
export const StrikethroughIcon = createIcon('Strikethrough', lucide.Strikethrough)
export const SunIcon = createIcon('Sun', lucide.Sun)
export const TrashIcon = createIcon('Trash', lucide.Trash)
export const TrendingDownIcon = createIcon('TrendingDown', lucide.TrendingDown)
export const TrendingUpIcon = createIcon('TrendingUp', lucide.TrendingUp)
export const TriangleAlertIcon = createIcon('TriangleAlert', lucide.TriangleAlert)
export const UnderlineIcon = createIcon('Underline', lucide.Underline)
export const UploadIcon = createIcon('Upload', lucide.Upload)
export const Volume2Icon = createIcon('Volume2', lucide.Volume2)
export const VolumeXIcon = createIcon('VolumeX', lucide.VolumeX)
export const XIcon = createIcon('X', lucide.X)
export const ZapIcon = createIcon('Zap', lucide.Zap)
export const ZoomInIcon = createIcon('ZoomIn', lucide.ZoomIn)
export const ZoomOutIcon = createIcon('ZoomOut', lucide.ZoomOut)

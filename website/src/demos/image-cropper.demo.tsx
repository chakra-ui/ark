'use client'

import { ImageCropper, imageCropperAnatomy } from '@ark-ui/react/image-cropper'
import { sva } from 'styled-system/css'

const styles = sva({
  slots: imageCropperAnatomy.keys(),
  className: 'image-cropper',
  base: {
    root: {
      '--cropper-accent': '{colors.colorPalette.9}',
      '--cropper-line-color': 'white',
      '--cropper-overlay-color': 'rgb(0 0 0 / 0.5)',
      '--cropper-handler-size': '10px',
      '--cropper-handler-width': '4px',
      '--cropper-line-width': '2px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '100%',
      maxWidth: '28rem',
      color: 'fg.default',
      height: '20rem',
    },
    viewport: {
      position: 'relative',
      overflow: 'hidden',
      bg: 'bg.subtle',
      aspectRatio: '1',
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      transformOrigin: 'center center',
      pointerEvents: 'none',
      userSelect: 'none',
      backfaceVisibility: 'hidden',
    },
    selection: {
      boxSizing: 'content-box',
      boxShadow: '0 0 0 9999px var(--cropper-overlay-color)',
      border: 'var(--cropper-line-width) solid rgb(255 255 255 / 0.5)',
      cursor: 'move',
      outline: 'none',
      backfaceVisibility: 'hidden',
      '&[data-shape="circle"]': {
        borderRadius: 'full',
      },
      _focusVisible: {
        borderColor: 'var(--cropper-accent)',
      },
      '&[data-disabled]': {
        cursor: 'default',
      },
      '&[data-dragging]': {
        cursor: 'grabbing',
        borderColor: 'rgb(255 255 255 / 0.8)',
      },
    },
    handle: {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      touchAction: 'none',
      width: 'calc(var(--cropper-handler-size) + 8px)',
      height: 'calc(var(--cropper-handler-size) + 8px)',
      '& > *': {
        width: 'var(--cropper-handler-size)',
        height: 'var(--cropper-handler-size)',
        bg: 'white',
        boxShadow: '0 2px 6px rgb(0 0 0 / 0.4)',
        transition: 'opacity 0.2s ease, transform 0.15s ease',
      },
      '&[data-disabled]': {
        display: 'none',
      },
      '&[data-position="top-left"], &[data-position="top-right"], &[data-position="bottom-right"], &[data-position="bottom-left"]':
        {
          '&:hover > *': {
            transform: 'scale(1.1)',
          },
        },
      '&[data-position="top-left"]': {
        cursor: 'nwse-resize',
        '& > *': {
          borderLeft: 'var(--cropper-handler-width) solid var(--cropper-accent)',
          borderTop: 'var(--cropper-handler-width) solid var(--cropper-accent)',
        },
      },
      '&[data-position="top-right"]': {
        cursor: 'nesw-resize',
        '& > *': {
          borderRight: 'var(--cropper-handler-width) solid var(--cropper-accent)',
          borderTop: 'var(--cropper-handler-width) solid var(--cropper-accent)',
        },
      },
      '&[data-position="bottom-right"]': {
        cursor: 'nwse-resize',
        '& > *': {
          borderRight: 'var(--cropper-handler-width) solid var(--cropper-accent)',
          borderBottom: 'var(--cropper-handler-width) solid var(--cropper-accent)',
        },
      },
      '&[data-position="bottom-left"]': {
        cursor: 'nesw-resize',
        '& > *': {
          borderLeft: 'var(--cropper-handler-width) solid var(--cropper-accent)',
          borderBottom: 'var(--cropper-handler-width) solid var(--cropper-accent)',
        },
      },
      '&[data-position="top"], &[data-position="bottom"], &[data-position="left"], &[data-position="right"]': {
        '& > *': {
          width: '10px',
          height: '10px',
          bg: 'var(--cropper-accent)',
          borderRadius: 'full',
          boxShadow: '0 0 0 2px white',
          opacity: 1,
        },
        '&:hover > *': {
          transform: 'scale(1.2)',
        },
      },
      '&[data-position="top"], &[data-position="bottom"]': {
        cursor: 'ns-resize',
      },
      '&[data-position="left"], &[data-position="right"]': {
        cursor: 'ew-resize',
      },
    },
    grid: {
      position: 'absolute',
      pointerEvents: 'none',
      opacity: 0,
      transition: 'opacity 0.2s ease',
      '&[data-axis="horizontal"]': {
        inset: '33.33% 0',
        borderTop: '1px solid rgb(255 255 255 / 0.4)',
        borderBottom: '1px solid rgb(255 255 255 / 0.4)',
      },
      '&[data-axis="vertical"]': {
        inset: '0 33.33%',
        borderLeft: '1px solid rgb(255 255 255 / 0.4)',
        borderRight: '1px solid rgb(255 255 255 / 0.4)',
      },
      '&[data-dragging], &[data-panning]': {
        opacity: 1,
      },
    },
  },
})

export const Demo = (props: ImageCropper.RootProps) => {
  const classNames = styles()
  return (
    <ImageCropper.Root {...props} className={classNames.root} defaultZoom={1.5}>
      <ImageCropper.Viewport className={classNames.viewport}>
        <ImageCropper.Image
          className={classNames.image}
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
          alt="Sample"
        />
        <ImageCropper.Selection className={classNames.selection}>
          {ImageCropper.handles.map((position) => (
            <ImageCropper.Handle className={classNames.handle} key={position} position={position}>
              <div />
            </ImageCropper.Handle>
          ))}
          <ImageCropper.Grid className={classNames.grid} axis="horizontal" />
          <ImageCropper.Grid className={classNames.grid} axis="vertical" />
        </ImageCropper.Selection>
      </ImageCropper.Viewport>
    </ImageCropper.Root>
  )
}

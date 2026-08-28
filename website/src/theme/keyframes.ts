import { defineKeyframes } from '@pandacss/dev'

export const keyframes = defineKeyframes({
  'fade-in': {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  'fade-out': {
    from: { opacity: '1' },
    to: { opacity: '0' },
  },
  'slide-in': {
    '0%': { opacity: '0', transform: 'translateY(64px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  'slide-out': {
    '0%': { opacity: '1', transform: 'translateY(0)' },
    '100%': { opacity: '0', transform: 'translateY(64px)' },
  },
  'slide-in-left': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(0%)' },
  },
  'slide-out-left': {
    '0%': { transform: 'translateX(0%)' },
    '100%': { transform: 'translateX(-100%)' },
  },
  'slide-in-right': {
    '0%': { transform: 'translateX(100%)' },
    '100%': { transform: 'translateX(0%)' },
  },
  'slide-out-right': {
    '0%': { transform: 'translateX(0%)' },
    '100%': { transform: 'translateX(100%)' },
  },
  'collapse-in': {
    '0%': { height: '0' },
    '100%': { height: 'var(--height)' },
  },
  'collapse-out': {
    '0%': { height: 'var(--height)' },
    '100%': { height: '0' },
  },
  fadeIn: {
    '0%': { opacity: '0', transform: 'translateY(-4px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  fadeOut: {
    '0%': { opacity: '1', transform: 'translateY(0)' },
    '100%': { opacity: '0', transform: 'translateY(-4px)' },
  },
  'skeleton-pulse': {
    '50%': { opacity: '0.5' },
  },
  spin: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  marqueeX: {
    from: { transform: 'translateX(0%)' },
    to: { transform: 'translateX(var(--marquee-translate))' },
  },
  marqueeY: {
    from: { transform: 'translateY(0%)' },
    to: { transform: 'translateY(var(--marquee-translate))' },
  },
  'scale-in': {
    from: { transform: 'scale(0)' },
    to: { transform: 'scale(1)' },
  },
  'scale-out': {
    from: { transform: 'scale(1)' },
    to: { transform: 'scale(0)' },
  },
  'drawer-in-bottom': {
    from: { transform: 'translate3d(0, 100%, 0)' },
    to: { transform: 'translate3d(0, var(--drawer-translate-y, 0px), 0)' },
  },
  'drawer-out-bottom': {
    from: { transform: 'translate3d(0, var(--drawer-translate-y, 0px), 0)' },
    to: { transform: 'translate3d(0, 100%, 0)' },
  },
  'drawer-in-top': {
    from: { transform: 'translate3d(0, -100%, 0)' },
    to: { transform: 'translate3d(0, var(--drawer-translate-y, 0px), 0)' },
  },
  'drawer-out-top': {
    from: { transform: 'translate3d(0, var(--drawer-translate-y, 0px), 0)' },
    to: { transform: 'translate3d(0, -100%, 0)' },
  },
  'drawer-in-left': {
    from: { transform: 'translate3d(-100%, 0, 0)' },
    to: { transform: 'translate3d(var(--drawer-translate-x, 0px), 0, 0)' },
  },
  'drawer-out-left': {
    from: { transform: 'translate3d(var(--drawer-translate-x, 0px), 0, 0)' },
    to: { transform: 'translate3d(-100%, 0, 0)' },
  },
  'drawer-in-right': {
    from: { transform: 'translate3d(100%, 0, 0)' },
    to: { transform: 'translate3d(var(--drawer-translate-x, 0px), 0, 0)' },
  },
  'drawer-out-right': {
    from: { transform: 'translate3d(var(--drawer-translate-x, 0px), 0, 0)' },
    to: { transform: 'translate3d(100%, 0, 0)' },
  },
})

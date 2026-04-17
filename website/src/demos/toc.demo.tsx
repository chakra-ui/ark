'use client'
import { Toc } from '@ark-ui/react/toc'
import { useRef, useState } from 'react'
import { css } from 'styled-system/css'

const items = [
  { value: 'demo-intro', depth: 2, label: 'Introduction' },
  { value: 'demo-setup', depth: 2, label: 'Getting Started' },
  { value: 'demo-config', depth: 2, label: 'Configuration' },
  { value: 'demo-usage', depth: 2, label: 'Usage' },
  { value: 'demo-conclude', depth: 2, label: 'Conclusion' },
]

export const Demo = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState(items[0].value)

  return (
    <Toc.Root
      items={items}
      getScrollEl={() => contentRef.current}
      rootMargin="0px 0px -60% 0px"
      className={css({ display: 'flex', gap: '8', w: 'full', maxW: '2xl', flexDir: { base: 'column', md: 'row' } })}
    >
      {/* Mobile select nav */}
      <div className={css({ display: { base: 'block', md: 'none' }, mb: '4' })}>
        <label
          htmlFor="toc-mobile-select"
          className={css({ textStyle: 'xs', fontWeight: 'semibold', color: 'fg.subtle', mb: '1', display: 'block' })}
        >
          On this page
        </label>
        <select
          id="toc-mobile-select"
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value)
            const el = document.getElementById(e.target.value)
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          className={css({
            w: 'full',
            p: '2',
            borderRadius: 'md',
            borderColor: 'border.subtle',
            bg: 'bg.default',
            color: 'fg.default',
            fontSize: 'sm',
          })}
        >
          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <Toc.Content
        ref={contentRef}
        className={css({ flex: '1', overflowY: 'auto', h: 'clamp(7rem, 50vh, 24rem)', scrollbarWidth: 'none' })}
      >
        {items.map((item) => (
          <section key={item.value} className={css({ mb: '6' })}>
            <h2
              id={item.value}
              className={css({ textStyle: 'sm', fontWeight: 'semibold', color: 'fg.default', mb: '2' })}
            >
              {item.label}
            </h2>
            <div className={css({ display: 'flex', flexDir: 'column', gap: '2' })}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={css({
                    h: '2',
                    bg: 'bg.emphasized',
                    borderRadius: 'sm',
                    w: i % 3 === 2 ? '3/4' : 'full',
                  })}
                />
              ))}
            </div>
          </section>
        ))}
      </Toc.Content>

      {/* Desktop nav */}
      <Toc.Nav className={css({ w: '36', flexShrink: '0', pt: '0.5', display: { base: 'none', md: 'block' } })}>
        <p
          className={css({
            textStyle: 'xs',
            fontWeight: 'semibold',
            color: 'fg.subtle',
            mb: '3',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
          })}
        >
          On this page
        </p>
        <Toc.List
          className={css({
            display: 'flex',
            flexDir: 'column',
            gap: '1',
            position: 'relative',
            pl: '3',
            borderLeftWidth: '1px',
            borderColor: 'border.subtle',
          })}
        >
          <Toc.Indicator
            className={css({
              w: '2px',
              background: 'var(--demo-coral-solid)',
              borderRadius: 'full',
              transition: 'top 0.15s ease, height 0.15s ease',
            })}
          />
          {items.map((item) => (
            <Toc.Item key={item.value} item={item}>
              <Toc.Link
                href={`#${item.value}`}
                className={css({
                  textStyle: 'sm',
                  color: 'fg.muted',
                  textDecoration: 'none',
                  py: '0.5',
                  display: 'block',
                  transition: 'color 0.15s',
                  '&[data-active]': { color: 'var(--demo-coral-fg)', fontWeight: 'medium' },
                })}
              >
                {item.label}
              </Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc.Root>
  )
}

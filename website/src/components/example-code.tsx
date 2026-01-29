'use client'

import { SiStackblitz } from '@icons-pack/react-simple-icons'
import { useState } from 'react'
import { css } from 'styled-system/css'
import { HStack } from 'styled-system/jsx'
import { Switch } from '~/components/ui/switch'
import { Tabs } from '~/components/ui/tabs'
import { stripCssModuleCode, transformCssModuleImports } from '~/lib/css-module-transform'
import type { SupportedLang } from '~/lib/shiki-client'
import { type Framework, openInStackblitz } from '~/lib/stackblitz'
import { CodePreview } from './code-preview'

interface ExampleMeta {
  id: string
  component?: string
  framework: string
}

interface Props extends Omit<Tabs.RootProps, 'defaultValue'> {
  code: string
  lang?: SupportedLang
  cssModules?: Record<string, string>
  meta?: ExampleMeta
}

export const ExampleCodeTabs = (props: Props) => {
  const { code, lang = 'tsx', meta, cssModules, ...rootProps } = props
  const [showCss, setShowCss] = useState(true)
  const [activeTab, setActiveTab] = useState('code')

  const componentCss = cssModules ? Object.entries(cssModules).filter(([key]) => key.endsWith('.module.css')) : []

  const globalCssContent = cssModules
    ? [cssModules['theme.css'], cssModules['utilities.css'], cssModules['global.css']].filter(Boolean).join('\n\n')
    : ''

  const hasComponentCss = componentCss.length > 0
  const hasGlobalCss = globalCssContent.length > 0

  const displayCode = hasComponentCss && showCss ? transformCssModuleImports(code) : stripCssModuleCode(code)
  const codeExtension = lang === 'vue' ? 'vue' : lang === 'svelte' ? 'svelte' : 'tsx'

  const tabs = [
    { value: 'code', label: `index.${codeExtension}` },
    ...(hasComponentCss && showCss ? [{ value: 'styles', label: 'index.module.css' }] : []),
    ...(hasComponentCss && hasGlobalCss && showCss ? [{ value: 'global', label: 'global.css' }] : []),
  ]

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={(e) => setActiveTab(e.value)}
      variant="line"
      borderWidth="1px"
      borderColor="gray.dark.5"
      borderRadius="lg"
      overflow="hidden"
      bg="gray.dark.2"
      size="sm"
      className="not-prose"
      {...rootProps}
      lazyMount
    >
      <Tabs.List
        bg="gray.dark.a2"
        boxShadow="none"
        borderBottomWidth="1px"
        borderBottomColor="gray.dark.5"
        px="4"
        alignItems="center"
      >
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            color="gray.dark.11"
            _selected={{ color: 'white' }}
            pb="0"
            h="39px"
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator />
        <HStack pos="absolute" right="4" top="1.5" gap="4" className="dark">
          {hasComponentCss && (
            <Switch
              size="sm"
              checked={showCss}
              onCheckedChange={(e) => {
                setShowCss(e.checked)
                if (!e.checked) setActiveTab('code')
              }}
            >
              <span className={css({ fontSize: 'sm', color: 'gray.dark.11' })}>CSS</span>
            </Switch>
          )}
          {meta && <StackblitzButton code={code} cssModules={cssModules} meta={meta} />}
        </HStack>
      </Tabs.List>

      <Tabs.Content key={`code-${showCss}`} value="code" pt="0">
        <CodePreview code={displayCode} lang={lang} />
      </Tabs.Content>

      {hasComponentCss && showCss && (
        <Tabs.Content value="styles" pt="0">
          {componentCss.map(([filename, content]) => (
            <CodePreview key={filename} code={content} lang="css" />
          ))}
        </Tabs.Content>
      )}

      {hasComponentCss && hasGlobalCss && showCss && (
        <Tabs.Content value="global" pt="0">
          <CodePreview code={globalCssContent} lang="css" />
        </Tabs.Content>
      )}
    </Tabs.Root>
  )
}

function StackblitzButton(props: { code: string; cssModules: Record<string, string> | undefined; meta: ExampleMeta }) {
  const {
    code,
    cssModules = {},
    meta: { id, component, framework },
  } = props

  return (
    <button
      type="button"
      className={css({
        h: '7',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '1.5',
        color: 'gray.dark.11',
        fontSize: 'sm',
        fontWeight: 'medium',
        cursor: 'pointer',
        _hover: { color: 'white' },
        _icon: { boxSize: '4', color: 'coral.8' },
      })}
      onClick={() => {
        openInStackblitz(framework as Framework, {
          code,
          cssModules,
          id,
          component: component ?? 'Example',
        })
      }}
    >
      <SiStackblitz />
      <span className={css({ hideBelow: 'sm' })}>Stackblitz</span>
    </button>
  )
}

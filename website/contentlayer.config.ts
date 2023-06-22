import { type RawDocumentData } from 'contentlayer/core'
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import fs from 'fs-extra'
import toc from 'markdown-toc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { highlightCode } from './src/lib/highlightCode'

const resolveFramework = (doc: { _raw: RawDocumentData }) => doc._raw.sourceFilePath.split('/')[0]

export const ComponentDocument = defineDocumentType(() => ({
  name: 'ComponentDocument',
  filePathPattern: '*/src/**/docs/*.mdx',
  contentType: 'mdx',
  fields: {
    id: {
      type: 'string',
      description: 'The id of a component.',
      required: true,
    },
    name: {
      type: 'string',
      description: 'The name of a component',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The description of a component',
      required: true,
    },
  },
  computedFields: {
    framework: {
      type: 'string',
      resolve: resolveFramework,
    },
    route: {
      type: 'string',
      resolve: (doc) => {
        const framework = resolveFramework(doc)
        return `/docs/${framework}/components/${doc.id}`
      },
    },
    toc: {
      type: 'json',
      resolve: (doc) => toc(doc.body.raw, { maxdepth: 3 }).json.filter((t) => t.lvl === 2),
    },
    types: {
      type: 'json',
      resolve: (doc) => {
        const framework = resolveFramework(doc)
        return fs.readJSONSync(`../packages/${framework}/src/${doc.id}/docs/${doc.id}.types.json`)
      },
    },
    stories: {
      type: 'json',
      resolve: async (doc) => {
        const framework = resolveFramework(doc)
        try {
          const jsonPath = `../packages/${framework}/src/${doc.id}/docs/${doc.id}.stories.json`
          const json: Record<string, string> = fs.readJSONSync(jsonPath)
          const items = await Promise.all(
            Object.entries(json).map(async ([key, value]) => [key, await highlightCode(value)]),
          )
          return Object.fromEntries(items)
        } catch (error) {
          console.log("Couldn't find stories for", `${framework}/src/${doc.id}`)
          return {}
        }
      },
    },
  },
}))

export const GeneralDocument = defineDocumentType(() => ({
  name: 'GeneralDocument',
  filePathPattern: '*/docs/*.mdx',
  contentType: 'mdx',
  fields: {
    id: {
      type: 'string',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
  },
  computedFields: {
    framework: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFilePath.split('/')[0],
    },
    route: {
      type: 'string',
      resolve: (doc) => `/docs/${resolveFramework(doc)}/overview/${doc.id}`,
    },
    toc: {
      type: 'json',
      resolve: (doc) => toc(doc.body.raw, { maxdepth: 3 }).json.filter((t) => t.lvl === 2),
    },
  },
}))

export const ChangelogDocument = defineDocumentType(() => ({
  name: 'ChangelogDocument',
  filePathPattern: '*/CHANGELOG.md',
  contentType: 'mdx',
  fields: {
    id: {
      type: 'string',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
  },
  computedFields: {
    framework: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFilePath.split('/')[0],
    },
    route: {
      type: 'string',
      resolve: (doc) => `/docs/${resolveFramework(doc)}/overview/changelog`,
    },
    toc: {
      type: 'json',
      resolve: (doc) => toc(doc.body.raw, { maxdepth: 3 }).json.filter((t) => t.lvl === 2),
    },
  },
}))

export default makeSource({
  contentDirPath: '../packages',
  contentDirExclude: ['*/node_modules', 'dist'],
  documentTypes: [ComponentDocument, ChangelogDocument, GeneralDocument],
  disableImportAliasWarning: true,
  onUnknownDocuments: 'skip-ignore',
  mdx: {
    rehypePlugins: [
      [
        rehypeSlug,
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          test: ['h2', 'h3', 'h4'],
          properties: { className: ['anchor'] },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: 'css-variables',
          keepBackground: true,
        } satisfies Partial<PrettyCodeOptions>,
      ],
    ],
  },
})

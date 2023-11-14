import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import {lexicalEditor} from "@payloadcms/richtext-lexical";
import CompanyInfo from "./globals/CompanyInfo";
import {RelationshipFeature2} from "./Relationship";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => ({
        ...config,
        resolve: {
            ...config.resolve,
          alias: {
            ...(config?.resolve?.alias || {}),
            'react': path.join(__dirname, '../node_modules/react'),
            'react-dom': path.join(__dirname, '../node_modules/react-dom'),
            'react-i18next': path.join(__dirname, '../node_modules/react-i18next'),
            'payload': path.join(__dirname, '../node_modules/payload'),
            'lexical': path.join(__dirname, '../node_modules/lexical'),
            '@lexical/react': path.join(__dirname, '../node_modules/@lexical/react'),
            '@lexical/clipboard': path.join(__dirname, '../node_modules/@lexical/clipboard'),
            '@lexical/code': path.join(__dirname, '../node_modules/@lexical/code'),
            '@lexical/dragon': path.join(__dirname, '../node_modules/@lexical/dragon'),
            '@lexical/hashtag': path.join(__dirname, '../node_modules/@lexical/hashtag'),
            '@lexical/headless': path.join(__dirname, '../node_modules/@lexical/headless'),
            '@lexical/history': path.join(__dirname, '../node_modules/@lexical/history'),
            '@lexical/html': path.join(__dirname, '../node_modules/@lexical/html'),
            '@lexical/link': path.join(__dirname, '../node_modules/@lexical/link'),
            '@lexical/list': path.join(__dirname, '../node_modules/@lexical/list'),
            '@lexical/mark': path.join(__dirname, '../node_modules/@lexical/mark'),
            '@lexical/markdown': path.join(__dirname, '../node_modules/@lexical/markdown'),
            '@lexical/offset': path.join(__dirname, '../node_modules/@lexical/offset'),
            '@lexical/overflow': path.join(__dirname, '../node_modules/@lexical/overflow'),
            '@lexical/plain-text': path.join(__dirname, '../node_modules/@lexical/plain-text'),
            '@lexical/selection': path.join(__dirname, '../node_modules/@lexical/selection'),
            '@lexical/table': path.join(__dirname, '../node_modules/@lexical/table'),
            '@lexical/text': path.join(__dirname, '../node_modules/@lexical/text'),
            '@lexical/utils': path.join(__dirname, '../node_modules/@lexical/utils'),
            '@lexical/yjs': path.join(__dirname, '../node_modules/@lexical/yjs'),
            '@lexical/react/LexicalDecoratorBlockNode': path.join(__dirname, '../node_modules/@lexical/react/LexicalDecoratorBlockNode'),

          },
        },
    }),
  },
  editor: lexicalEditor({
    features: ({defaultFeatures}) => [
        RelationshipFeature2(),
    ],
  }),
  collections: [Users],
  globals: [CompanyInfo],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})

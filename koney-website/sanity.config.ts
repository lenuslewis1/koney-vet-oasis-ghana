import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Koney Website',

  projectId: 'fqp1d8a4',
  dataset: 'koneyblog',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
  cors: {
    allowOrigins: ['http://localhost:8080', 'http://localhost:3000', 'http://127.0.0.1:8080', 'http://localhost:8081'],
    allowCredentials: true,
  },
})

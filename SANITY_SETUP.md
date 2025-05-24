
# Sanity Studio Setup Instructions

## 1. Navigate to your Sanity project directory
```bash
cd "this is my sanity project  "
```

## 2. Copy the schema files
Copy the following files from your React app to your Sanity project:
- Copy `src/schemas/blogPost.js` to `schemas/blogPost.js`
- Copy `src/schemas/author.js` to `schemas/author.js`
- Copy `src/schemas/index.js` to `schemas/index.js`

## 3. Update your Sanity configuration
In your Sanity project, update `sanity.config.ts` (or `sanity.config.js`) to include the schemas:

```javascript
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Veterinary Blog',
  projectId: 'fqp1d8a4',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
```

## 4. Start the Sanity Studio
```bash
npm run dev
```

## 5. Create sample content
1. Create an author first (required for blog posts)
2. Create blog posts with all required fields:
   - Title
   - Slug (auto-generated from title)
   - Publish Date
   - Featured Image
   - Excerpt
   - Content
   - Author (reference to created author)
   - Categories (optional)

## 6. Deploy Sanity Studio (optional)
```bash
npm run deploy
```

Your blog should now be able to fetch and display content from Sanity!

import type {StructureResolver} from 'sanity/structure'

// Document types that should only ever have one instance (singletons).
// Keep this in sync with the `singletonTypes` set in sanity.config.ts.
const singletonTypes = new Set(['siteSettings'])

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Site Settings is pinned to a fixed document ID and opens directly
      // as a single editor, instead of a list you could add duplicates to.
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      // Every other document type, with singletons filtered out so they
      // don't also show up as a creatable list here.
      ...S.documentTypeListItems().filter(
        (listItem) => !singletonTypes.has(listItem.getId() as string)
      ),
    ])

import { type SchemaTypeDefinition } from 'sanity'
import legacyMember from './legacyMember'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [legacyMember],
}
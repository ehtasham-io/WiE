import { type SchemaTypeDefinition } from 'sanity'
import { teamMember } from './schemaTypes/teamMember'
import { event } from './schemaTypes/event'
import { siteSettings } from './schemaTypes/siteSettings'
// Import our new legacy schema (Notice it has no curly braces because we used a default export)
import legacyMember from './schemaTypes/legacyMember'

export const schema: { types: SchemaTypeDefinition[] } = {
  // Add legacyMember to the end of your existing list
  types: [teamMember, event, siteSettings, legacyMember], 
}
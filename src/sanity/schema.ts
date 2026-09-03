import { type SchemaTypeDefinition } from 'sanity'
import { teamMember } from './schemaTypes/teamMember'
import { event } from './schemaTypes/event'
// 1. Import the new schema
import { siteSettings } from './schemaTypes/siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  // 2. Add it to the array
  types: [teamMember, event, siteSettings], 
}
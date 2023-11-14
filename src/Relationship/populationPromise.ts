import type { SerializedRelationshipNode } from './nodes/RelationshipNode'

import { populate } from '@payloadcms/richtext-lexical/dist/populate/populate'
import {PopulationPromise} from "@payloadcms/richtext-lexical";

export const relationshipPopulationPromise: PopulationPromise<SerializedRelationshipNode> = ({
  currentDepth,
  depth,
  field,
  node,
  overrideAccess,
  req,
  showHiddenFields,
}) => {
  const promises: Promise<void>[] = []

  if (node?.value?.id) {
    const collection = req.payload.collections[node?.relationTo]

    if (collection) {
      promises.push(
        populate({
          id: node.value.id,
          collection,
          currentDepth,
          data: node,
          depth,
          field,
          key: 'value',
          overrideAccess,
          req,
          showHiddenFields,
        }),
      )
    }
  }

  return promises
}

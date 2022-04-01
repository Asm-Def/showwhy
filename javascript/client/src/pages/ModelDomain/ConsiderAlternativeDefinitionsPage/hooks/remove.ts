/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { ElementDefinition, Setter } from '@showwhy/types'
import { useCallback } from 'react'

export function useRemoveDefinition(
	saveDefinitions: (definitions: ElementDefinition[]) => void,
	definitions: ElementDefinition[],
): (definition: ElementDefinition) => void {
	return useCallback(
		(definition: ElementDefinition) => {
			const newDefinitions =
				definitions?.filter(def =>
					definition.id
						? def.id !== definition.id
						: def.variable !== definition.variable &&
						  def.level !== definition.level,
				) || []
			saveDefinitions(newDefinitions)
			return newDefinitions
		},
		[definitions, saveDefinitions],
	)
}

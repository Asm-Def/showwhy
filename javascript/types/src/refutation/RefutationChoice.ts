/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Handler } from '../primitives.js'
import type { RefutationType } from './RefutationType.js'

export interface RefutationChoice {
	key: RefutationType
	title: string
	description: string
	isSelected: boolean
	onChange: Handler
}

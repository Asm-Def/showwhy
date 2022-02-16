/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Handler } from '../primitives'
import { TableProps } from './TableProps'

export interface TableFooter {
	data: any
	props?: TableProps
	onClick?: Handler
}
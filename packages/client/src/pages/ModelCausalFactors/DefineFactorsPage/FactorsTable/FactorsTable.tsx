/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React, { memo } from 'react'
import styled from 'styled-components'
import { useFactorsTable } from './hooks'
import { GenericTableComponent } from '~components/Tables/GenericTableComponent'
import { Container } from '~styles'

export interface FactorsTableProps {
	headers: { fieldName: string; value: string | React.ReactNode }[]
	causeType: string
}

export const FactorsTable: React.FC<FactorsTableProps> = memo(
	function FactorsTable({ headers, causeType }) {
		const { flatFactorsList, itemList } = useFactorsTable(causeType)

		return (
			<Container>
				{flatFactorsList.length ? (
					<GenericTableComponent
						items={itemList}
						headers={{ data: headers }}
						props={{
							customColumnsWidth: [
								{ fieldName: 'causes', width: '12%' },
								{ fieldName: 'degree', width: '17%' },
							],
						}}
					/>
				) : (
					<EmptyFactorsText>Add a new factor to start</EmptyFactorsText>
				)}
			</Container>
		)
	},
)

const EmptyFactorsText = styled.p`
	text-align: center;
`
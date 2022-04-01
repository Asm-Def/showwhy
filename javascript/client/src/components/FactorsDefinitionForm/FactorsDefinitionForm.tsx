/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type {
	CausalFactor,
	ElementDefinition,
	Experiment,
	Maybe,
	OptionalId,
} from '@showwhy/types'
import { memo } from 'react'
import styled from 'styled-components'

import type { PageType } from '~types'

import { useFactorsDefinitionForm } from './hooks'

export const FactorsDefinitionForm: React.FC<{
	factor?: CausalFactor | ElementDefinition
	showLevel?: Maybe<boolean>
	showType?: Maybe<boolean>
	defineQuestion?: Experiment
	pageType: PageType
	onAdd?: (factor: OptionalId<CausalFactor | ElementDefinition>) => void
	onChange?: (f: Partial<CausalFactor | ElementDefinition>) => void
	onDefinitionTypeChange?: (type: string) => void
}> = memo(function FactorsDefinitionForm({
	factor,
	defineQuestion,
	onAdd,
	onChange,
	showLevel = true,
	showType = false,
	pageType,
	onDefinitionTypeChange,
}) {
	const { level, description, variable, definitionType } =
		useFactorsDefinitionForm({
			factor,
			experiment: defineQuestion,
			onChange,
			onAdd,
			pageType,
			showLevel,
			onDefinitionTypeChange,
		})

	return (
		<Container showLevel={!!showLevel} data-pw="factors-form">
			{showLevel ? <div data-pw="factors-form-is-primary">{level}</div> : null}
			{showType ? definitionType : null}
			{variable}
			{description}
		</Container>
	)
})

const Container = styled.form<{ showLevel: Maybe<boolean> }>`
	display: grid;
	grid-template-columns: ${({ showLevel }) =>
		showLevel ? '15% 25% 60%' : '30% 70%'};
	align-items: center;
	padding: 0.5rem 0.2rem;
	border-radius: 0 0 3px 3px;
	background-color: #f1f1f1;
	margin-top: 0.1rem;
`

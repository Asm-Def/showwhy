/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { TextField } from '@fluentui/react'
import { upperFirst } from 'lodash'
import React, { memo } from 'react'
import styled from 'styled-components'
import { Element } from '~interfaces'
import { Container, ContainerFlexRow } from '~styles'

interface FieldGroupProps {
	type: string
	question?: Element
	onChange: (value, type, field) => void
}

export const FieldGroup: React.FC<FieldGroupProps> = memo(function FieldGroup({
	type,
	question,
	onChange,
}) {
	return (
		<Container>
			<FieldTitle>{upperFirst(type)}</FieldTitle>
			<ContainerFlexRow justifyContent="space-between">
				<HalfField
					value={question?.label}
					onChange={(_, value) => onChange(value, type, 'label')}
					label="Label"
					placeholder={`Enter short label describing the ${type} of interest​`}
				/>
				<HalfField
					value={question?.dataset}
					onChange={(_, value) => onChange(value, type, 'dataset')}
					label="Dataset"
					placeholder="Dataset name"
				/>
			</ContainerFlexRow>

			<TextField
				value={question?.description}
				rows={3}
				onChange={(_, value) => onChange(value, type, 'description')}
				label="Description"
				placeholder={`Enter full description of the ${type} of interest​`}
				multiline
			/>
		</Container>
	)
})

const FieldTitle = styled.h4`
	margin-bottom: unset;
`

const HalfField = styled(TextField)`
	width: 49%;
`
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { IDropdownOption } from '@fluentui/react'
import type { CausalFactor, Experiment, Maybe } from '@showwhy/types'
import { useCallback } from 'react'
import type { SetterOrUpdater } from 'recoil'

import { useAddOrEditFactor, useSaveDefinition } from '~hooks'

import {
	DefinitionType,
	useSetTargetCausalFactor,
	useSetTargetDefinition,
} from './index'

export function useOnSelectVariable(
	causalFactors: CausalFactor[],
	defineQuestion: Experiment,
	setDefineQuestion: SetterOrUpdater<Experiment>,
): (option: Maybe<IDropdownOption<any>>, columnName: string) => void {
	const onSaveCausalFactor = useAddOrEditFactor()
	const setCausalFactor = useSetTargetCausalFactor(
		onSaveCausalFactor,
		causalFactors,
	)
	const onSaveDefinition = useSaveDefinition(defineQuestion, setDefineQuestion)
	const setDefinition = useSetTargetDefinition(onSaveDefinition, defineQuestion)

	return useCallback(
		(option: Maybe<IDropdownOption<any>>, columnName: string) => {
			if (option?.data.type === DefinitionType.Factor) {
				setCausalFactor(option?.key as string, columnName)
			} else {
				setDefinition(option?.key as string, columnName)
			}
		},
		[setCausalFactor, setDefinition],
	)
}
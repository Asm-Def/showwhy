/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type {
	CausalFactor,
	FlatCausalFactor,
	Handler,
	Maybe,
	OptionalId,
} from '@showwhy/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useAddOrEditFactor } from '~hooks'
import { useCausalFactors, useSetCausalFactors } from '~state'
import { noop } from '~utils'
import { Pages } from '~types'

import { useSetDonePage } from './useSetPageDone'

interface PathData {
	path: Maybe<string>
	page: Maybe<string>
}

export function useBusinessLogic(): {
	factor: Maybe<CausalFactor>
	isEditing: boolean
	flatFactorsList: FlatCausalFactor[]
	page: Maybe<string>
	addFactor: (factor: OptionalId<CausalFactor>) => void
	editFactor: (factor: CausalFactor) => void
	deleteFactor: (factor: CausalFactor) => void
	setFactor: (factor: Maybe<CausalFactor>) => void
	setIsEditing: (value: boolean) => void
	goToFactorsPage: Handler
} {
	const causalFactors = useCausalFactors()
	const [factor, setFactor] = useState<CausalFactor>()
	const [isEditing, setIsEditing] = useState(false)

	const deleteFactor = useDeleteFactor()
	const editFactor = useEditFactor(setFactor, setIsEditing)
	const addFactor = useAddFactor(isEditing, setIsEditing, setFactor)
	const flatFactorsList = useFlatFactorsList(causalFactors)
	const [goToFactorsPage, factorsPathData] = useFactorsNavigation()
	useSetDonePage()

	return {
		factor,
		isEditing,
		flatFactorsList,
		addFactor,
		editFactor,
		deleteFactor,
		setFactor,
		setIsEditing,
		goToFactorsPage,
		page: factorsPathData?.page,
	}
}

function useDeleteFactor(): (factor: CausalFactor) => void {
	const causalFactors = useCausalFactors()
	const setCausalFactors = useSetCausalFactors()
	return useCallback(
		deletedFactor => {
			setCausalFactors(causalFactors.filter(v => v.id !== deletedFactor.id))
		},
		[causalFactors, setCausalFactors],
	)
}

function useEditFactor(
	setFactor: (factor: CausalFactor) => void,
	setIsEditing: (isEditing: boolean) => void,
): (factor: CausalFactor) => void {
	return useCallback(
		factorToEdit => {
			setFactor(factorToEdit)
			setIsEditing(true)
		},
		[setFactor, setIsEditing],
	)
}

function useAddFactor(
	isEditing: boolean,
	setIsEditing: (value: boolean) => void,
	setFactor: (factor: Maybe<CausalFactor>) => void,
): (factor: OptionalId<CausalFactor>) => void {
	const addOrEditFactor = useAddOrEditFactor()
	return useCallback(
		(newFactor: OptionalId<CausalFactor>) => {
			addOrEditFactor(newFactor)
			isEditing && setIsEditing(false)
			setFactor(undefined)
		},
		[addOrEditFactor, setIsEditing, isEditing, setFactor],
	)
}

function useFlatFactorsList(causalFactors: CausalFactor[]): FlatCausalFactor[] {
	return useMemo((): FlatCausalFactor[] => {
		return causalFactors.map((x: CausalFactor) => {
			return {
				id: x.id,
				variable: x.variable,
				description: x.description,
			}
		}) as FlatCausalFactor[]
	}, [causalFactors])
}

function useFactorsNavigation(): [Handler, PathData] {
	const history = useHistory()
	const [historyState, setHistoryState] = useState<string>()
	const factorsPathData = useFactorsPathData(historyState)
	useEffect(() => {
		history.location.state && setHistoryState(history.location.state as string)
	}, [history.location.state, setHistoryState])

	const goToFactorsPage = useCallback(() => {
		history.push(Pages.DefineFactors)
		setHistoryState(undefined)
	}, [factorsPathData, setHistoryState, history])

	return [factorsPathData?.path ? goToFactorsPage : noop, factorsPathData]
}

function useFactorsPathData(historyState: Maybe<string>): PathData {
	return useMemo((): PathData => {
		return {
			path: historyState,
			page: historyState?.replace(/[\/-]/g, ' '),
		}
	}, [historyState])
}

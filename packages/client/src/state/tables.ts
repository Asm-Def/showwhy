/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { useCallback } from 'react'
import {
	atom,
	Resetter,
	SetterOrUpdater,
	useRecoilValue,
	useResetRecoilState,
	useSetRecoilState,
} from 'recoil'
import { BasicTable } from '~interfaces'

const originalTablesState = atom<BasicTable[]>({
	key: 'original-tables-store',
	default: [],
	dangerouslyAllowMutability: true,
})

export function useSetOriginalTables(): SetterOrUpdater<BasicTable[]> {
	return useSetRecoilState(originalTablesState)
}

export function useOriginalTables(): BasicTable[] {
	return useRecoilValue(originalTablesState)
}

export function useSetOrUpdateOriginalTable(): (table: BasicTable) => void {
	const setOriginalTable = useSetRecoilState(originalTablesState)
	return useCallback(
		(table: BasicTable) => {
			setOriginalTable(prev => {
				return [...prev?.filter(i => i.tableId !== table.tableId), table]
			})
		},
		[setOriginalTable],
	)
}

export function useSelectOriginalTable(id: string): () => BasicTable {
	const tables = useRecoilValue(originalTablesState)

	return useCallback(() => {
		return tables?.find(t => t.tableId === id) as BasicTable
	}, [tables, id])
}

export function useResetOriginalTables(): Resetter {
	return useResetRecoilState(originalTablesState)
}
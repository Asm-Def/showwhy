/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Checkbox, Stack } from '@fluentui/react'
import { memo, useCallback } from 'react'

import type { ChartOptionsGroupProps } from './ChartOptionsGroup.types.js'

export const ChartOptionsGroup: React.FC<ChartOptionsGroupProps> = memo(
	function ChartOptionsGroup({ options, onChange }) {
		const {
			showSynthControl,
			applyIntercept,
			relativeIntercept,
			showMeanTreatmentEffect,
			showChartPerUnit,
		} = options

		const handleOnChange = useCallback(
			(opt: { [key: string]: boolean }) => {
				onChange({ ...options, ...opt })
			},
			[onChange, options],
		)

		return (
			<Stack tokens={{ childrenGap: 5 }}>
				<Checkbox
					label="Show synthetic control"
					checked={showSynthControl}
					onChange={(e, isChecked) =>
						handleOnChange({ showSynthControl: !!isChecked })
					}
				/>
				<Checkbox
					label="Align curves pretreatment"
					checked={applyIntercept}
					onChange={(e, isChecked) =>
						handleOnChange({ applyIntercept: !!isChecked })
					}
				/>
				<Checkbox
					label="Plot difference"
					checked={relativeIntercept}
					onChange={(e, isChecked) =>
						handleOnChange({ relativeIntercept: !!isChecked })
					}
				/>
				<Checkbox
					label="Show mean treatment"
					checked={showMeanTreatmentEffect}
					onChange={(e, isChecked) =>
						handleOnChange({ showMeanTreatmentEffect: !!isChecked })
					}
				/>
				<Checkbox
					label="Show chart per unit"
					checked={showChartPerUnit}
					onChange={(e, isChecked) =>
						handleOnChange({ showChartPerUnit: !!isChecked })
					}
				/>
			</Stack>
		)
	},
)

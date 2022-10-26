/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Toggle } from '@fluentui/react'
import { memo } from 'react'
import { useRecoilState } from 'recoil'

import {
	CorrelationThresholdState,
	StraightEdgesState,
	WeightThresholdState,
} from '../state/index.js'
import { ThresholdSlider } from './controls/ThresholdSlider.js'

export const ViewControls: React.FC = memo(function ViewControls() {
	const [useStraightEdges, setUseStraightEdges] =
		useRecoilState(StraightEdgesState)
	return (
		<>
			<Toggle
				label="Use straight edges"
				checked={useStraightEdges}
				onChange={(e, v) => setUseStraightEdges(Boolean(v))}
			/>
			<ThresholdSlider
				label={'Correlation Threshold'}
				width={200}
				thresholdState={CorrelationThresholdState}
			/>
			<ThresholdSlider
				label={'Edge Weight Threshold'}
				width={200}
				thresholdState={WeightThresholdState}
			/>
		</>
	)
})

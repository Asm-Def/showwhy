/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { renderHook } from '@testing-library/react-hooks'
import { RecoilRoot } from 'recoil'
import { Pages } from '../../common/enums'
import { stepsList } from '../../data/stepsList'
import * as steps from '../steps'

describe('stepsHooks', () => {
	it('useCurrentStep', () => {
		const expected = stepsList
			.flatMap(x => x.steps.filter(s => s.showStatus))
			.find(x => x.url === Pages.EstimateCausalEffects)

		const { result } = renderHook(
			() =>
				steps.useCurrentStepTestable(
					{ steps: stepsList },
					Pages.EstimateCausalEffects,
				),
			{
				wrapper: RecoilRoot,
			},
		)
		const response = result.current
		expect(response).toEqual(expected)
	})

	it('useStepsShowStatus', () => {
		const expected = stepsList.flatMap(x => x.steps.filter(s => s.showStatus))
		const { result } = renderHook(() => steps.useStepsShowStatus(), {
			wrapper: RecoilRoot,
		})
		const response = result.current
		expect(response).toEqual(expected)
	})
})
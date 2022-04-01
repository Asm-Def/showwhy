/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { test, expect, Page } from '@playwright/test'
import { createPageObjects, PageObjects } from '../pageObjects'

test.describe('Define Factors Page', () => {
	let page: Page
	let po: PageObjects

	test.beforeEach(async ({ browser }) => {
		const ctx = await browser.newContext()
		page = await ctx.newPage()
		po = createPageObjects(page)
	})

	test('Add factors causing exposure', async () => {
		await po.defineFactorsPage.open('cause-exposure')
		await po.defineFactorsPage.waitForLoad()
		await po.defineFactorsPage.goToAddNewFactor()
		await po.ModelDomainPage.addElement({ variable: 'Primary variable' })
		await po.ModelDomainPage.addElement({
			variable: 'Secondary variable',
		})
		await po.ModelDomainPage.goToBackToPage()
		const elements = await po.defineFactorsPage.countElements()
		await expect(elements).toEqual(2)
	})

	test('Add factors causing outcome', async () => {
		await po.defineFactorsPage.open('cause-outcome')
		await po.defineFactorsPage.waitForLoad()
		await po.defineFactorsPage.goToAddNewFactor()
		await po.ModelDomainPage.addElement({ variable: 'Primary variable' })
		await po.ModelDomainPage.addElement({
			variable: 'Secondary variable',
		})
		await po.ModelDomainPage.goToBackToPage()
		const elements = await po.defineFactorsPage.countElements()
		await expect(elements).toEqual(2)
	})
})

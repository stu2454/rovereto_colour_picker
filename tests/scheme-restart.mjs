import { createRequire } from 'node:module'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import assert from 'node:assert/strict'
const require = createRequire(process.env.DORRIGO_TEST_MODULES || import.meta.url)
const { chromium } = require('playwright')
const profile = await mkdtemp(join(tmpdir(), 'dorrigo-restart-'))
const options = { executablePath: process.env.DORRIGO_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true }
const url = process.env.DORRIGO_TEST_URL || 'http://127.0.0.1:5173'
let browser = await chromium.launchPersistentContext(profile, options)
try {
  let page = await browser.newPage()
  await page.goto(url)
  await page.getByRole('textbox', {name:'Scheme name',exact:true}).fill('Restart test')
  await page.getByRole('textbox', {name:'Weatherboards hex colour',exact:true}).fill('#F3ECDD')
  await page.getByRole('button', {name:'Save scheme',exact:true}).click()
  assert.match(await page.getByRole('status').textContent(), /Saved “Restart test”/)
  await page.getByRole('textbox', {name:'Weatherboards hex colour',exact:true}).fill('#123456')
  await browser.close()
  browser = await chromium.launchPersistentContext(profile, options)
  page = await browser.newPage()
  await page.goto(url)
  assert.equal(await page.getByRole('textbox', {name:'Scheme name',exact:true}).inputValue(),'Restart test')
  assert.equal(await page.getByRole('textbox', {name:'Weatherboards hex colour',exact:true}).inputValue(),'#123456')
  const saved = page.getByRole('region', {name:'Saved schemes'})
  assert.match(await saved.textContent(), /Restart test/)
  await saved.getByRole('button', {name:'Load scheme',exact:true}).click()
  assert.equal(await page.getByRole('textbox', {name:'Weatherboards hex colour',exact:true}).inputValue(),'#F3ECDD')
  assert.equal(await page.locator('[data-region="weatherboards"]').getAttribute('fill'),'#F3ECDD')
  console.log('PASS: browser process restarted; saved scheme, active colours and name persisted; Load scheme restored saved colours.')
} finally { await browser.close() }

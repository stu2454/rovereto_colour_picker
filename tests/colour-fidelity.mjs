import { createRequire } from 'node:module'
const require = createRequire(process.env.DORRIGO_TEST_MODULES || import.meta.url)
const { chromium } = require('playwright')
const { PNG } = require('pngjs')
import assert from 'node:assert/strict'
const browser = await chromium.launch({ executablePath: process.env.DORRIGO_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 2200, height: 1500 }, deviceScaleFactor: 1 })
const errors = []
page.on('pageerror', error => errors.push(error.message))
await page.goto(process.env.DORRIGO_TEST_URL || 'http://127.0.0.1:5173')
await page.locator('[data-layer="architectural-detail"]').waitFor()
// Render at canonical resolution so screenshot sample locations are exact.
await page.addStyleTag({content: 'main {max-width:none} .workspace {grid-template-columns:1474px 340px} .elevation-stage { width:1448px !important; height:1086px !important }'})
const stage = page.locator('.elevation-stage')
const field = page.getByRole('textbox', {name:'Weatherboards hex colour', exact:true})
const samples = [[100,140],[150,190],[850,240],[1400,550],[850,860]]
for (const hex of ['#F3ECDD','#FFFFFF','#000000']) {
  await field.fill(hex)
  await field.blur()
  assert.equal(await page.locator('[data-region="weatherboards"]').getAttribute('fill'),hex)
  for (const strength of ['0','0.7','1']) {
    await page.locator('input[type="range"]').fill(strength)
    const png = PNG.sync.read(await stage.screenshot())
    const expected = [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16))
    const values = samples.map(([x,y])=> [...png.data.slice((y*png.width+x)*4,(y*png.width+x)*4+3)])
    values.forEach(rgb=>rgb.forEach((value,i)=>assert.ok(Math.abs(value-expected[i])<=5,`${hex} ${strength}: ${rgb}`)))
    console.log(JSON.stringify({hex,strength,pixels:values}))
  }
}
await field.fill('#F3ECDD')
for (const [label,id,hex] of [['Front door','door','#123456'],['Door & sidelight trim','entryTrim','#ABCDEF'],['Window trim','windowTrim','#FEDCBA']]) {
  await page.getByRole('textbox',{name:`${label} hex colour`,exact:true}).fill(hex)
  assert.equal(await page.locator(`[data-region="${id}"]`).getAttribute('fill'),hex)
  assert.equal(await field.inputValue(),'#F3ECDD')
}
await page.getByRole('button',{name:'Save scheme',exact:true}).click()
assert.equal(await field.inputValue(),'#F3ECDD')
await field.fill('#FFFFFF')
assert.equal(await page.locator('[data-region="weatherboards"]').getAttribute('fill'),'#FFFFFF')
await page.reload()
await page.locator('[data-layer="architectural-detail"]').waitFor()
assert.equal(await field.inputValue(),'#FFFFFF')
assert.equal(await page.locator('[data-region="door"]').getAttribute('fill'),'#123456')
await page.getByRole('region', {name:'Preset schemes'}).locator('.scheme-card').first().getByRole('button').first().click()
await field.fill('#F3ECDD')
await field.focus()
await page.getByRole('checkbox',{name:'Inspect mask outlines'}).check()
console.log('Diagnostics:', await page.locator('.canvas-note').textContent())
assert.ok((await page.locator('.canvas-note').textContent()).includes('#F3ECDD'))
await page.getByRole('checkbox',{name:'Inspect mask outlines'}).uncheck()
await page.locator('input[type="range"]').fill('0.7')
await page.screenshot({path:process.env.DORRIGO_SCREENSHOT || '/private/tmp/dorrigo-colour-check.png',fullPage:true})
assert.deepEqual(errors,[])
console.log('PASS: region bindings, save/edit, preset/edit, refresh, diagnostics; no browser errors')
await browser.close()

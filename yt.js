const puppeteer = require('puppeteer')
const readline = require('readline-sync')

youtubeScrape = async() => {
	const browser = await puppeteer.launch({ headless: "New"})
	const page = await browser.newPage()

	console.log('Loading... \n')

	await page.goto('https://www.youtube.com')
	await page.waitForSelector('input#search')

	console.log('Welcome Master! \nMau cari video apa sekarang? \nJANGAN TULIS NAMA CHANEL \nmasih sering ngebug di Headless mode, jadi agak Gacha sih buat work enggaknya.')
	inputSearch = await readline.question("ketikan sesuatu >  ")

	await page.type('input#search', inputSearch)
	await page.keyboard.press("Enter")

	await page.waitForTimeout(1500)
	await page.click('#video-title > yt-formatted-string')

	await page.waitForTimeout(1500)
    judul = await page.$eval('#title > h1 > yt-formatted-string', el => el.innerText)
    await page.waitForTimeout(1500)
    view = await page.$eval('#info > span:nth-child(1)', el => el.textContent)
    await page.waitForTimeout(1500)
    rilis = await page.$eval('#info > span:nth-child(3)', el => el.textContent)
    await page.waitForTimeout(1500)
    await page.keyboard.press("Space")
    await page.$eval('#info > span:nth-child(1)', el => el.scrollIntoView({behavior: "smooth"}))
    await page.click('#description-inline-expander')
    await page.waitForTimeout(1500)
    deskripsi = await page.$eval('#description-inline-expander > yt-attributed-string', el => el.textContent, el => el.innerText)
    await page.$eval('#infocard-videos-button > ytd-button-renderer > yt-button-shape > a > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill', el => el.scrollIntoView({behavior: "smooth"}))
    chanel = await page.$eval('#owner > ytd-video-owner-renderer', el => el.innerText)

    console.log(`\nJUDUL: ${judul} \nVIEWS: ${view} \nRILIS pada: ${rilis} \n \n|* INFORMASI LAIN *|\n \n \nDESKRIPSI: \n<Desk>\n${deskripsi}\n</Desk> \n \nCHANEL: \n<Ch>\n${chanel}\n<Ch> \n`)

	// hasilSS = await page.screenshot({ path: './screenshot/hasil_screenshot.jpg' })

	browser.close()
	console.log('DONE! yatta~ \nfile di simpan di folder screenshot yaa')
    console.log('NOTE: harap tuliskan judul video yang spesifik.')
}

youtubeScrape()
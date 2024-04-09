const PORT = 8069
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

// const url = 'https://www.livechart.me/schedule/tv?titles=english&sortby=airdate'
const url = 'https://www.livechart.me/schedule'

app.get('/', function (req, res) {
    res.json('This is my webscraper')
})

app.get('/schedule', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            console.log(url)
            console.log(html)
            const $ = cheerio.load(html)
            const articles = []

            $('.lc-timetable-anime-block', html).each(function () { //<-- cannot be a function expression
                const title = $(this).data('schedule-anime-title');
                const id = $(this).data('schedule-anime-id');
                const airAt = $(this).data('schedule-anime-release-date-value');
                // const airAt = $(this).find('.episode-countdown').data('timestamp')
                articles.push({
                    id,
                    title,
                    airAt
                })
            })
            res.json(articles)
        }).catch(err => console.log(err))

})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))


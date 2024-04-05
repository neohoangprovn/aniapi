// const express = require('express')
// const cheerio = require('cheerio');
// const axios = require('axios');

// const app = express()
// const port = 3000



// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

// app.get('/schedule', (req, res) => {
//     const url = 'https://books.toscrape.com/catalogue/category/books/mystery_3/index.html';

//   async function getBooks() {
//     let books_data = [];
//     try {
//       const response = await axios.get(url);
//       const $=cheerio.load(response.data);
//       const genre = $('h1').text();
//       // console.log(genre);
      
//       books = $('article');
  
//       books.each(function() {
//         title = $(this).find('h3 a').text();
//         price = $(this).find('.price_color').text();
//         stock = $(this).find('.availability').text().trim();
  
//         books_data.push({title, price, stock});
//       });
  
//       console.log(books_data);
//       // return (books_data);
//     }
//     catch(error) {
//       console.error(error);
//     }

//     return (books_data);
//   }
  
//   let data = getBooks(url);
//   console.log(data);
//   res.send(data);
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const PORT = 80
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


const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://books.toscrape.com/catalogue/category/books/mystery_3/index.html';
const books_data = [];

async function getBooks() {
  try {
    const response = await axios.get(url);
    const $=cheerio.load(response.data);
    const genre = $('h1').text();
    console.log(genre);

    books = $('article');

    books.each(function() {
      title = $(this).find('h3 a').text();
      price = $(this).find('.price_color').text();
      stock = $(this).find('.availability').text().trim();

      books_data.push({title, price, stock});
    });

    console.log(books_data);
  }
  catch(error) {
    console.error(error);
  }
}

getBooks(url);
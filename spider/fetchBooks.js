const axios = require("axios").default;
const cheerio = require("cheerio");
const Book = require("../models/Book");

async function getBooksHTML() {
  const resp = await axios.get("https://book.douban.com/latest");
  return resp.data;
}

async function getBookLinks() {
  const html = await getBooksHTML();
  const $ = cheerio.load(html);
  const achorElements = $("#content .grid-16-8 li .media__img a");
  const links = achorElements
    .map((i, ele) => {
      const href = ele.attribs["href"];
      return href;
    })
    .get();
  return links;
}

async function getBookDetail(detailUrl) {
  const resp = await axios.get(detailUrl);
  const $ = cheerio.load(resp.data);
  const name = $("h1 span").text().trim();
  const imgUrl = $("#mainpic img").attr("src");
  const spans = $("#info span.pl");
  const authorSpan = spans.filter((i, ele) => {
    return $(ele).text().includes("作者");
  });
  const author = authorSpan.next("a").text();
  const publishSpan = spans.filter((i, ele) => {
    return $(ele).text().includes("出版年");
  });
  const publishDate = publishSpan[0].nextSibling.nodeValue.trim();
  return {
    name,
    imgUrl,
    publishDate,
    author
  };
}

async function fetchAll() {
  const links = await getBookLinks(); //得到书籍的详情页地址
  const proms = links.map((link) => {
    return getBookDetail(link);
  });
  return Promise.all(proms);
}

async function saveToDB() {
  const books = await fetchAll();
  await Book.bulkCreate(books);
  console.log("抓取数据并保存到了数据库");
}

saveToDB();

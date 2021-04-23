const fs = require("fs");
const puppeteer = require("puppeteer");

list = (req, res, next) => {
    try {
        fs.readFile("movies.json", "utf-8", (err, data) => {
            if (err) throw err;
            res.status(200).json({
                success: true,
                data: JSON.parse(data),
                message: "Movies list"
            })
        });
    }
    catch(e) {
        next(e)
    }
}

crawl = async (req, res, next) => {
    try {
        const url = "https://www.imdb.com/search/title/?count=100&groups=top_1000&sort=user_rating";

        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        
        await page.goto(url);

        const movies = await page.evaluate(async() => {
            const elements = Array.from(document.querySelectorAll(".lister-item"))
            return elements.map((movie) => (
                {
                    title: movie.querySelector(".lister-item-content > .lister-item-header > a").innerText,
                    genre: movie.querySelector(".lister-item-content > .text-muted > .genre").innerText,
                    description: movie.querySelector(".lister-item-content > p[class='text-muted']").innerText,
                    director: movie.querySelector(".lister-item-content > p:nth-child(5) a")?.innerText,
                    year: movie.querySelector(".lister-item-content > .lister-item-header > .lister-item-year").innerText,
                    certificate: movie.querySelector(".lister-item-content > .text-muted > .certificate")?.innerText,
                    rating: movie.querySelector(".lister-item-content > .ratings-bar > .ratings-imdb-rating > strong").innerText,
                    votes: movie.querySelector(".lister-item-content > .sort-num_votes-visible > span:nth-child(2)").innerText,
                    gross: movie.querySelector(".lister-item-content > .sort-num_votes-visible > span:nth-child(5)")?.innerText ?? null
                }
            ))
        })
        await browser.close();

        fs.writeFileSync("./movies.json", JSON.stringify(movies),(err) => {
            throw err;
        });

        res.status(200)
        .json({
            success: true,
            message: "Data crawled successfully"
        })
    }
    catch(e) {
        next(e)
    }
}

module.exports = {
    list,
    crawl
}
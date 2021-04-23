const fs = require("fs");

list = async(req, res, next) => {
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

module.exports = {
    list
}
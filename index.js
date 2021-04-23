const express = require('express')
const morgan = require('morgan')
const movieRouter = require('./routes/movie');

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
    console.log(" NODE_ENV ", process.env.NODE_ENV)
    console.log(" PORT ", process.env.PORT)
    app.use(morgan("dev"));
}

app.get('/', (req, res) => {
    res.send("Server is up")
})

// api routes
app.use(`/api/v1/movies`, movieRouter)

// error handler
app.use((err, req, res, next) => {
    console.log(" error ", err.stack)
    const stack = process.env.NODE_ENV === "development" ? err.stack : undefined
    res.status(500)
        .json({
            success: false,
            message: err.message || "Internal Server Error",
            stack
        })
})

app.listen(port, () => {
    console.log(`Credilio app listening at http://localhost:${port}`)
})
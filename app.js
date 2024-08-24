const express = require('express');
const app = express()
const path = require('path')
const fs = require('fs')
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get("/", function (req, res) {
    fs.readdir(`./hisaab`, function (err, files) {
        if (err) return res.status(500).send(err)
        res.render("index", { files: files })
    })

})
app.get("/create", ((req, res) => {
    res.render("create")
}))
app.get("/edit/:filename", ((req, res) => {
    fs.readFile(`./hisaab/${req.params.filename}`, "utf-8", function (err, filedata) {
        if (err) return res.status(500).send(err)
        res.render("edit", { filedata, filename: req.params.filename })
    })

}))
app.get("/hisaab/:filename", ((req, res) => {
    fs.readFile(`./hisaab/${req.params.filename}`, "utf-8", function (err, filedata) {
        if (err) return res.status(500).send(err)
        res.render("hisaab", { filedata, filename: req.params.filename })
    })

}))
app.get("/delete/:filename", ((req, res) => {
    fs.unlink(`./hisaab/${req.params.filename}`, function (err, filedata) {
        if (err) return res.status(500).send(err)
        res.redirect("/")
    })

}))
app.post("/createhisaab", ((req, res) => {
    var currentDate = new Date()
    var date = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`
    fs.writeFile(`./hisaab/${date}`, req.body.content, function (err) {
        if (err) return res.status(500).send(err)
        res.redirect("/")
    })
}))
app.post("/update/:filename", function (req, res) {
    fs.writeFile(`./hisaab/${req.params.filename}`, req.body.content, function (err) {
        if (err) return res.status(500).send(err)
        res.redirect("/")
    })
})

app.listen(3000)
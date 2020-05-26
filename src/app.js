const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000;
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// handlebars and viewpath setup
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// static rendering
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "Ajita",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Ajita",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Ajita",
    message: "To get help go through the commands given below.",
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ajita",
    errorMessage: "Help article  not found!",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address.",
    });
  }
  geoCode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "Provide search term" });
  }
  res.send({
    products: [],
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ajita",
    errorMessage: "Page not found!",
  });
});
app.listen(port, () => {
  console.log("Server is up and runnning on port " + port);
});

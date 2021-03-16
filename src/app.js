const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up handlebars engine and views location
app.use(express.static(publicDirectoryPath));
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// Set up static directory to serve

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Goran Cogic",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "Hopefully this is helpful",
    name: "Goran Cogic",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Goran Cogic",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) return res.send({ error });

    forecast(data?.latitude, data?.longitude, (error, forecast) => {
      if (error) res.send({ error });
      res.send({
        temperature: forecast.temperature,
        location: data.location,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Goran Cogic",
    errorMsg: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Page not found",
    name: "Goran Cogic",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port + "...");
});

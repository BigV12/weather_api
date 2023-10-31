const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

//the whole express app is wrapped up in this function below
const app = express();
const port = process.env.PORT || 3000;

//by dfault views folder in the root director should house all the handlebars(hbs) files.
// but incase you want to rename the folder follow the steps below

const viewsPath = path.join(__dirname, "../template/views");
//to configgure expressjs to serve up the directory we've created.
const publicDirectoryPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../template/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static director to serve
app.use(express.static(publicDirectoryPath));

//used to serve up our contents and all
app.get("", (req, res) => {
  //used to render one of our handlebars template
  res.render("index", {
    title: "Weather",
    name: "ikenna,",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "ikenna",
    info: "this is an about page",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help for you",
    name: "ikenna",
  });
});

app.get("/help/*", (req, res) => {
  //   res.send("help article not found");
  res.render("help404", {
    title: "404",
    errorMessage: "help article  not found",
  });
});

//WEATHER PAGE

app.get("/weather", (req, res) => {
  if (!req.query.adress) {
    return res.send({
      error: "please provide an adress",
    });
  }

  geocode(req.query.adress, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      const adress = req.query.adress;
      const forecast = forecastData;

      res.send({ forecast, location, adress });
    });
  });
});

//product page
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    product: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "page not found",
  });
});

//app.com
//app.com/help
//app.com/about

// app.get("/help", (req, res) => {
//   res.send([{ name: "andrew", age: 27 }]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1> About Page</h1>");
// });

// app.listen(3000, () => {
//   console.log("server is up on port 3000");
// });

app.listen(port, () => {
  console.log("server is up on port " + port);
});

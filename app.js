if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const MongoDBStore = require("connect-mongo")(session);

const userRoutes = require("./routes/users");
const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//     "mongodb+srv://harialta:RLlinKtaHtdWyA4Q@peakpoint.9zxqlfi.mongodb.net/?retryWrites=true&w=majority&appName=PeakPoint";

// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     },
// });

// async function run() {
//     try {
//         await client.connect();
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/ToThePeak";
mongoose
    .connect(dbUrl)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((e) => console.log(e));
const db = mongoose.connection;

const app = express();

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
// app.use(mongoSanitize());

// const scriptSrcUrls = [
//     "https://cdn.jsdelivr.net",
//     "https://unpkg.com",
//     "https://api.mapbox.com",
//     "https://cdnjs.cloudflare.com",
//     "https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js",
// ];
// const styleSrcUrls = [
//     "https://cdn.jsdelivr.net",
//     "https://unpkg.com",
//     "https://api.mapbox.com",
//     "https://fonts.googleapis.com",
//     "https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css",
// ];
// const connectSrcUrls = ["https://api.mapbox.com", "https://events.mapbox.com"];
// const fontSrcUrls = ["https://fonts.gstatic.com"];

// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             defaultSrc: [],
//             connectSrc: ["'self'", ...connectSrcUrls],
//             scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
//             styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//             workerSrc: ["'self'", "blob:"],
//             objectSrc: [],
//             imgSrc: [
//                 "'self'",
//                 "blob:",
//                 "data:",
//                 "https://res.cloudinary.com", // Example image CDN
//                 "https://images.unsplash.com",
//                 "https://b.tile.openstreetmap.org",
//                 "https://unpkg.com",
//                 "https://a.tile.openstreetmap.org",
//                 "https://c.tile.openstreetmap.org",
//             ],
//             fontSrc: ["'self'", ...fontSrcUrls],
//         },
//     })
// );

const secret = process.env.SECRET || "thisshouldbeabettersecret";

const store = new MongoDBStore({
    url: dbUrl,
    secret: secret,
    touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e);
});

const sessionConfig = {
    store,
    name: "session",
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
};
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use("/", userRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

app.get("/", (req, res) => {
    res.render("home");
});

app.all("/*splat", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong";
    res.status(statusCode).render("error", { err });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});

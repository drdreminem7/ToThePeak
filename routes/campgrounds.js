const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const multer = require("multer");
const { storage } = require("./../cloudinary");
const upload = multer({ storage });
const router = express.Router();

const catchAsync = require("./../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("./../middleware");

const campgrounds = require("./../controllers/campgrounds");

router
    .route("/")
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, upload.array("image"), catchAsync(campgrounds.createCampground));

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
    .route("/:id")
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, upload.array("image"), catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;

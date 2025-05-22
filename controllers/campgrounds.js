const Campground = require("./../models/campground");
const { cloudinary } = require("./../cloudinary");

module.exports.index = async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
    res.render("campgrounds/new");
};

module.exports.createCampground = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
    if (!campground.images.length) {
        const response = await fetch(
            "https://api.unsplash.com/photos/random?client_id=f-OrHpT1Yb87V3U2Bm_DnI8aPNLqRFQePXMY80e-c3g"
        );
        const data = await response.json();
        campground.images = [{ url: data.urls.small, filename: data.urls.small }];
    }
    campground.author = req.user._id;
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${campground.location}`,
        { headers: { "User-Agent": "YourAppName" } } // Required!
    );
    const geoData = await response.json();
    campground.coordinates = [geoData[0].lat, geoData[0].lon];
    await campground.save();
    console.log(campground);
    req.flash("success", "Successfully made a new campground!");
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.showCampground = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("author");
    if (!campground) {
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
};

module.exports.renderEditForm = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground });
};

module.exports.updateCampground = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, req.body.campground, { new: true });
    const images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
    campground.images.push(...images);
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${campground.location}`,
        { headers: { "User-Agent": "YourAppName" } } // Required!
    );
    const geoData = await response.json();
    campground.coordinates = [geoData[0].lat, geoData[0].lon];
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) await cloudinary.uploader.destroy(filename);
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
    if (!campground.images.length) {
        const response = await fetch(
            "https://api.unsplash.com/photos/random?client_id=f-OrHpT1Yb87V3U2Bm_DnI8aPNLqRFQePXMY80e-c3g"
        );
        const data = await response.json();
        campground.images = [{ url: data.urls.small, filename: data.urls.small }];
    }
    await campground.save();
    req.flash("success", "Successfully updated campground!");
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCampground = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted campground!");
    res.redirect("/campgrounds");
};

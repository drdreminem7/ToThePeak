const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose
    .connect("mongodb://localhost:27017/yelp-camp")
    .then(() => {
        console.log("Database Connected");
    })
    .catch((e) => console.log(e));
const db = mongoose.connection;

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    let res = await fetch(
        "https://api.unsplash.com/collections/483251/photos?client_id=f-OrHpT1Yb87V3U2Bm_DnI8aPNLqRFQePXMY80e-c3g&per_page=30"
    );
    let data = await res.json();
    for (let i = 0; i < 30; i += 2) {
        const random1000 = Math.floor(Math.random() * 1000 + 1);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "681362278dcb7892df7448eb",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(places)} ${sample(descriptors)}`,
            description:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae, fugit voluptate? Nobis aliquid, tempora at modi laboriosam fugit deserunt illum quasi corrupti delectus, commodi rem ad similique. Culpa, sequi nostrum.",
            price: price,
            images: [
                {
                    url: data[i].urls.regular,
                    filename: "YelpCamp/y6xlwbipflolqptebieo",
                },
                {
                    url: data[i + 1].urls.regular,
                    filename: "YelpCamp/y6xlwbipflolqptebieos",
                },
            ],
        });
        // const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${camp.location}`, {
        //     headers: { "User-Agent": "YourAppName" },
        // });
        // const geoData = await response.json();
        camp.coordinates = [cities[random1000].latitude, cities[random1000].longitude];
        await camp.save();
    }
    res = await fetch(
        "https://api.unsplash.com/collections/483251/photos?client_id=f-OrHpT1Yb87V3U2Bm_DnI8aPNLqRFQePXMY80e-c3g&page=2&per_page=30"
    );
    data = await res.json();
    for (let i = 0; i < 30; i += 2) {
        const random1000 = Math.floor(Math.random() * 1000 + 1);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "681362278dcb7892df7448eb",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(places)} ${sample(descriptors)}`,
            description:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae, fugit voluptate? Nobis aliquid, tempora at modi laboriosam fugit deserunt illum quasi corrupti delectus, commodi rem ad similique. Culpa, sequi nostrum.",
            price: price,
            images: [
                {
                    url: data[i].urls.regular,
                    filename: "YelpCamp/y6xlwbipflolqptebieo",
                },
                {
                    url: data[i + 1].urls.regular,
                    filename: "YelpCamp/y6xlwbipflolqptebieos",
                },
            ],
        });
        // const response = await fetch(
        //     `https://nominatim.openstreetmap.org/search?format=json&q=${camp.location}`,
        //     { headers: { "User-Agent": "YourAppName" } } // Required!
        // );
        // const geoData = await response.json();
        camp.coordinates = [cities[random1000].latitude, cities[random1000].longitude];
        await camp.save();
    }
    res = await fetch(
        "https://api.unsplash.com/collections/483251/photos?client_id=f-OrHpT1Yb87V3U2Bm_DnI8aPNLqRFQePXMY80e-c3g&page=3&per_page=30"
    );
    data = await res.json();
    for (let i = 0; i < 20; i += 2) {
        const random1000 = Math.floor(Math.random() * 1000 + 1);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "681362278dcb7892df7448eb",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(places)} ${sample(descriptors)}`,
            description:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae, fugit voluptate? Nobis aliquid, tempora at modi laboriosam fugit deserunt illum quasi corrupti delectus, commodi rem ad similique. Culpa, sequi nostrum.",
            price: price,
            images: [
                {
                    url: data[i].urls.regular,
                    filename: "YelpCamp/y6xlwbipflolqptebieo",
                },
                {
                    url: data[i + 1].urls.regular,
                    filename: "YelpCamp/y6xlwbipflolqptebieos",
                },
            ],
        });
        // const response = await fetch(
        //     `https://nominatim.openstreetmap.org/search?format=json&q=${camp.location}`,
        //     { headers: { "User-Agent": "YourAppName" } } // Required!
        // );
        // const geoData = await response.json();
        camp.coordinates = [cities[random1000].latitude, cities[random1000].longitude];
        await camp.save();
    }
    res = await fetch(
        "https://api.unsplash.com/collections/483251/photos?client_id=f-OrHpT1Yb87V3U2Bm_DnI8aPNLqRFQePXMY80e-c3g&page=4&per_page=30"
    );
    data = await res.json();
    for (let i = 0; i < 20; i += 2) {
        const random1000 = Math.floor(Math.random() * 1000 + 1);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "681362278dcb7892df7448eb",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(places)} ${sample(descriptors)}`,
            description:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae, fugit voluptate? Nobis aliquid, tempora at modi laboriosam fugit deserunt illum quasi corrupti delectus, commodi rem ad similique. Culpa, sequi nostrum.",
            price: price,
            images: [
                {
                    url: data[i].urls.regular,
                    filename: "YelpCamp/y6xlwbipflolqptebieo",
                },
                {
                    url: data[i + 1].urls.regular,
                    filename: "YelpCamp/y6xlwbipflolqptebieos",
                },
            ],
        });
        // const response = await fetch(
        //     `https://nominatim.openstreetmap.org/search?format=json&q=${camp.location}`,
        //     { headers: { "User-Agent": "YourAppName" } } // Required!
        // );
        // const geoData = await response.json();
        camp.coordinates = [cities[random1000].latitude, cities[random1000].longitude];
        await camp.save();
    }

    const camp = new Campground({
        author: "681362278dcb7892df7448eb",
        title: "Bezbog Hut",
        images: [
            {
                url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Bezbog_Hut.jpg",
                filename: "Bezbog_Hut.jpg",
            },
            {
                url: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Bezbog_Hut_Pirin.jpg",
                filename: "Bezbog_Hut_Pirin.jpg",
            },
        ],
        coordinates: [41.7, 23.55],
        price: 25,
        description:
            "Bezbog Hut is located in the Pirin Mountains, near the Bezbog Lake. It serves as a starting point for various hiking trails and offers basic accommodation for mountain enthusiasts.",
        location: "Pirin Mountains, Bulgaria",
    });
    await camp.save();
};

seedDB()
    .then(() => db.close())
    .catch((e) => console.log(e));

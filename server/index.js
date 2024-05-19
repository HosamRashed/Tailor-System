const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
// const { fileURLToPath } = require("url");
// const authRoutes = require("./routes/auth.js");
// const userRoutes = require("./routes/users.js");
// const postRoutes = require("./routes/posts.js");
const shopsRoutes = require("./routes/shops.js");
// const { register } = require("./controllers/auth.js");
// const { createPost } = require("./controllers/posts.js");
// const { verifyToken } = require("./middleware/auth.js");
const Costumers = require("./models/Customer.js"); // Note the correct spelling "Customers" instead of "Costumers"
const Shops = require("./models/Shops.js");
const Customer = require("./models/Customer.js");

/* CONFIGURATIONS */
// // const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// /* FILE STORAGE */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/assets");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage });

// /* ROUTES WITH FILES */
// app.post("/auth/register", upload.single("picture"), register);
// app.post("/posts", verifyToken, upload.single("picture"), createPost);

// /* ROUTES */
app.use("/shops", shopsRoutes);
// app.use("/auth", authRoutes);
// app.use("/custumers", postRoutes);

// const customerData = [
//   {
//     fullName: "John Doe",
//     phoneNumber: "1234567890",
//     measurments: [
//       {
//         status: true,
//         Date: new Date(),
//         NumberOfThoabs: 2,
//         totalPrice: 100,
//         partialPaid: 50,
//         paymentCompleted: false,
//         hight: 175,
//         shoulder: 45,
//         arm: {
//           Length: 60,
//           WidthTopPart: 30,
//           WidthMiddlePart: 25,
//         },
//         wrist: {
//           Hight: 20,
//           width: 15,
//           shapeType: "Regular",
//         },
//         bodyWith: 80,
//         chestWidth: 90,
//         bottomThobWidth: 100,
//         Neck: {
//           typeOfNeck: "V-neck",
//           width: 10,
//           hight: 5,
//         },
//         jbjorHight: 50,
//         additionalRequiements: "None",
//       },
//     ],
//   },
//   {
//     fullName: "Jane Smith",
//     phoneNumber: "0987654321",
//     measurments: [
//       {
//         status: false,
//         Date: new Date(),
//         hight: 160,
//         shoulder: 40,
//         arm: {
//           Length: 55.5,
//           WidthTopPart: 28,
//           WidthMiddlePart: 23,
//         },
//         wrist: {
//           Hight: 18,
//           width: 13,
//           shapeType: "Regular",
//         },
//         bodyWith: 75,
//         chestWidth: 85,
//         bottomThobWidth: 95,
//         Neck: {
//           typeOfNeck: "Round-neck",
//           width: 8,
//           hight: 4,
//         },
//         jbjorHight: 45,
//         additionalRequiements: "Add a pocket",
//       },
//     ],
//   },
// ];

// // Create dummy data for Shops schema
// const shopData = [
//   {
//     shopID: "1",
//     shopName: "Tailor Shop 1",
//     shopPhoneNumber: "1111111111",
//     shopAddress: "123 Main Street",
//     customers: customerData,
//   },
// ];

// // Insert dummy data into the database
// async function insertDummyData() {
//   try {
//     // Insert customers
//     const insertedCustomers = await Customer.insertMany(customerData);

//     // Insert shops
//     const insertedShops = await Shops.insertMany(shopData);

//     console.log("Dummy data inserted successfully!");
//   } catch (error) {
//     console.error("Error inserting dummy data:", error);
//   } finally {
//     // Disconnect from MongoDB
//     mongoose.disconnect();
//   }
// }

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // insertDummyData();
    /* ADD DATA ONE TIME */
    // Shops.insertMany(dummyData)
    //   .then(() => {
    //     console.log("Dummy data inserted successfully");
    //   })
    //   .catch((err) => {
    //     console.error("Error inserting dummy data", err);
    //   });
  })
  .catch((error) => console.log(`${error} did not connect`));

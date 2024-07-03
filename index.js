const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb+srv://Rudra:Romil@cluster2.xpldfji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2").then(() =>
  console.log("Mongodb connected")
);

app.use(express.json());

app.use("/url", urlRoute);

// app.get("/:shortId", async (req, res) => {
//   const shortId = req.params.shortId;
//   const entry = await URL.findOneAndUpdate(
//     {
//       shortId,
//     },
//     {
//       $push: {
//         visitHistory: {
//           timestamp: Date.now(),
//         },
//       },
//     }
//   );
//   res.redirect(entry.redirectURL);
// });
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (entry) {
    // If entry exists, redirect to the specified URL
    res.redirect(entry.redirectURL);
  } else {
    // Handle the case when entry is null
    // For example, show an error message or redirect to a default URL
    res.status(404).send("URL not found"); // You can customize the error response
  }
});


app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));

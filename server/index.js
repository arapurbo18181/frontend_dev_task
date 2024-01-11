// server.js
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "https://frontend-dev-task-two.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
mongoose
  .connect(
    "mongodb+srv://task:admin1234@cluster0.wqwbcyk.mongodb.net/attachments?retryWrites=true&w=majority"
  )
  .then(() => console.log(`Mongodb connected`))
  .catch((err) => console.log(err));

const Attachment = mongoose.model("Attachment", {
  userId: String,
  text: String,
  filename: String,
  originalname: String,
  mimetype: String,
  size: Number,
});

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.array("attachments"), async (req, res) => {
    const { userId, text } = req.body;
    const files = req.files;
    const attachments = [];
    console.log(files);
    
  if (files.length != 0) {
    for (const file of files) {
      const attachment = new Attachment({
        userId,
        text,
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      });
      attachments.push(attachment);
      await attachment.save();
    }
    res.json({ success: true, attachments });
  } else {
    res.json({
      success: false,
      message: "Plz add a file",
    });
  }
});

app.get(`/count/:id/:text`, async (req, res) => {
  const count = await Attachment.countDocuments({
    userId: req.params.id,
    text: req.params.text,
  });
  res.json({ count });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

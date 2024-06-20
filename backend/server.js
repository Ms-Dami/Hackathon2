import express from "express";
import cors from "cors";
import "dotenv/config";
import fs from "fs";
import crypto from "crypto";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8081;

const readDictionaryFile = () => {
  const dictionaryFile = fs.readFileSync("./data/dictionary.json");
  const dictionaryData = JSON.parse(dictionaryFile);
  return dictionaryData;
};

app.get("/tips", (req, res) => {
  const tipsData = readDictionaryFile();

  if (tipsData) {
    res.json(tipsData);
  } else {
    res.status(404).send(`Couldn't fetch tips`);
  }
});

const writeTipFile = (data) => {
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync("./data/dictionary.json", stringifiedData);
};

app.post("/tips", (req, res) => {
  const tipData = readDictionaryFile();

  const newTip = {
    id: crypto.randomUUID(),
    category: req.body.category,
    term: req.body.term,
    description: req.body.description,
    username: req.body.username,
  };

  tipData.push(newTip);
  writeTipFile(tipData);

  res.status(201).json(newTip);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

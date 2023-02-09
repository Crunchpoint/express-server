const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 8080;
require("dotenv").config();

const apiKey = process.env.REACT_APP_API_KEY;

app.use(cors());

const dataUrl = `http://openapi.seoul.go.kr:8088/${apiKey}/json/culturalEventInfo/1/1000/`;
const dataUrl2 = `http://openapi.seoul.go.kr:8088/${apiKey}/json/culturalEventInfo/1001/2000/`;
const dataUrl3 = `http://openapi.seoul.go.kr:8088/${apiKey}/json/culturalEventInfo/2001/3000/`;
const dataUrl4 = `http://openapi.seoul.go.kr:8088/${apiKey}/json/culturalEventInfo/3001/4000/`;
const dataUrl5 = `http://openapi.seoul.go.kr:8088/${apiKey}/json/culturalSpaceInfo/1/1000/`;

app.get("/data", (req, res) => {
  axios
    .all([axios.get(dataUrl), axios.get(dataUrl2), axios.get(dataUrl3), axios.get(dataUrl4), axios.get(dataUrl5)])
    .then(
      axios.spread((res1, res2, res3, res4, res5) => {
        const data1 = [...res1.data.culturalEventInfo.row, ...res2.data.culturalEventInfo.row, ...res3.data.culturalEventInfo.row, ...res4.data.culturalEventInfo.row];
        const data2 = res5.data.culturalSpaceInfo.row;
        const combinedData = [data1, data2];
        res.json(combinedData);
      })
    )
    .catch((error) => {
      console.error(error);
      res.status(500).send({ error: "An error occured while fetching data" });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

/*
==================================
NORMALIZE PHONE
==================================
*/

function normalizePhone(phone) {

  if (!phone) return "";

  return phone
    .replace(/\D/g, "")
    .replace(/^8/, "7");

}

/*
==================================
GET CLIENTS
==================================
*/

app.get("/api/clients", async (req, res) => {

  try {

    const response = await axios.get(
      `https://api.yclients.com/api/v1/company/${process.env.YCLIENTS_COMPANY_ID}/clients/`,
      {
        headers: {
          "Accept": "application/vnd.yclients.v2+json",
          "Authorization":
            `Bearer ${process.env.YCLIENTS_PARTNER_TOKEN}, User ${process.env.YCLIENTS_USER_TOKEN}`
        }
      }
    );

    const clients = response.data.data.map(client => {

      return {
        name: client.name || "Без имени",
        phone: normalizePhone(client.phone),
        offer: false,
        contract: false
      };

    });

    res.json(clients);

  } catch (error) {

    console.log(error.response?.data || error.message);

    res.status(500).json({
      error: "Ошибка загрузки YCLIENTS"
    });

  }

});

/*
==================================
START
==================================
*/

app.listen(process.env.PORT, () => {

  console.log(`
==================================
SERVER STARTED
http://localhost:${process.env.PORT}
==================================
  `);

});

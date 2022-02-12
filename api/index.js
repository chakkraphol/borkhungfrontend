import axios from "axios";
const express = require("express");
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

axios.defaults.timeout = 2000;

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  axios
    .post(`${process.env.BASE_API_URL}/login`, {
      username: username,
      password: password,
    })
    .then((result) => {
      return res.json(result.data);
    })
    .catch((err) => {
      return res.status(200).json({
        message: err,
      });
    });
});
router.post("/getmember", (req, res) => {
  const { start, limit } = req.body;
  axios
    .get(`${process.env.BASE_API_URL}/member`, {
      params: {
        start: req.body.start,
        limit: req.body.limit,
      },
      headers: { token: req.headers.token },
    })
    .then((result) => {
      return res.json(result.data);
    })
    .catch((err) => {
      return res.status(200).json({
        message: err,
      });
    });
});
router.post("/getround", (req, res) => {
  const { start, limit } = req.body;
  axios
    .get(`${process.env.BASE_API_URL}/round`, {
      params: {
        start: req.body.start,
        limit: req.body.limit,
      },
      headers: { token: req.headers.token },
    })
    .then((result) => {
      return res.json(result.data);
    })
    .catch((err) => {
      return res.status(200).json({
        message: err,
      });
    });
});
app.use(router);
module.exports = {
  path: "/api",
  handler: app,
};

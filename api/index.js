import axios from "axios";
import querystring from "query-string";
const express = require("express");
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

axios.defaults.timeout = 20000;

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
router.post("/getroundbyid", (req, res) => {
  axios
    .get(`${process.env.BASE_API_URL}/round/` + req.body.id, {
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
router.post("/getmemberall", (req, res) => {
  axios
    .get(`${process.env.BASE_API_URL}/member/all`, {
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
router.post("/addround", (req, res) => {
  axios
    .post(`${process.env.BASE_API_URL}/round`, req.body, {
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
router.post("/addbet", (req, res) => {
  axios
    .post(`${process.env.BASE_API_URL}/bet`, req.body.data, {
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
router.post("/delbet", (req, res) => {
  axios
    .post(`${process.env.BASE_API_URL}/bet/del`, req.body, {
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
router.post("/getbet", (req, res) => {
  axios
    .get(
      `${process.env.BASE_API_URL}/bet?round_id=` +
        req.body.round_id +
        "&bet=" +
        req.body.bet,
      {
        headers: { token: req.headers.token },
      }
    )
    .then((result) => {
      return res.json(result.data);
    })
    .catch((err) => {
      return res.status(200).json({
        message: err,
      });
    });
});
router.post("/getmembertoday", (req, res) => {
  axios
    .get(`${process.env.BASE_API_URL}/bet/reportmember?date=` + req.body.date, {
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
router.post("/getbetmember", (req, res) => {
  axios
    .get(
      `${process.env.BASE_API_URL}/bet/member?${querystring.stringify(
        req.body
      )}`,
      {
        headers: { token: req.headers.token },
      }
    )
    .then((result) => {
      return res.json(result.data);
    })
    .catch((err) => {
      return res.status(200).json({
        message: err,
      });
    });
});
router.post("/updateresult", (req, res) => {
  axios
    .post(`${process.env.BASE_API_URL}/round/updateresult`, req.body, {
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
router.post("/roundgetbydate", (req, res) => {
  axios
    .get(
      `${process.env.BASE_API_URL}/round/getbydate?${querystring.stringify(
        req.body
      )}`,
      {
        headers: { token: req.headers.token },
      }
    )
    .then((result) => {
      return res.json(result.data);
    })
    .catch((err) => {
      return res.status(200).json({
        message: err,
      });
    });
});
router.post("/addmember", (req, res) => {
  axios
    .post(`${process.env.BASE_API_URL}/member`, req.body, {
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
router.post("/getmemberbyid", (req, res) => {
  axios
    .get(`${process.env.BASE_API_URL}/member/` + req.body.id, {
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
router.post("/updatemember", (req, res) => {
  axios
    .post(`${process.env.BASE_API_URL}/member/updatemember`, req.body, {
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
router.post("/updateround", (req, res) => {
  axios
    .post(`${process.env.BASE_API_URL}/round/update`, req.body, {
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
router.post("/delmember", (req, res) => {
  axios
    .post(`${process.env.BASE_API_URL}/member/deletemember`, req.body, {
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
router.post("/delround", (req, res) => {
  console.log(req.body);
  axios
    .post(`${process.env.BASE_API_URL}/round/deleteround`, req.body, {
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

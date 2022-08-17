const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const cors = require("cors");
const axios = require("axios");
const corsOption = {
  origin: "127.0.0.1:5503",
  credential: true,
};

app.set("view engine", "ejs");
app.use(
  cors({
    origin: "http://127.0.0.1:5503",
    credential: true,
  })
);
app.use(express.json()); // json을 리턴하려면 작성해야함
app.use(express.static(path.join(__dirname, "/public"))); //정적파일css,js,img 등등 서비스
// 라우팅기법

// send() 글자만보내주기 html붙여널기도가능,단순,수정어려움
// sendFile(path.join) - 파일만보내주기,정적인기법
// render() - 동적인기법,데이터보내주기도가능 ex) render:("index", {title:"aaa"}) 불러올땐 <%= title%>
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/introduce", (req, res) => {
  // console.log(myName);
  res.render("introduce");
});
app.get("/greeting", (req, res) => {
  res.render("greeting");
});
app.get("/philosophy", (req, res) => {
  res.render("philosophy");
});
app.get("/history", (req, res) => {
  res.render("history");
});
// app.get("/ci", (req, res) => {
//   res.render("ci");
// });
app.get("/location", (req, res) => {
  res.render("location");
});
app.get("/companyMap", (req, res) => {
  res.render("companyMap");
});
app.get("/estimate", (req, res) => {
  res.render("estimate");
});
app.get("/write", (req, res) => {
  res.render("write");
});
app.get("/notice", (req, res) => {
  res.render("notice");
});
app.get("/view", (req, res) => {
  res.render("view");
});
app.get("/market", (req, res) => {
  res.render("market");
});
app.get("/list", (req, res) => {
  // res.send("list입니다.");
  // res.header("Access-Control-Allow-Origin", "*");
  //다른곳에서json데이터내려받을때 동봉하면 잘받아짐(엑세스허용) "*" ->모든곳에허용
  // "특정도메인주소" -> 특정도메인만 허용하고 싶으면 주소쓰기
  // cors설치해서 require로 가져와서 쓰면 위에거 다안써도됌
  res.json([
    { title: "타이틀 01", contents: "내용1입니다." },
    { title: "타이틀 02", contents: "내용2입니다." },
    { title: "타이틀 03", contents: "내용3입니다." },
    { title: "타이틀 04", contents: "내용4입니다." },
    { title: "타이틀 05", contents: "내용5입니다." },
    { title: "타이틀 06", contents: "내용6입니다." },
  ]);
});
app.get("/naver", (req, res) => {
  // 여기서 검색결과를 받아서 리턴해야한다.
  // ajax를 naver proxy
  // promise 기반
  const queryTxt = encodeURIComponent(req.query.movieTitle);
  console.log(req.query);
  axios({
    url: `https://openapi.naver.com/v1/search/movie.json?query=${queryTxt}`,
    headers: {
      "X-Naver-Client-Id": "775S2Y6x8tZKZ77mA7e_",
      "X-Naver-Client-Secret": "RpyHT_zjC4",
    },
  }).then(function (response) {
    // console.log(response.data.movieTitle);
    res.json(response.data);
  });
});

// 404 routing 오류
app.use((req, res, next) => {
  res.status(404).render("404");
});
app.use((err, req, res, next) => {
  res.status(500).render("error", { msg: "An unknown error occurred." });
});

app.listen(8099, () => {
  console.log(`8099에서 서버 대기중`);
});

"use strict";

//모듈
const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); //환경변수 관리 (OS에 상관없이 환경변수 등록, 관리 가능하게 함)

const app = express();

//라우팅
const home = require("./src/routes/home");

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));

app.use(express.json());
app.use(express.urlencoded());

app.use("/", home); // use : 미들 웨어를 등록해주는 메서드

module.exports = app;
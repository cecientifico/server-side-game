import express from "express";
import cors from "cors";
import { ObjectId } from "bson";
import { PrismaClient } from "@prisma/client";
import {
  createUser,
  searchUser,
  newResult,
  getUserResults,
  getAllResults,
} from "./databaseOperations";
const prisma = new PrismaClient();

const id = new ObjectId();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.get("/", async (request, response) => {
  response.status(200).json({ connected: true });
});

server.post("/handle-user", async (request, response) => {
  console.log(request.body);
  try {
    const { userName, userEmail, userID } = request.body;
    const user = await searchUser(userID);
    if (user === null) {
      const newUser = await createUser({ userName, userEmail, userID });
      return response.status(200).json({ user: newUser });
    }
    response.status(200).json({ user: user });
  } catch (error: any) {
    response.status(400).json({ msg: "Erro Inesperado!" });
  }
});

server.post("/new-result", async (request, response) => {
  const { userName, userEmail, userID, userResult } = request.body;
  const user = await searchUser(userID);
  if (user !== null) {
    const result = await newResult({ userName, userEmail, userID }, userResult);
    return response.status(200).json({ result: result });
  }
  return response.status(400).json({ error: "User not found!" });
});

server.get("/user-results/:userID", async (request, response) => {
  console.log(request.params.userID);
  try {
    const { userID } = request.params;
    const user = await searchUser(userID);
    if (user !== null) {
      const results = await getUserResults(userID);
      return response.status(200).json({ result: results });
    }
    return response
      .status(400)
      .json({ error: "O usuário não foi encontrado!" });
  } catch (error: any) {
    response.status(400).json({ msg: "Erro Inesperado!" });
  }
});

server.post("/all-results", async (request, response) => {
  const results = await getAllResults();
  response.status(200).json({ results: results });
});

server.listen(3000);

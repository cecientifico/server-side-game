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
  // getAllResults,
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
  try {
    const { userName, userEmail, userID} = request.body;
    const user = await searchUser(userID);
    if (user === null) {
      const newUser = await createUser({ userName, userEmail, userID});
      return response.status(200).json({ user: newUser });
    }
    response.status(200).json({ user: user });
  } catch (error: any) {
    response.status(400).json({ msg: "Erro Inesperado!" });
  }
});

server.post("/new-result", async (request, response) => {
  try {
    const { userName, userEmail, userID, userResult, modality } = request.body;
    const user = await searchUser(userID);
    if (user !== null) {
      const result = await newResult({ userName, userEmail, userID }, modality, userResult.toString());
      return response.status(200).json({ result: result });
    }
    return response.status(400).json({ error: "User not found!" });
  } catch(error) {
    response.status(400).json({ msg: "Erro Inesperado!" });
  }
});

server.get("/user-results/:modality/:userID", async (request, response) => {
  try {
    const { modality, userID } = request.params;
    const user = await searchUser(userID);
    if (user !== null) {
      const results = await getUserResults(userID, modality);
      return response.status(200).json({ result: results });
    }
    return response
      .status(400)
      .json({ error: "O usuário não foi encontrado!" });
  } catch (error: any) {
    response.status(400).json({ msg: "Erro Inesperado!" });
  }
});

server.get("/all-results/:modality", async (request, response) => {
  try {
    const modality = request.params.modality;
    const results = await getAllResults(modality);
    response.status(200).json({ results: results });
  } catch(error) {
    response.status(400).json({ msg: "Erro Inesperado!" });
  }
});


server.get('/check', async(request, response) => {
  response.status(200).send('ok')
})
server.listen(process.env.PORT || '3000');

import express from "express";
import cors from 'cors';
import { ObjectId } from 'bson';
import { PrismaClient } from '@prisma/client';
import { createUser, searchUser, newResult, getUserResults, getAllResults } from './databaseOperations';
import { request } from "http";
const prisma = new PrismaClient()

const id = new ObjectId()

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.post('/handle-user', async (request, response) => {
  const { userName, userEmail, userID } = request.body;
  const user = await searchUser(userID)
  if (user === null) {
    const newUser = await createUser({ userName, userEmail, userID })
    return response.status(200).json({ user: newUser })
  }
  response.status(400).json({ user: user })
})

server.post('/new-result', async (request, response) => {
  const { userName, userEmail, userID, userResult } = request.body;
  const user = await searchUser(userID);
  if (user !== null) {
    const result = await newResult({ userName, userEmail, userID }, userResult)
    return response.status(200).json({ result: result })
  }
  return response.status(400).json({ error: 'User not found!' })
})

server.post('/user-results', async (request, response) => {
  const { userName, userEmail, userID, userResult } = request.body;
  const user = await searchUser(userID);
  if (user !== null) {
    const results = await getUserResults(userID)
    return response.status(400).json({ result: results })
  }
  return response.status(400).json({ error: 'User not found!' })
})

server.post('/all-results', async (request, response) => {
  const results = await getAllResults();
  response.status(200).json({ results: results })
})

server.listen(3000)
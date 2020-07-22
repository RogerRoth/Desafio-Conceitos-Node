const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

//Lista todos os repositorios
app.get("/repositories", (request, response) => {
  return response.json( repositories );
});

//Adiciona repositorio na lista
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  let newRep = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(newRep);

  return response.status(200).json(newRep);
});

//Atualiza repositorios
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)

  if(repositorieIndex == -1){

    return response.status(400).json({ error: "Repositorie not found" });
    
  }

  if(title != ""){
    repositories[repositorieIndex].title = title;
  }

  if(url != ""){
    repositories[repositorieIndex].url = url;
  }

  if(techs != ""){
    repositories[repositorieIndex].techs = techs;
  }

  return response.status(200).json(repositories[repositorieIndex]);
});

//Remove Repositorio
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)

  if(repositorieIndex == -1){

    return response.status(400).json({ error: "Repositorie not found" });
    
  }
  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();

});

//Adiciona Like no repositorio
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)

  
  if(repositorieIndex == -1){

    return response.status(400).json({ error: "Repositorie not found" });
    
  }

  repositories[repositorieIndex].likes = repositories[repositorieIndex].likes + 1;

  return response.status(200).json(repositories[repositorieIndex]);
});

module.exports = app;

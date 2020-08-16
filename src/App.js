import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function getData() {
    api
      .get("/repositories")
      .then((response) => {
        setRepositories(response.data);
      })
      .catch((err) => {
        alert("Erro ao recuperar Repositórios", err);
      });
  }

  useEffect(() => {
    getData();
    return () => {
      console.log("limpou");
    };
  }, [setRepositories]);

  async function handleAddRepository() {
    await api
      .post("repositories", {
        id: 123,
        title: "Novo",
        techs: ["Novo", "React"],
      })
      .then((response) => {
        setRepositories((prev) => [response.data, ...prev]);
      })
      .catch((err) => alert("Erro ao adicionar Repositório", err));
    // TODO
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);
    setRepositories((prev) => prev.filter((repo) => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories &&
          repositories.map((repo) => (
            <li key={repo.id}>
              {repo.title}

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>
      {/*       <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /> */}
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

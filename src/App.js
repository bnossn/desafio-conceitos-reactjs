import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    // List repositories
    api.get(('repositories')).then(response => {
      setRepositories(response.data);
    });

  }, []);

  async function handleAddRepository() {
    // TODO

    const response = await api.post('repositories', {
      title: `Desafio ReactJS ${Date.now()}`,
      url: "https://github.com/bnossn/desafio-conceitos-node",
      techs: ["Node.js", "React"]
    })

    const newRepository = response.data;

    setRepositories(prevRepoList => ([...prevRepoList, newRepository]));
    
  }

  async function handleRemoveRepository(id) {
    // TODO
    try {

      await api.delete(`/repositories/${id}`);

      const repoIndex = repositories.findIndex(repository => repository.id === id);

      const newRepoList = repositories;
      newRepoList.splice(repoIndex, 1);

      setRepositories([...newRepoList]);

    } catch(e){
      console.log(e);
    };

  }

  return (
    <div>
      <ul data-testid="repository-list">
        
          {repositories.map(repository => {

            return (
              <li key={repository.id} >
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            );
          })}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

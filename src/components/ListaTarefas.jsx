import logo from "../assets/logo.png";
import { useState, useEffect } from "react";

function ListaTarefas() {
    const [tarefas, setTarefas] = useState(() => {
        const tarefasSalvas = localStorage.getItem("tarefas");
        return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
      });
      
    const [novaTarefa, setNovaTarefa] = useState('');
    const [ordenacao, setOrdenacao] = useState('data');

    const adicionarTarefa = () => {
      if (novaTarefa.trim() !== '') {
          setTarefas([...tarefas, {
              id: crypto.randomUUID(), 
              texto: novaTarefa,
              concluida: false,
              data: new Date().toISOString()
          }]);
          setNovaTarefa(''); 
        }
      };
  

      const removerTarefa = (id) => {
        setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
    };
    
    const alternarConclusao = (id) => {
        const novasTarefas = tarefas.map((tarefa) => {
            if (tarefa.id === id) {
                return { ...tarefa, concluida: !tarefa.concluida };
            }
            return tarefa;
        });
        setTarefas(novasTarefas);
    };
    

    useEffect(() => {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
      }, [tarefas]);
      
      const tarefasOrdenadas = [...tarefas];

      if (ordenacao === 'alfabetica') {
        tarefasOrdenadas.sort((a, b) => a.texto.localeCompare(b.texto));
      } else if (ordenacao === 'data') {
        tarefasOrdenadas.sort((a, b) => new Date(b.data) - new Date(a.data)); // mais recente primeiro
      }    
      
    return (
        <div>
            <h2 className="listah2">Lista de Tarefas</h2>
            <div className="bentoQ">
            <img src={logo} alt="Descrição da imagem" className="imagem"/>
            </div>
            <div className="principal">
                <input
                  className="input"
                  type="text"
                  value={novaTarefa}
                  onChange={(e) => setNovaTarefa(e.target.value)}
                  placeholder="Digite uma novo tarefa"
                  />
                <button onClick={adicionarTarefa} className="botao">Adicionar</button>
            <div style={{ marginTop: '1rem' }}>
                <label style={{ color: 'white', marginRight: '10px' }}>Ordenar por:</label>
                <select
                    value={ordenacao}
                    onChange={(e) => setOrdenacao(e.target.value)}
                    className="input"
                    style={{ width: '200px' }}
                >
                <option value="data">Data de Adição</option>
                <option value="alfabetica">Ordem Alfabética</option>
                </select>
            </div>
        </div>
        <ul className="ul">
          {tarefasOrdenadas.map((tarefa) => (
            <li
              key={tarefa.id}
              className={`li ${tarefa.concluida ? 'concluida' : ''}`}
            >
            {tarefa.texto}
            <button
                onClick={() => alternarConclusao(tarefa.id)}
                className="botao2"
            >
            {tarefa.concluida ? 'Desmarcar' : 'Concluir'}
            </button>
            <button
                onClick={() => removerTarefa(tarefa.id)}
                className="botao2"
            >
                Remover
            </button>
            </li>
          ))}
        </ul>

        </div>
    )
}

export default ListaTarefas;
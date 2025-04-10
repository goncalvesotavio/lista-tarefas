// Importando o logo da pasta de assets e os hooks useState e useEffect do React
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";

// Função principal que representa o componente da lista de tarefas
function ListaTarefas() {
  // Estado para armazenar a lista de tarefas, inicializando com dados do localStorage
  const [tarefas, setTarefas] = useState(() => {
    // Verificando se há tarefas salvas no localStorage
    const tarefasSalvas = localStorage.getItem("tarefas");
    // Se houver tarefas salvas, converte de JSON para objeto, caso contrário, inicia como lista vazia
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });

  // Estado para armazenar o texto da nova tarefa que será adicionada
  const [novaTarefa, setNovaTarefa] = useState('');
  
  // Estado para controlar o critério de ordenação
  const [ordenacao, setOrdenacao] = useState('data');

  // Função para adicionar uma nova tarefa
  const adicionarTarefa = () => {
    // Verifica se o texto da nova tarefa não está vazio ou apenas com espaços em branco
    if (novaTarefa.trim() !== '') {
      // Adiciona a nova tarefa com um ID único gerado e o horário atual
      setTarefas([
        ...tarefas,
        {
          id: crypto.randomUUID(), // Gera um ID único para cada tarefa
          texto: novaTarefa,       // O texto da tarefa
          concluida: false,        // Estado inicial de "não concluída"
          data: new Date().toISOString() // Data de adição 
        }
      ]);
      // Limpa o campo de texto após adicionar a tarefa
      setNovaTarefa('');
    }
  };

  // Função para remover uma tarefa com base no seu ID
  const removerTarefa = (id) => {
    // Filtra a lista de tarefas, removendo a tarefa com o ID fornecido
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  };

  // Função para alternar o estado de conclusão de uma tarefa
  const alternarConclusao = (id) => {
    // Mapeia todas as tarefas para alterar a tarefa específica pelo ID
    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        // Inverte o estado de concluída
        return { ...tarefa, concluida: !tarefa.concluida };
      }
      return tarefa;
    });
    // Atualiza o estado com a nova lista de tarefas
    setTarefas(novasTarefas);
  };

  // useEffect que será acionado sempre que o estado 'tarefas' for alterado salvando a lista de tarefas no localStorage
  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]); 

  // Ordena as tarefas de acordo com o critério selecionado no estado ordenacao
  const tarefasOrdenadas = [...tarefas];

  // Se a ordenação for por ordem alfabética, ordena pelo texto das tarefas
  if (ordenacao === 'alfabetica') {
    tarefasOrdenadas.sort((a, b) => a.texto.localeCompare(b.texto));
  } // Se a ordenação for data, ordena do mais recente para o mais antigo
  else if (ordenacao === 'data') {
    tarefasOrdenadas.sort((a, b) => new Date(b.data) - new Date(a.data));
  }

  // Retorno do componente 
  return (
    <div>
      <h2 className="listah2">Lista de Tarefas</h2>
      <div className="bentoQ">
        <img src={logo} alt="Descrição da imagem" className="imagem" />
      </div>
      <div className="principal">
        <input
          className="input"
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)} 
          placeholder="Digite uma nova tarefa"
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
  );
}

export default ListaTarefas;

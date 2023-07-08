import { useContext } from 'react'
import { HistoryContent, HistoryList, Status } from './styles'
import { CyclesContext } from '../../Contexts/CyclesContext'

export function History() {
  const { cycles } = useContext(CyclesContext)
  return (
    <HistoryContent>
      <h1>Meu historico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>20 minustos</td>
              <td>Há 2 meses</td>
              <Status statusColor="green">Concluido</Status>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minustos</td>
              <td>Há 2 meses</td>
              <Status statusColor="green">Concluido</Status>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minustos</td>
              <td>Há 2 meses</td>
              <Status statusColor="green">Concluido</Status>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minustos</td>
              <td>Há 2 meses</td>
              <Status statusColor="green">Concluido</Status>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minustos</td>
              <td>Há 2 meses</td>
              <Status statusColor="green">Concluido</Status>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minustos</td>
              <td>Há 2 meses</td>
              <Status statusColor="green">Concluido</Status>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minustos</td>
              <td>Há 2 meses</td>
              <Status statusColor="green">Concluido</Status>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minustos</td>
              <td>Há 2 meses</td>
              <Status statusColor="green">Concluido</Status>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minustos</td>
              <td>Há 2 meses</td>
              <Status statusColor="green">Concluido</Status>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minustos</td>
              <td>Há 2 meses</td>
              <Status statusColor="green">Concluido</Status>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minustos</td>
              <td>Há 2 meses</td>
              <Status statusColor="green">Concluido</Status>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContent>
  )
}

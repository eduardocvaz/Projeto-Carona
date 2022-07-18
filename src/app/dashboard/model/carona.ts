import {Usuario} from "./usuario";

export interface Carona {
  id: number;
  titulo: string;
  local_partida: string;
  local_destino: string;
  horario_partida: string;
  horario_chegada: string;
  ajudaCombustivel: boolean;
  usuario: Usuario;
}

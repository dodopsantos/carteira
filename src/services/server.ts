import { api } from './api';

export type ServerStatus = {
  online: boolean;
  uptime: number;       // em segundos
  cps: number;          // ciclos por segundo
  connectedClients: number;
  onlineCount: number;
};

export async function getServerStatus(): Promise<ServerStatus> {
  const response = await api.get<ServerStatus>('/server/status');
  return response.data;
}

export interface Paciente {
  id: string;
  nome: string;
  idade: number;
  foto: string;
  medicamentos: Medicacao[];
  contato?: string;
  observacoes?: string;
}

export interface Medicacao {
  id: string;
  nome: string;
  dosagem: string;
  horarios: string[];
  instrucoes?: string;
  estoque: number;
  estoqueMinimo: number;
  cor: string[];
  ativo: boolean;
  dataInicio: Date;
  dataFim?: Date;
}

export interface HistoricoMedicacao {
  id: string;
  medicacaoId: string;
  pacienteId: string;
  dataHora: Date;
  tomado: boolean;
  observacoes?: string;
}

export interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: 'medicacao' | 'estoque' | 'consulta' | 'lembrete';
  dataHora: Date;
  lida: boolean;
  medicacaoId?: string;
  pacienteId?: string;
}

export interface Configuracoes {
  notificacoesPush: boolean;
  lembretesSonoros: boolean;
  modoEscuro: boolean;
  intervaloPadrao: number; // em minutos
  lembreteAntecipado: number; // em minutos
  backupAutomatico: boolean;
}
import { Medicacao, Paciente } from '@/types';

// Dados de exemplo para demonstração
export const pacientesDemo: Paciente[] = [
  {
    id: '1',
    nome: 'Maria Santos',
    idade: 78,
    foto: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    medicamentos: [],
    contato: '(11) 99999-1234',
    observacoes: 'Hipertensa, diabética tipo 2',
  },
  {
    id: '2',
    nome: 'João Silva',
    idade: 82,
    foto: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    medicamentos: [],
    contato: '(11) 99999-5678',
    observacoes: 'Cardiopata, colesterol alto',
  },
];

export const medicacoesDemo: Medicacao[] = [
  {
    id: '1',
    nome: 'Losartana',
    dosagem: '50mg',
    horarios: ['08:00', '20:00'],
    instrucoes: 'Tomar com água, pode ser com comida',
    estoque: 28,
    estoqueMinimo: 7,
    cor: ['#4A90E2', '#357ABD'],
    ativo: true,
    dataInicio: new Date('2024-01-01'),
  },
  {
    id: '2',
    nome: 'Metformina',
    dosagem: '850mg',
    horarios: ['08:00', '19:00'],
    instrucoes: 'Tomar durante ou após as refeições',
    estoque: 45,
    estoqueMinimo: 10,
    cor: ['#7ED321', '#5BA617'],
    ativo: true,
    dataInicio: new Date('2024-01-01'),
  },
  {
    id: '3',
    nome: 'Atorvastatina',
    dosagem: '20mg',
    horarios: ['20:00'],
    instrucoes: 'Tomar à noite, preferencialmente no mesmo horário',
    estoque: 15,
    estoqueMinimo: 5,
    cor: ['#BD10E0', '#9013BE'],
    ativo: true,
    dataInicio: new Date('2024-01-15'),
  },
];

export const calcularProximaDose = (medicacao: Medicacao): Date | null => {
  const agora = new Date();
  const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  
  for (const horario of medicacao.horarios) {
    const [horas, minutos] = horario.split(':').map(Number);
    const proximaDose = new Date(hoje);
    proximaDose.setHours(horas, minutos, 0, 0);
    
    if (proximaDose > agora) {
      return proximaDose;
    }
  }
  
  // Se não há mais doses hoje, retorna a primeira dose de amanhã
  const amanha = new Date(hoje);
  amanha.setDate(amanha.getDate() + 1);
  const [horas, minutos] = medicacao.horarios[0].split(':').map(Number);
  amanha.setHours(horas, minutos, 0, 0);
  
  return amanha;
};

export const verificarEstoqueBaixo = (medicacao: Medicacao): boolean => {
  return medicacao.estoque <= medicacao.estoqueMinimo;
};

export const calcularDiasRestantes = (medicacao: Medicacao): number => {
  const dosesDeHoje = medicacao.horarios.length;
  return Math.floor(medicacao.estoque / dosesDeHoje);
};
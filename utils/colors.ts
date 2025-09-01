export const Colors = {
  // Cores principais
  primary: '#4A90E2',
  primaryDark: '#357ABD',
  secondary: '#7ED321',
  secondaryDark: '#5BA617',
  
  // Cores de status
  success: '#7ED321',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#4A90E2',
  
  // Gradientes por categoria de medicamento
  cardiovascular: ['#4A90E2', '#357ABD'],
  diabetes: ['#7ED321', '#5BA617'],
  colesterol: ['#BD10E0', '#9013BE'],
  pressao: ['#FF9500', '#E8890A'],
  dor: ['#FF3B30', '#D70015'],
  vitaminas: ['#FFD60A', '#FFB800'],
  
  // Cores neutras
  background: '#121212',
  surface: '#1e1e1e',
  surfaceVariant: '#2a2a2a',
  outline: '#333',
  
  // Texto
  onPrimary: '#fff',
  onSurface: '#fff',
  onSurfaceVariant: '#888',
  onBackground: '#fff',
};

export const getGradientByCategory = (categoria: string): string[] => {
  switch (categoria.toLowerCase()) {
    case 'cardiovascular':
    case 'coração':
      return Colors.cardiovascular;
    case 'diabetes':
    case 'glicemia':
      return Colors.diabetes;
    case 'colesterol':
      return Colors.colesterol;
    case 'pressão':
    case 'hipertensão':
      return Colors.pressao;
    case 'dor':
    case 'analgésico':
      return Colors.dor;
    case 'vitamina':
    case 'suplemento':
      return Colors.vitaminas;
    default:
      return Colors.cardiovascular;
  }
};
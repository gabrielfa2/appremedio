import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  FlatList, // 1. Importar FlatList e Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Clock, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { pacientesDemo } from '../../utils/medicamentos'; // 2. Importar os dados dos pacientes

// ... (interface Medicacao continua a mesma)
interface Medicacao {
  id: string;
  nome: string;
  dosagem: string;
  horario: string;
  paciente: string;
  tomado: boolean;
  cor: string[];
}

// Adicionando um tipo para o paciente selecionado
type PacienteSelecionado = { id: string; nome: string };

export default function HomeScreen() {
  const router = useRouter();
  // 3. State para controlar o paciente selecionado. Inicia com "Todos".
  const [pacienteSelecionado, setPacienteSelecionado] = useState<PacienteSelecionado>({ id: 'todos', nome: 'Todos' });
  const [medicacoes, setMedicacoes] = useState<Medicacao[]>([
    {
      id: '1',
      nome: 'Losartana',
      dosagem: '50mg',
      horario: '08:00',
      paciente: 'Maria Santos', // Paciente correspondente ao nome em pacientesDemo
      tomado: true,
      cor: ['#4A90E2', '#357ABD'],
    },
    {
      id: '2',
      nome: 'Metformina',
      dosagem: '850mg',
      horario: '12:00',
      paciente: 'João Silva', // Paciente correspondente ao nome em pacientesDemo
      tomado: false,
      cor: ['#7ED321', '#5BA617'],
    },
    {
      id: '3',
      nome: 'Atorvastatina',
      dosagem: '20mg',
      horario: '20:00',
      paciente: 'Maria Santos', // Paciente correspondente ao nome em pacientesDemo
      tomado: false,
      cor: ['#BD10E0', '#9013BE'],
    },
  ]);
  
  // 4. Filtrar medicamentos com base no paciente selecionado
  const medicacoesFiltradas = pacienteSelecionado.id === 'todos'
    ? medicacoes
    : medicacoes.filter(med => med.paciente === pacienteSelecionado.nome);

  const proximasMedicacoes = medicacoesFiltradas.filter(med => !med.tomado);
  const medicacaoesTomadas = medicacoesFiltradas.filter(med => med.tomado);

  const adicionarNovoMedicamento = () => {
    Alert.alert(
      'Novo Medicamento',
      'Esta funcionalidade será implementada em breve. Você poderá cadastrar novos medicamentos de forma simples e rápida.',
      [{ text: 'OK' }]
    );
  };
  
  const irParaDetalhes = (medicacaoId: string) => {
    router.push(`/medicamento/${medicacaoId}`);
  };

  // 5. Adicionar a opção "Todos" à lista de pacientes para o seletor
  const listaSelecaoPacientes = [{ id: 'todos', nome: 'Todos', foto: '' }, ...pacientesDemo];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Boa tarde!</Text>
            <Text style={styles.subtitle}>Como estão seus familiares?</Text>
          </View>
        </View>

        {/* 6. Seção do Seletor de Pacientes */}
        <View style={styles.pacienteSelectorSection}>
          <FlatList
            data={listaSelecaoPacientes}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isSelected = item.id === pacienteSelecionado.id;
              return (
                <TouchableOpacity 
                  style={styles.pacienteSelectItem} 
                  onPress={() => setPacienteSelecionado({ id: item.id, nome: item.nome })}
                >
                  <View style={[styles.pacienteAvatarContainer, isSelected && styles.pacienteAvatarSelected]}>
                    {item.id === 'todos' ? (
                      <Users size={24} color={isSelected ? '#fff' : '#888'} />
                    ) : (
                      <Image source={{ uri: item.foto }} style={styles.pacienteAvatar} />
                    )}
                  </View>
                  <Text style={[styles.pacienteSelectNome, isSelected && styles.pacienteSelectNomeSelected]}>
                    {item.nome.split(' ')[0]} 
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        
        {/* Status Cards */}
        <View style={styles.statusSection}>
          {/* ... (código dos status cards sem alteração) ... */}
        </View>

        {/* Próximas Medicações */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Próximas Medicações</Text>
            <Text style={styles.sectionSubtitle}>Hoje</Text>
          </View>
          {proximasMedicacoes.map(medicacao => (
            // ... (código do card de medicação sem alteração) ...
          ))}
        </View>

        {/* Medicações Tomadas */}
        {medicacaoesTomadas.length > 0 && (
           // ... (código do card de medicação tomada sem alteração) ...
        )}
      </ScrollView>

      {/* Botão Flutuante */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={adicionarNovoMedicamento}>
        <LinearGradient
          colors={['#4A90E2', '#357ABD']}
          style={styles.floatingGradient}>
          <Plus size={28} color="#fff" strokeWidth={2.5} />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... (estilos existentes)
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },

  // 7. Novos estilos para o seletor de pacientes
  pacienteSelectorSection: {
    marginBottom: 24,
  },
  pacienteSelectItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  pacienteAvatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  pacienteAvatarSelected: {
    borderColor: '#4A90E2',
  },
  pacienteAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
  },
  pacienteSelectNome: {
    color: '#888',
    fontWeight: '500',
    fontSize: 14,
  },
  pacienteSelectNomeSelected: {
    color: '#fff',
  },
  // ... (resto dos estilos)
});
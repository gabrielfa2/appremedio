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
  FlatList, // Importado para a lista de pacientes
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Clock, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { pacientesDemo } from '../../utils/medicamentos'; // Importando os dados dos pacientes

interface Medicacao {
  id: string;
  nome: string;
  dosagem: string;
  horario: string;
  paciente: string;
  tomado: boolean;
  cor: string[];
}

// Tipo para o estado do paciente selecionado
type PacienteSelecionado = { id: string; nome: string };

export default function HomeScreen() {
  const router = useRouter();
  // Estado para controlar o paciente selecionado, começando com "Todos"
  const [pacienteSelecionado, setPacienteSelecionado] = useState<PacienteSelecionado>({ id: 'todos', nome: 'Todos' });
  const [medicacoes, setMedicacoes] = useState<Medicacao[]>([
    {
      id: '1',
      nome: 'Losartana',
      dosagem: '50mg',
      horario: '08:00',
      paciente: 'Maria Santos',
      tomado: true,
      cor: ['#4A90E2', '#357ABD'],
    },
    {
      id: '2',
      nome: 'Metformina',
      dosagem: '850mg',
      horario: '12:00',
      paciente: 'João Silva',
      tomado: false,
      cor: ['#7ED321', '#5BA617'],
    },
    {
      id: '3',
      nome: 'Atorvastatina',
      dosagem: '20mg',
      horario: '20:00',
      paciente: 'Maria Santos',
      tomado: false,
      cor: ['#BD10E0', '#9013BE'],
    },
  ]);

  // Filtra a lista de medicamentos com base no paciente que foi selecionado
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

  // Cria a lista para o seletor, adicionando um item "Todos" no início
  const listaSelecaoPacientes = [{ id: 'todos', nome: 'Todos', foto: '' }, ...pacientesDemo];

  return (
    <SafeAreaView style={styles.container}>
      {/* O ScrollView agora começa depois do seletor para que o seletor não role junto */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Boa tarde, Cuidante!</Text>
          <Text style={styles.subtitle}>Como estão seus assistidos?</Text>
        </View>
      </View>

      {/* Seção do Seletor de Pacientes */}
      <View style={styles.pacienteSelectorSection}>
        <FlatList
          data={listaSelecaoPacientes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20 }}
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Status Cards */}
        <View style={styles.statusSection}>
          <View style={styles.statusGrid}>
            <View style={styles.statusCard}>
              <View style={[styles.statusIcon, { backgroundColor: '#E3F2FD' }]}>
                <Clock size={20} color="#4A90E2" />
              </View>
              <Text style={styles.statusNumber}>{proximasMedicacoes.length}</Text>
              <Text style={styles.statusLabel}>Pendentes</Text>
            </View>
            <View style={styles.statusCard}>
              <View style={[styles.statusIcon, { backgroundColor: '#E8F5E8' }]}>
                <CheckCircle size={20} color="#7ED321" />
              </View>
              <Text style={styles.statusNumber}>{medicacaoesTomadas.length}</Text>
              <Text style={styles.statusLabel}>Concluídas</Text>
            </View>
            <View style={styles.statusCard}>
              <View style={[styles.statusIcon, { backgroundColor: '#FFF3E0' }]}>
                <AlertTriangle size={20} color="#FF9500" />
              </View>
              <Text style={styles.statusNumber}>2</Text>
              <Text style={styles.statusLabel}>Em falta</Text>
            </View>
          </View>
        </View>

        {/* Próximas Medicações */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Próximas Medicações</Text>
            <Text style={styles.sectionSubtitle}>{pacienteSelecionado.nome}</Text>
          </View>

          {proximasMedicacoes.map(medicacao => (
             <TouchableOpacity
              key={medicacao.id}
              style={styles.medicacaoCard}
              onPress={() => irParaDetalhes(medicacao.id)}
            >
              <View style={styles.cardContainer}>
                <Image
                  source={require('../../assets/images/teste.jpg')}
                  style={styles.cardImage}
                />
                <LinearGradient
                  colors={[medicacao.cor[0], 'transparent']}
                  style={styles.gradientOverlay}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 0.8, y: 0.5 }}
                >
                  <View style={styles.medicacaoContent}>
                    <View style={styles.medicacaoInfo}>
                      <Text style={styles.medicacaoNome}>{medicacao.nome}</Text>
                      <Text style={styles.medicacaoDosagem}>{medicacao.dosagem}</Text>
                      <View style={styles.horarioContainer}>
                        <Clock size={14} color="rgba(255,255,255,0.8)" />
                        <Text style={styles.medicacaoHorario}>{medicacao.horario}</Text>
                      </View>
                      <Text style={styles.medicacaoPaciente}>Para: {medicacao.paciente}</Text>
                    </View>
                    <View style={styles.statusContainer}>
                      <View style={styles.pendingIndicator} />
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Medicações Tomadas */}
        {medicacaoesTomadas.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Concluídas Hoje</Text>
            </View>

            {medicacaoesTomadas.map(medicacao => (
              <TouchableOpacity
                key={medicacao.id}
                style={styles.medicacaoCard}
                onPress={() => irParaDetalhes(medicacao.id)}
              >
                <View style={[styles.medicacaoContainer, { backgroundColor: medicacao.cor[0] }]}>
                  <View style={styles.medicacaoContent}>
                    <View style={styles.medicacaoInfo}>
                      <Text style={styles.medicacaoNome}>{medicacao.nome}</Text>
                      <Text style={styles.medicacaoDosagem}>{medicacao.dosagem}</Text>
                      <View style={styles.horarioContainer}>
                        <Clock size={14} color="rgba(255,255,255,0.8)" />
                        <Text style={styles.medicacaoHorario}>{medicacao.horario}</Text>
                      </View>
                      <Text style={styles.medicacaoPaciente}>Para: {medicacao.paciente}</Text>
                    </View>
                    <View style={styles.statusContainer}>
                      <CheckCircle size={24} color="rgba(255,255,255,0.9)" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    paddingHorizontal: 20,
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
  statusSection: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusCard: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statusNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  medicacaoCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    minHeight: 120,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardImage: {
    position: 'absolute',
    width: '100%',
    height: '150%',
    top: -40,
    resizeMode: 'cover',
    opacity: 0.3,
  },
  gradientOverlay: {
    padding: 20,
    height: '100%',
    justifyContent: 'center',
  },
  medicacaoContainer: {
    padding: 20,
    minHeight: 120,
    justifyContent: 'center',
  },
  medicacaoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicacaoInfo: {
    flex: 1,
  },
  medicacaoNome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  medicacaoDosagem: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
    fontWeight: '500',
  },
  horarioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  medicacaoHorario: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    marginLeft: 6,
  },
  medicacaoPaciente: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    elevation: 8,
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  floatingGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
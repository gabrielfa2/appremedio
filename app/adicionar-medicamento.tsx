import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Clock, Pill, User, Save, Plus, Minus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { pacientesDemo } from '../utils/medicamentos';

export default function AdicionarMedicamentoScreen() {
  const router = useRouter();
  const [nomeMedicamento, setNomeMedicamento] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [instrucoes, setInstrucoes] = useState('');
  const [pacienteSelecionado, setPacienteSelecionado] = useState('');
  const [horarios, setHorarios] = useState(['08:00']);
  const [estoque, setEstoque] = useState('30');
  const [estoqueMinimo, setEstoqueMinimo] = useState('7');
  const [corSelecionada, setCorSelecionada] = useState(['#4A90E2', '#357ABD']);

  const coresDisponiveis = [
    { nome: 'Azul', cores: ['#4A90E2', '#357ABD'] },
    { nome: 'Verde', cores: ['#7ED321', '#5BA617'] },
    { nome: 'Roxo', cores: ['#BD10E0', '#9013BE'] },
    { nome: 'Laranja', cores: ['#FF9500', '#E8890A'] },
    { nome: 'Vermelho', cores: ['#FF3B30', '#D70015'] },
    { nome: 'Amarelo', cores: ['#FFD60A', '#FFB800'] },
  ];

  const adicionarHorario = () => {
    if (horarios.length < 6) {
      setHorarios([...horarios, '12:00']);
    }
  };

  const removerHorario = (index: number) => {
    if (horarios.length > 1) {
      const novosHorarios = horarios.filter((_, i) => i !== index);
      setHorarios(novosHorarios);
    }
  };

  const atualizarHorario = (index: number, novoHorario: string) => {
    const novosHorarios = [...horarios];
    novosHorarios[index] = novoHorario;
    setHorarios(novosHorarios);
  };

  const salvarMedicamento = () => {
    if (!nomeMedicamento.trim() || !dosagem.trim() || !pacienteSelecionado) {
      Alert.alert(
        'Campos Obrigatórios',
        'Por favor, preencha o nome do medicamento, dosagem e selecione um paciente.',
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Medicamento Salvo!',
      `${nomeMedicamento} foi adicionado com sucesso para ${pacienteSelecionado}.`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Medicamento</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Informações Básicas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Básicas</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome do Medicamento *</Text>
            <TextInput
              style={styles.textInput}
              value={nomeMedicamento}
              onChangeText={setNomeMedicamento}
              placeholder="Ex: Losartana, Metformina..."
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Dosagem *</Text>
            <TextInput
              style={styles.textInput}
              value={dosagem}
              onChangeText={setDosagem}
              placeholder="Ex: 50mg, 1 comprimido..."
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Instruções Especiais</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={instrucoes}
              onChangeText={setInstrucoes}
              placeholder="Ex: Tomar com comida, evitar leite..."
              placeholderTextColor="#666"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Seleção de Paciente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Para Quem? *</Text>
          
          <View style={styles.pacientesGrid}>
            {pacientesDemo.map((paciente) => (
              <TouchableOpacity
                key={paciente.id}
                style={[
                  styles.pacienteOption,
                  pacienteSelecionado === paciente.nome && styles.pacienteOptionSelected,
                ]}
                onPress={() => setPacienteSelecionado(paciente.nome)}>
                <Image source={{ uri: paciente.foto }} style={styles.pacienteOptionFoto} />
                <Text style={[
                  styles.pacienteOptionNome,
                  pacienteSelecionado === paciente.nome && styles.pacienteOptionNomeSelected,
                ]}>
                  {paciente.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Horários */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Horários</Text>
            <TouchableOpacity style={styles.addHorarioButton} onPress={adicionarHorario}>
              <Plus size={16} color="#4A90E2" />
            </TouchableOpacity>
          </View>
          
          {horarios.map((horario, index) => (
            <View key={index} style={styles.horarioContainer}>
              <View style={styles.horarioIcon}>
                <Clock size={16} color="#4A90E2" />
              </View>
              <TextInput
                style={styles.horarioInput}
                value={horario}
                onChangeText={(text) => atualizarHorario(index, text)}
                placeholder="00:00"
                placeholderTextColor="#666"
              />
              {horarios.length > 1 && (
                <TouchableOpacity
                  style={styles.removeHorarioButton}
                  onPress={() => removerHorario(index)}>
                  <Minus size={16} color="#FF3B30" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Cor do Medicamento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cor de Identificação</Text>
          
          <View style={styles.coresGrid}>
            {coresDisponiveis.map((cor) => (
              <TouchableOpacity
                key={cor.nome}
                style={[
                  styles.corOption,
                  corSelecionada[0] === cor.cores[0] && styles.corOptionSelected,
                ]}
                onPress={() => setCorSelecionada(cor.cores)}>
                <LinearGradient
                  colors={cor.cores}
                  style={styles.corGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}>
                  <Pill size={20} color="#fff" />
                </LinearGradient>
                <Text style={styles.corNome}>{cor.nome}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Controle de Estoque */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Controle de Estoque</Text>
          
          <View style={styles.estoqueRow}>
            <View style={styles.estoqueInput}>
              <Text style={styles.inputLabel}>Quantidade Atual</Text>
              <TextInput
                style={styles.textInput}
                value={estoque}
                onChangeText={setEstoque}
                placeholder="30"
                placeholderTextColor="#666"
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.estoqueInput}>
              <Text style={styles.inputLabel}>Alerta com</Text>
              <TextInput
                style={styles.textInput}
                value={estoqueMinimo}
                onChangeText={setEstoqueMinimo}
                placeholder="7"
                placeholderTextColor="#666"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Preview do Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prévia</Text>
          
          <View style={styles.previewCard}>
            <LinearGradient
              colors={corSelecionada}
              style={styles.previewGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              <View style={styles.previewContent}>
                <View style={styles.previewInfo}>
                  <Text style={styles.previewNome}>
                    {nomeMedicamento || 'Nome do Medicamento'}
                  </Text>
                  <Text style={styles.previewDosagem}>
                    {dosagem || 'Dosagem'}
                  </Text>
                  <View style={styles.previewHorarioContainer}>
                    <Clock size={14} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.previewHorario}>{horarios[0]}</Text>
                  </View>
                  <Text style={styles.previewPaciente}>
                    Para: {pacienteSelecionado || 'Selecione um paciente'}
                  </Text>
                </View>
                <View style={styles.previewStatus}>
                  <View style={styles.pendingIndicator} />
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>

      {/* Botão Salvar */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.salvarButton} onPress={salvarMedicamento}>
          <LinearGradient
            colors={['#7ED321', '#5BA617']}
            style={styles.salvarGradient}>
            <Save size={20} color="#fff" strokeWidth={2} />
            <Text style={styles.salvarText}>Salvar Medicamento</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
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
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pacientesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pacienteOption: {
    width: '48%',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  pacienteOptionSelected: {
    borderColor: '#4A90E2',
    backgroundColor: '#2a3a4a',
  },
  pacienteOptionFoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  pacienteOptionNome: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888',
    textAlign: 'center',
  },
  pacienteOptionNomeSelected: {
    color: '#fff',
  },
  addHorarioButton: {
    width: 32,
    height: 32,
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  horarioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  horarioIcon: {
    marginRight: 12,
  },
  horarioInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  removeHorarioButton: {
    width: 32,
    height: 32,
    backgroundColor: '#2a1e1e',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  coresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  corOption: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  corOptionSelected: {
    transform: [{ scale: 1.1 }],
  },
  corGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  corNome: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  estoqueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  estoqueInput: {
    width: '48%',
  },
  previewCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  previewGradient: {
    padding: 20,
    minHeight: 120,
  },
  previewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewInfo: {
    flex: 1,
  },
  previewNome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  previewDosagem: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
    fontWeight: '500',
  },
  previewHorarioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  previewHorario: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    marginLeft: 6,
  },
  previewPaciente: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  previewStatus: {
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
  bottomContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  salvarButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  salvarGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  salvarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 8,
  },
});
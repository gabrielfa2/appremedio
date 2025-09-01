import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Clock, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Calendar } from 'lucide-react-native';

interface Medicacao {
  id: string;
  nome: string;
  dosagem: string;
  horario: string;
  paciente: string;
  tomado: boolean;
  cor: string[];
}

export default function HomeScreen() {
  const [medicacoes] = useState<Medicacao[]>([
    {
      id: '1',
      nome: 'Losartana',
      dosagem: '50mg',
      horario: '08:00',
      paciente: 'Maria',
      tomado: true,
      cor: ['#4A90E2', '#357ABD'],
    },
    {
      id: '2',
      nome: 'Metformina',
      dosagem: '850mg',
      horario: '12:00',
      paciente: 'João',
      tomado: false,
      cor: ['#7ED321', '#5BA617'],
    },
    {
      id: '3',
      nome: 'Atorvastatina',
      dosagem: '20mg',
      horario: '20:00',
      paciente: 'Maria',
      tomado: false,
      cor: ['#BD10E0', '#9013BE'],
    },
  ]);

  const proximasMedicacoes = medicacoes.filter(med => !med.tomado);
  const medicacaoesTomadas = medicacoes.filter(med => med.tomado);

  const renderMedicacaoCard = (medicacao: Medicacao, isPendente: boolean = true) => (
    <TouchableOpacity key={medicacao.id} style={styles.medicacaoCard}>
      <LinearGradient
        colors={medicacao.cor}
        style={styles.medicacaoGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
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
            {medicacao.tomado ? (
              <CheckCircle size={24} color="rgba(255,255,255,0.9)" />
            ) : (
              <View style={styles.pendingIndicator} />
            )}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Boa tarde!</Text>
            <Text style={styles.subtitle}>Como estão seus familiares?</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color="#4A90E2" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Status Cards */}
        <View style={styles.statusSection}>
          <View style={styles.statusGrid}>
            <View style={styles.statusCard}>
              <View style={[styles.statusIcon, { backgroundColor: '#E3F2FD' }]}>
                <Clock size={20} color="#4A90E2" />
              </View>
              <Text style={styles.statusNumber}>3</Text>
              <Text style={styles.statusLabel}>Pendentes</Text>
            </View>
            <View style={styles.statusCard}>
              <View style={[styles.statusIcon, { backgroundColor: '#E8F5E8' }]}>
                <CheckCircle size={20} color="#7ED321" />
              </View>
              <Text style={styles.statusNumber}>1</Text>
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
            <Text style={styles.sectionSubtitle}>Hoje</Text>
          </View>
          
          {proximasMedicacoes.map(medicacao => renderMedicacaoCard(medicacao, true))}
        </View>

        {/* Medicações Tomadas */}
        {medicacaoesTomadas.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Concluídas Hoje</Text>
            </View>
            
            {medicacaoesTomadas.map(medicacao => renderMedicacaoCard(medicacao, false))}
          </View>
        )}

        {/* Ações Rápidas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <LinearGradient
                colors={['#4A90E2', '#357ABD']}
                style={styles.quickActionGradient}>
                <Plus size={24} color="white" />
                <Text style={styles.quickActionText}>Novo Medicamento</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <LinearGradient
                colors={['#7ED321', '#5BA617']}
                style={styles.quickActionGradient}>
                <Calendar size={24} color="white" />
                <Text style={styles.quickActionText}>Consulta Médica</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: '#1e1e1e',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  statusSection: {
    marginBottom: 32,
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
  },
  medicacaoGradient: {
    padding: 20,
    minHeight: 120,
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
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickActionGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
});
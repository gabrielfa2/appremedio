import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Pill, Calendar, CircleAlert as AlertCircle } from 'lucide-react-native';

interface Paciente {
  id: string;
  nome: string;
  idade: number;
  foto: string;
  medicamentos: number;
  proximaMedicacao: string;
  status: 'ok' | 'atencao' | 'critico';
}

export default function PacientesScreen() {
  const [pacientes] = useState<Paciente[]>([
    {
      id: '1',
      nome: 'Maria Santos',
      idade: 78,
      foto: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      medicamentos: 4,
      proximaMedicacao: '12:00 - Metformina',
      status: 'ok',
    },
    {
      id: '2',
      nome: 'João Silva',
      idade: 82,
      foto: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      medicamentos: 3,
      proximaMedicacao: '14:00 - Losartana',
      status: 'atencao',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok':
        return ['#7ED321', '#5BA617'];
      case 'atencao':
        return ['#FF9500', '#E8890A'];
      case 'critico':
        return ['#FF3B30', '#D70015'];
      default:
        return ['#4A90E2', '#357ABD'];
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok':
        return <Pill size={16} color="rgba(255,255,255,0.9)" />;
      case 'atencao':
        return <AlertCircle size={16} color="rgba(255,255,255,0.9)" />;
      case 'critico':
        return <AlertCircle size={16} color="rgba(255,255,255,0.9)" />;
      default:
        return <Pill size={16} color="rgba(255,255,255,0.9)" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Seus Pacientes</Text>
            <Text style={styles.subtitle}>Gerencie o cuidado de cada um</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color="#4A90E2" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Pacientes Cards */}
        <View style={styles.pacientesSection}>
          {pacientes.map((paciente) => (
            <TouchableOpacity key={paciente.id} style={styles.pacienteCard}>
              <LinearGradient
                colors={getStatusColor(paciente.status)}
                style={styles.pacienteGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <View style={styles.pacienteContent}>
                  <View style={styles.pacienteMainInfo}>
                    <Image source={{ uri: paciente.foto }} style={styles.pacienteFoto} />
                    <View style={styles.pacienteDetails}>
                      <Text style={styles.pacienteNome}>{paciente.nome}</Text>
                      <Text style={styles.pacienteIdade}>{paciente.idade} anos</Text>
                      <View style={styles.medicamentosInfo}>
                        <Pill size={14} color="rgba(255,255,255,0.8)" />
                        <Text style={styles.medicamentosCount}>
                          {paciente.medicamentos} medicamentos
                        </Text>
                      </View>
                    </View>
                    <View style={styles.statusIndicator}>
                      {getStatusIcon(paciente.status)}
                    </View>
                  </View>
                  
                  <View style={styles.proximaMedicacaoContainer}>
                    <View style={styles.proximaMedicacaoHeader}>
                      <Calendar size={14} color="rgba(255,255,255,0.8)" />
                      <Text style={styles.proximaMedicacaoLabel}>Próxima medicação:</Text>
                    </View>
                    <Text style={styles.proximaMedicacao}>{paciente.proximaMedicacao}</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Adicionar Novo Paciente */}
        <TouchableOpacity style={styles.addPacienteCard}>
          <View style={styles.addPacienteContent}>
            <View style={styles.addPacienteIcon}>
              <Plus size={32} color="#4A90E2" strokeWidth={2} />
            </View>
            <Text style={styles.addPacienteTitle}>Adicionar Novo Paciente</Text>
            <Text style={styles.addPacienteSubtitle}>
              Cadastre um familiar para começar o acompanhamento
            </Text>
          </View>
        </TouchableOpacity>
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
  title: {
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
  pacientesSection: {
    marginBottom: 24,
  },
  pacienteCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  pacienteGradient: {
    padding: 20,
  },
  pacienteContent: {
    
  },
  pacienteMainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pacienteFoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  pacienteDetails: {
    flex: 1,
  },
  pacienteNome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  pacienteIdade: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 6,
  },
  medicamentosInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medicamentosCount: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 6,
    fontWeight: '500',
  },
  statusIndicator: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proximaMedicacaoContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 12,
  },
  proximaMedicacaoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  proximaMedicacaoLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 6,
    fontWeight: '500',
  },
  proximaMedicacao: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  addPacienteCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#333',
    borderStyle: 'dashed',
    marginBottom: 32,
  },
  addPacienteContent: {
    padding: 32,
    alignItems: 'center',
  },
  addPacienteIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#2a2a2a',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  addPacienteTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  addPacienteSubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
});
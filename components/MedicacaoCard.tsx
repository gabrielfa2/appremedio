import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, CircleCheck as CheckCircle, Pill } from 'lucide-react-native';

interface MedicacaoCardProps {
  nome: string;
  dosagem: string;
  horario: string;
  paciente: string;
  tomado: boolean;
  cor: string[];
  onPress?: () => void;
}

export default function MedicacaoCard({
  nome,
  dosagem,
  horario,
  paciente,
  tomado,
  cor,
  onPress,
}: MedicacaoCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={cor}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.content}>
          <View style={styles.medicacaoInfo}>
            <View style={styles.pillContainer}>
              <Pill size={16} color="rgba(255,255,255,0.8)" />
            </View>
            <Text style={styles.nome}>{nome}</Text>
            <Text style={styles.dosagem}>{dosagem}</Text>
            <View style={styles.horarioContainer}>
              <Clock size={14} color="rgba(255,255,255,0.8)" />
              <Text style={styles.horario}>{horario}</Text>
            </View>
            <Text style={styles.paciente}>Para: {paciente}</Text>
          </View>
          <View style={styles.statusContainer}>
            {tomado ? (
              <View style={styles.concluido}>
                <CheckCircle size={24} color="rgba(255,255,255,0.9)" />
                <Text style={styles.concluidoText}>Tomado</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.pendingButton}>
                <View style={styles.pendingIndicator} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    padding: 20,
    minHeight: 130,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicacaoInfo: {
    flex: 1,
  },
  pillContainer: {
    marginBottom: 8,
  },
  nome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  dosagem: {
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
  horario: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    marginLeft: 6,
  },
  paciente: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  concluido: {
    alignItems: 'center',
  },
  concluidoText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
    fontWeight: '500',
  },
  pendingButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
  },
});
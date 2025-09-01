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
import { TrendingUp, Calendar, Download, Share, Target, Clock } from 'lucide-react-native';

export default function RelatoriosScreen() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('semana');

  const estatisticas = {
    adesao: 92,
    medicacaoesTomadas: 26,
    medicacoesPendentes: 2,
    streakAtual: 5,
  };

  const renderPeriodoButton = (periodo: string, label: string) => (
    <TouchableOpacity
      key={periodo}
      style={[
        styles.periodoButton,
        periodoSelecionado === periodo && styles.periodoButtonActive,
      ]}
      onPress={() => setPeriodoSelecionado(periodo)}>
      <Text
        style={[
          styles.periodoButtonText,
          periodoSelecionado === periodo && styles.periodoButtonTextActive,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Relatórios</Text>
            <Text style={styles.subtitle}>Acompanhe a adesão ao tratamento</Text>
          </View>
          <TouchableOpacity style={styles.shareButton}>
            <Share size={20} color="#4A90E2" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Seletor de Período */}
        <View style={styles.periodoSelector}>
          {renderPeriodoButton('semana', 'Semana')}
          {renderPeriodoButton('mes', 'Mês')}
          {renderPeriodoButton('trimestre', '3 Meses')}
        </View>

        {/* Cards de Estatísticas */}
        <View style={styles.estatisticasGrid}>
          <View style={styles.estatisticaCard}>
            <LinearGradient
              colors={['#7ED321', '#5BA617']}
              style={styles.estatisticaGradient}>
              <Target size={24} color="#fff" />
              <Text style={styles.estatisticaValor}>{estatisticas.adesao}%</Text>
              <Text style={styles.estatisticaLabel}>Taxa de Adesão</Text>
            </LinearGradient>
          </View>

          <View style={styles.estatisticaCard}>
            <LinearGradient
              colors={['#4A90E2', '#357ABD']}
              style={styles.estatisticaGradient}>
              <Clock size={24} color="#fff" />
              <Text style={styles.estatisticaValor}>{estatisticas.streakAtual}</Text>
              <Text style={styles.estatisticaLabel}>Dias Consecutivos</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Resumo da Semana */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo da Semana</Text>
          
          <View style={styles.resumoCard}>
            <View style={styles.resumoRow}>
              <View style={styles.resumoItem}>
                <View style={[styles.resumoIcon, { backgroundColor: '#E8F5E8' }]}>
                  <Target size={16} color="#7ED321" />
                </View>
                <View style={styles.resumoTexto}>
                  <Text style={styles.resumoValor}>{estatisticas.medicacaoesTomadas}</Text>
                  <Text style={styles.resumoLabel}>Tomadas</Text>
                </View>
              </View>

              <View style={styles.resumoItem}>
                <View style={[styles.resumoIcon, { backgroundColor: '#FFF3E0' }]}>
                  <Clock size={16} color="#FF9500" />
                </View>
                <View style={styles.resumoTexto}>
                  <Text style={styles.resumoValor}>{estatisticas.medicacoesPendentes}</Text>
                  <Text style={styles.resumoLabel}>Pendentes</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Gráfico de Tendência */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tendência de Adesão</Text>
          
          <View style={styles.graficoCard}>
            <LinearGradient
              colors={['#4A90E2', '#357ABD']}
              style={styles.graficoGradient}>
              <View style={styles.graficoHeader}>
                <TrendingUp size={24} color="#fff" />
                <Text style={styles.graficoTitulo}>Melhoria Constante</Text>
              </View>
              <Text style={styles.graficoDescricao}>
                A adesão aos medicamentos aumentou 15% nas últimas duas semanas.
                Continue assim!
              </Text>
              <View style={styles.graficoBarras}>
                {[85, 88, 90, 92, 94, 92, 96].map((valor, index) => (
                  <View key={index} style={styles.barraContainer}>
                    <View style={[styles.barra, { height: (valor / 100) * 60 }]} />
                    <Text style={styles.barraLabel}>
                      {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][index]}
                    </Text>
                  </View>
                ))}
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Ações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ações</Text>
          
          <TouchableOpacity style={styles.acaoCard}>
            <View style={styles.acaoContent}>
              <View style={[styles.acaoIcon, { backgroundColor: '#E3F2FD' }]}>
                <Download size={20} color="#4A90E2" />
              </View>
              <View style={styles.acaoTexto}>
                <Text style={styles.acaoTitulo}>Exportar Relatório PDF</Text>
                <Text style={styles.acaoDescricao}>
                  Gere um relatório completo para levar ao médico
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.acaoCard}>
            <View style={styles.acaoContent}>
              <View style={[styles.acaoIcon, { backgroundColor: '#E8F5E8' }]}>
                <Share size={20} color="#7ED321" />
              </View>
              <View style={styles.acaoTexto}>
                <Text style={styles.acaoTitulo}>Compartilhar com Família</Text>
                <Text style={styles.acaoDescricao}>
                  Envie um resumo para outros cuidadores
                </Text>
              </View>
            </View>
          </TouchableOpacity>
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
  shareButton: {
    width: 48,
    height: 48,
    backgroundColor: '#1e1e1e',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  periodoSelector: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  periodoButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodoButtonActive: {
    backgroundColor: '#4A90E2',
  },
  periodoButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
  periodoButtonTextActive: {
    color: '#fff',
  },
  estatisticasGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  estatisticaCard: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  estatisticaGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
  },
  estatisticaValor: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginVertical: 8,
  },
  estatisticaLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontWeight: '500',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  resumoCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 20,
  },
  resumoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  resumoItem: {
    alignItems: 'center',
    flex: 1,
  },
  resumoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  resumoTexto: {
    alignItems: 'center',
  },
  resumoValor: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  resumoLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  graficoCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  graficoGradient: {
    padding: 24,
  },
  graficoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  graficoTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 12,
  },
  graficoDescricao: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 24,
    lineHeight: 20,
  },
  graficoBarras: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 80,
  },
  barraContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barra: {
    width: 12,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 6,
    marginBottom: 8,
  },
  barraLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },
  acaoCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    marginBottom: 12,
  },
  acaoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  acaoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  acaoTexto: {
    flex: 1,
  },
  acaoTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  acaoDescricao: {
    fontSize: 14,
    color: '#888',
    lineHeight: 18,
  },
});
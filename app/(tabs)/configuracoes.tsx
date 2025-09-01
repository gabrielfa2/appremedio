import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Shield, Moon, Smartphone, CircleHelp as HelpCircle, Star, ChevronRight, User, Database } from 'lucide-react-native';

export default function ConfiguracoesScreen() {
  const [notificacoesAtivas, setNotificacoesAtivas] = React.useState(true);
  const [modoEscuro, setModoEscuro] = React.useState(true);
  const [lembretesSonoros, setLembretesSonoros] = React.useState(true);

  const renderConfigItem = (
    icon: React.ReactNode,
    titulo: string,
    descricao: string,
    temSwitch: boolean = false,
    switchValue?: boolean,
    onSwitchChange?: (value: boolean) => void,
    temChevron: boolean = true
  ) => (
    <TouchableOpacity style={styles.configItem}>
      <View style={styles.configContent}>
        <View style={styles.configIcon}>
          {icon}
        </View>
        <View style={styles.configTexto}>
          <Text style={styles.configTitulo}>{titulo}</Text>
          <Text style={styles.configDescricao}>{descricao}</Text>
        </View>
        {temSwitch ? (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{ false: '#333', true: '#4A90E2' }}
            thumbColor={switchValue ? '#fff' : '#999'}
          />
        ) : temChevron ? (
          <ChevronRight size={20} color="#666" />
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Configurações</Text>
          <Text style={styles.subtitle}>Personalize sua experiência</Text>
        </View>

        {/* Perfil do Cuidador */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil</Text>
          
          <TouchableOpacity style={styles.perfilCard}>
            <LinearGradient
              colors={['#4A90E2', '#357ABD']}
              style={styles.perfilGradient}>
              <View style={styles.perfilContent}>
                <View style={styles.avatarContainer}>
                  <User size={32} color="#fff" />
                </View>
                <View style={styles.perfilInfo}>
                  <Text style={styles.perfilNome}>Ana Silva</Text>
                  <Text style={styles.perfilEmail}>ana.silva@email.com</Text>
                  <Text style={styles.perfilTipo}>Cuidadora Principal</Text>
                </View>
                <ChevronRight size={20} color="rgba(255,255,255,0.8)" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Notificações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          
          {renderConfigItem(
            <Bell size={20} color="#4A90E2" />,
            'Notificações Push',
            'Receba lembretes de medicação no seu celular',
            true,
            notificacoesAtivas,
            setNotificacoesAtivas
          )}
          
          {renderConfigItem(
            <Smartphone size={20} color="#7ED321" />,
            'Lembretes Sonoros',
            'Sons de alerta para medicações importantes',
            true,
            lembretesSonoros,
            setLembretesSonoros
          )}
        </View>

        {/* Aparência */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aparência</Text>
          
          {renderConfigItem(
            <Moon size={20} color="#BD10E0" />,
            'Modo Escuro',
            'Interface otimizada para menor cansaço visual',
            true,
            modoEscuro,
            setModoEscuro
          )}
        </View>

        {/* Dados e Segurança */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados e Segurança</Text>
          
          {renderConfigItem(
            <Shield size={20} color="#FF9500" />,
            'Privacidade',
            'Gerencie como seus dados são utilizados'
          )}
          
          {renderConfigItem(
            <Database size={20} color="#4A90E2" />,
            'Backup na Nuvem',
            'Sincronize seus dados entre dispositivos'
          )}
        </View>

        {/* Suporte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suporte</Text>
          
          {renderConfigItem(
            <HelpCircle size={20} color="#7ED321" />,
            'Central de Ajuda',
            'Tutoriais e perguntas frequentes'
          )}
          
          {renderConfigItem(
            <Star size={20} color="#FF9500" />,
            'Avaliar App',
            'Deixe sua avaliação na loja de aplicativos'
          )}
        </View>

        {/* Versão */}
        <View style={styles.versaoContainer}>
          <Text style={styles.versaoTexto}>CuidarBem v1.0.0</Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  perfilCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  perfilGradient: {
    padding: 20,
  },
  perfilContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  perfilInfo: {
    flex: 1,
  },
  perfilNome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  perfilEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
  },
  perfilTipo: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },
  configItem: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    marginBottom: 8,
  },
  configContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  configIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  configTexto: {
    flex: 1,
  },
  configTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  configDescricao: {
    fontSize: 14,
    color: '#888',
    lineHeight: 18,
  },
  versaoContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versaoTexto: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});
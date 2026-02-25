import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <HomeScreen />
          <StatusBar style="dark" />
        </SafeAreaView>
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
});
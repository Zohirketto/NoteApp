import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  onPress?: () => void;
};

export default function FloatingActionButton({ onPress }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.container}>
      <View style={styles.glow} />
      <View style={styles.button}>
        <Feather name="plus" size={36} color="#fff" />
      </View>
    </TouchableOpacity>
  );
}

const SIZE = 68;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
  },
  glow: {
    position: 'absolute',
    width: SIZE + 32,
    height: SIZE + 32,
    borderRadius: (SIZE + 32) / 2,
    backgroundColor: '#a78bfa',
    opacity: 0.25,
    filter: 'blur(20px)' as any,
  },
  button: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: '#7c3aed',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7c3aed',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
});

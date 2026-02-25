import React, { useState } from 'react';
import { Modal, View, TextInput, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Box, Text, HStack } from '@gluestack-ui/themed';
import { Feather } from '@expo/vector-icons';

type Props = {
  visible: boolean;
  onClose: () => void;
  onAdd: (note: { title: string; content: string }) => void;
};

export default function AddNoteModal({ visible, onClose, onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submit = () => {
    if (title.trim().length === 0 && content.trim().length === 0) return onClose();
    onAdd({ title: title.trim(), content: content.trim() });
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay} />
      <Box
        position="absolute"
        left="5%"
        right="5%"
        top="20%"
        borderRadius="$2xl"
        bg="$white"
        px="$4"
        py="$4"
        shadowColor="$black"
        shadowOffset={{ width: 0, height: 8 }}
        shadowOpacity={0.15}
        shadowRadius={16}
        elevation={8}
        style={{ zIndex: 1001 }}
      >
        <Text fontSize={18} fontWeight="$bold" color="$blueGray800" mb="$3">
          New Note
        </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
          placeholderTextColor="#000000"
          style={styles.input}
        />
        <TextInput
          value={content}
          onChangeText={setContent}
          placeholder="Content"
          placeholderTextColor="#000000"
          style={[styles.input, styles.multiline]}
          multiline
        />
        <HStack justifyContent="flex-end" gap="$3" mt="$3">
          <TouchableOpacity activeOpacity={0.8} onPress={onClose} style={styles.btn}>
            <Feather name="x" size={18} color="#1f2937" />
            <Text color="$blueGray800" ml="$1.5">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.85} onPress={submit} style={[styles.btn, styles.primary]}>
            <Feather name="check" size={18} color="#fff" />
            <Text color="$white" ml="$1.5">Add</Text>
          </TouchableOpacity>
        </HStack>
      </Box>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.35)',
    zIndex: 1000,
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(8px)' } : {}),
  } as any,
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#f9fafb',
    marginBottom: 10,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
  },
  primary: {
    backgroundColor: '#7c3aed',
  },
});

import React, { useState } from 'react';
import { Box, HStack, Text } from '@gluestack-ui/themed';
import { TouchableOpacity, TextInput, Platform   } from 'react-native';
// gg
import { Feather } from '@expo/vector-icons';

export type Note = {
  id: string;
  title: string;
  content?: string;
  color: string;
  accentColor: string;
};

type Props = {
  note: Note;
  mode?: 'notes' | 'trash';
  onDelete?: (id: string) => void;
  onRestore?: (id: string) => void;
  onDeleteForever?: (id: string) => void;
  onUpdate?: (id: string, patch: Partial<Note>) => void;
};

export default function NoteCard({ note, mode = 'notes', onDelete, onRestore, onDeleteForever, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content ?? '');
  const [contentHeight, setContentHeight] = useState(80);
  const startEdit = () => {
    if (mode !== 'notes') return;
    setTitle(note.title);
    setContent(note.content ?? '');
    setEditing(true);
  };
  const cancel = () => {
    setTitle(note.title);
    setContent(note.content ?? '');
    setEditing(false);
  };
  const save = () => {
    onUpdate?.(note.id, { title: title.trim() || 'Untitled', content: content.trim() });
    setEditing(false);
  };
  return (
    <Box
      position="relative"
      borderRadius="$2xl"
      px="$4"
      py="$3.5"
      my="$2"
      style={{ backgroundColor: note.color }}
      shadowColor="$black"
      shadowOffset={{ width: 0, height: 6 }}
      shadowRadius={10}
      shadowOpacity={0.1}
      elevation={4}
    >
      {editing ? (
        <>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            style={[
              {
                fontSize: 18,
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: 6,
                padding: 0,
                borderWidth: 0,
                borderColor: 'transparent',
                backgroundColor: 'transparent',
              },
              (Platform.OS === 'web'
                ? ({ outlineWidth: 0, outlineColor: 'transparent' } as any)
                : {}),
            ]}
            underlineColorAndroid="transparent"
          />
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Content"
            style={[
              {
                fontSize: 14,
                color: '#334155',
                padding: 0,
                borderWidth: 0,
                borderColor: 'transparent',
                backgroundColor: 'transparent',
                minHeight: 60,
                height: Math.max(60, contentHeight),
                textAlignVertical: 'top',
              },
              (Platform.OS === 'web'
                ? ({ outlineWidth: 0, outlineColor: 'transparent' } as any)
                : {}),
            ]}
            multiline
            onContentSizeChange={(e) =>
              setContentHeight(Math.ceil(e.nativeEvent.contentSize.height))
            }
            scrollEnabled={false}
            underlineColorAndroid="transparent"
          />
          <HStack justifyContent="flex-end" mt="$3" gap="$3">
            <ActionButton icon={<Feather name="x" size={18} color="#1f2937" />} onPress={cancel} />
            <ActionButton icon={<Feather name="check" size={18} color="#1f2937" />} onPress={save} />
          </HStack>
        </>
      ) : (
        <>
          <TouchableOpacity activeOpacity={0.85} onPress={startEdit}>
            <HStack alignItems="center" justifyContent="space-between" mb="$1.5">
              <Text fontSize={18} fontWeight="$semibold" color="$blueGray800">
                {note.title}
              </Text>
            </HStack>
            {note.content ? (
              <Text size="sm" color="$blueGray700" opacity={0.9}>
                {note.content}
              </Text>
            ) : null}
          </TouchableOpacity>
          <HStack justifyContent="flex-end" mt="$3" gap="$3">
            {mode === 'notes' ? (
              <ActionButton icon={<Feather name="trash-2" size={18} color="#1f2937" />} onPress={() => onDelete?.(note.id)} />
            ) : (
              <>
                <ActionButton icon={<Feather name="corner-up-left" size={18} color="#1f2937" />} onPress={() => onRestore?.(note.id)} />
                <ActionButton icon={<Feather name="x" size={18} color="#1f2937" />} onPress={() => onDeleteForever?.(note.id)} />
              </>
            )}
          </HStack>
        </>
      )}
      <Box
        position="absolute"
        right={-8}
        top="50%"
        w={14}
        h={54}
        borderRadius="$full"
        style={{ transform: [{ translateY: -27 }], backgroundColor: note.accentColor } as any}
        shadowColor="$black"
        shadowOpacity={0.15}
        shadowRadius={6}
        elevation={3}
      />
    </Box>
  );
}

function ActionButton({ icon, onPress }: { icon: React.ReactNode; onPress?: () => void }) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <Box
        px="$3"
        py="$2"
        borderRadius="$full"
        bg="$blueGray100"
        alignItems="center"
        justifyContent="center"
      >
        {icon}
      </Box>
    </TouchableOpacity>
  );
}


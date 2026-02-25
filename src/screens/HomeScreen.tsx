import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import Header from '../components/Header';
import NoteCard, { Note } from '../components/NoteCard';
import FloatingActionButton from '../components/FloatingActionButton';
import Sidebar from '../components/Sidebar';
import AddNoteModal from '../components/AddNoteModal';
import { storage } from '../utils/storage';

type Section = 'notes' | 'trash';

export default function HomeScreen() {
  const initialNotes = useMemo<Note[]>(
    () => [

    ],
    []
  );
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [trash, setTrash] = useState<Note[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [section, setSection] = useState<Section>('notes');
  const [addOpen, setAddOpen] = useState(false);
  const [added, setAdded] = useState<{ title: string; color: string } | null>(null);
  const [query, setQuery] = useState('');

  const handleDelete = (id: string) => {
    const n = notes.find((x) => x.id === id);
    if (!n) return;
    setNotes((prev) => prev.filter((x) => x.id !== id));
    setTrash((prev) => [n, ...prev]);
  };

  const handleRestore = (id: string) => {
    const n = trash.find((x) => x.id === id);
    if (!n) return;
    setTrash((prev) => prev.filter((x) => x.id !== id));
    setNotes((prev) => [n, ...prev]);
  };

  const handleDeleteForever = (id: string) => {
    setTrash((prev) => prev.filter((x) => x.id !== id));
  };
  const palette = [
    { color: '#d9f99d', accentColor: '#34d399' },
    { color: '#fecaca', accentColor: '#fb7185' },
    { color: '#fde68a', accentColor: '#f59e0b' },
    { color: '#ddd6fe', accentColor: '#818cf8' },
  ];
  const handleAddNote = (data: { title: string; content: string }) => {
    const p = palette[Math.floor(Math.random() * palette.length)];
    const newNote: Note = {
      id: `n${Date.now()}`,
      title: data.title || 'Untitled',
      content: data.content || '',
      color: p.color,
      accentColor: p.accentColor,
    };
    setNotes((prev) => [newNote, ...prev]);
    setAdded({ title: newNote.title, color: newNote.color });
  };

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(null), 1800);
    return () => clearTimeout(t);
  }, [added]);

  useEffect(() => {
    (async () => {
      const n = await storage.getJSON<Note[]>('ketto_notes', notes);
      const t = await storage.getJSON<Note[]>('ketto_trash', []);
      setNotes(n);
      setTrash(t);
    })();
  }, []);

  useEffect(() => {
    storage.setJSON('ketto_notes', notes);
    storage.setJSON('ketto_trash', trash);
  }, [notes, trash]);

  const visibleNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        (n.content ?? '').toLowerCase().includes(q)
    );
  }, [notes, query]);

  const visibleTrash = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return trash;
    return trash.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        (n.content ?? '').toLowerCase().includes(q)
    );
  }, [trash, query]);

  return (
    <SafeAreaView style={styles.safe}>
      <Box flex={1} px="$4" pt="$10">
        <Header
          name="Alex"
          title={section === 'trash' ? 'Trash' : 'Notes'}
          onMenu={() => setSidebarOpen((prev) => !prev)}
        />
        <Box mb="$3">
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={section === 'trash' ? 'Search trash' : 'Search notes'}
            placeholderTextColor="#000000"
            style={styles.search}
          />
        </Box>
        <ScrollView contentContainerStyle={styles.scroll}>
          {section === 'notes' ? (
            visibleNotes.map((n) => (
              <NoteCard
                key={n.id}
                note={n}
                mode="notes"
                onDelete={handleDelete}
                onUpdate={(id, patch) =>
                  setNotes((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)))
                }
              />
            ))
          ) : trash.length === 0 ? (
            <Box flex={1} alignItems="center" justifyContent="center">
              <Text fontSize={16} color="$blueGray500">Trash is empty</Text>
            </Box>
          ) : (
            visibleTrash.map((n) => (
              <NoteCard
                key={n.id}
                note={n}
                mode="trash"
                onRestore={handleRestore}
                onDeleteForever={handleDeleteForever}
              />
            ))
          )}
        </ScrollView>

        {section === 'notes' ? <FloatingActionButton onPress={() => setAddOpen(true)} /> : null}
        <Sidebar
          open={sidebarOpen}
          selected={section}
          onSelect={(s) => {
            setSection(s);
            setSidebarOpen(false);
          }}
          onClose={() => setSidebarOpen(false)}
        />
        <AddNoteModal visible={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAddNote} />
        {added ? (
          <Box
            position="absolute"
            bottom={24}
            alignSelf="center"
            px="$4"
            py="$3"
            borderRadius="$xl"
            bg="$blueGray800"
            alignItems="center"
            justifyContent="center"
            shadowColor="$black"
            shadowOpacity={0.2}
            shadowRadius={12}
            shadowOffset={{ width: 0, height: 8 }}
            elevation={8}
          >
            <Box
              w={10}
              h={10}
              borderRadius="$full"
              style={{ backgroundColor: added.color } as any}
              mb="$2"
            />
            <Text color="$white" fontWeight="$semibold">Note added</Text>
            <Text color="$blueGray200" size="sm" mt="$1" numberOfLines={1}>
              {added.title}
            </Text>
          </Box>
        ) : null}
      </Box>

    </SafeAreaView>
  )};


const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scroll: {
    paddingBottom: 120,
    flexGrow: 1,
  },
  search: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#f3f4f6',
  },

});

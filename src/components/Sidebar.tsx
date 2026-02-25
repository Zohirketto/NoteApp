import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { Box, HStack, Text } from '@gluestack-ui/themed';
import { Feather } from '@expo/vector-icons';

type Section = 'notes' | 'trash';

type Props = {
  open: boolean;
  selected: Section;
  onSelect: (s: Section) => void;
  onClose: () => void;
};

export default function Sidebar({ open, selected, onSelect, onClose }: Props) {
  if (!open) return null;
  return (
    <>
      <TouchableOpacity activeOpacity={1} onPress={onClose}>
        <Box
          position="absolute"
          left={0}
          top={0}
          right={0}
          bottom={0}
          style={{
            zIndex: 1000,
            backgroundColor: Platform.OS === 'web' ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.25)',
            ...(Platform.OS === 'web' ? { backdropFilter: 'blur(8px)' } : {}),
          }}
        />
      </TouchableOpacity>
      <Box
        position="absolute"
        left={0}
        top={0}
        bottom={0}
        w={260}
        shadowColor="$black"
        shadowOffset={{ width: 0, height: 8 }}
        shadowOpacity={0.15}
        shadowRadius={16}
        elevation={8}
        px="$4"
        pt="$8"
        style={{
          zIndex: 1001,
          backgroundColor: '#ffffff',
        }}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={onClose}>
          <HStack alignItems="center" gap="$3" mb="$6" pt="$4">
            <Feather name="menu" size={22} color="#1f2937" />
            <Text fontSize={18} fontWeight="$bold" color="$blueGray800">
              Menu
            </Text>
          </HStack>
        </TouchableOpacity>
        <NavItem label="Notes" icon={<Feather name="file-text" size={18} color="#1f2937" />} active={selected === 'notes'} onPress={() => onSelect('notes')} />
        <NavItem label="Trash" icon={<Feather name="trash-2" size={18} color="#1f2937" />} active={selected === 'trash'} onPress={() => onSelect('trash')} />
      </Box>
    </>
  );
}

function NavItem({
  label,
  icon,
  active,
  onPress,
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <HStack
        alignItems="center"
        justifyContent="flex-start"
        gap="$2"
        mb="$3"
        px="$3"
        py="$2.5"
        borderRadius="$lg"
        bg={active ? '$violet100' : 'transparent'}
      >
        {icon}
        <Text color="$blueGray800" fontWeight="$semibold">
          {label}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
}

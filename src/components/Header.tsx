import React from 'react';
import { HStack, Text } from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';

type Props = {
  name?: string;
  onMenu?: () => void;
  title?: string;
};

export default function Header({ name = 'Alex', onMenu, title }: Props) {
  return (
    <HStack alignItems="center" justifyContent="space-between" mb="$4">
      <HStack alignItems="center" gap="$3">
        <TouchableOpacity activeOpacity={0.8} onPress={onMenu}>
          <Text fontSize={24}>☰</Text>
        </TouchableOpacity>
        <Text fontSize={20} fontWeight="$bold" color="$blueGray800">
          {title ?? `Good Morning, ${name}`}
        </Text>
      </HStack>
      <Text />
    </HStack>
  );
}

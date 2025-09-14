import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Settings } from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type FavoritesIconNavigationProp = StackNavigationProp<RootStackParamList>;

const FavoritesIcon = () => {
  const navigation = useNavigation<FavoritesIconNavigationProp>();
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Settings')}
      style={{ marginRight: 15 }}
    >
      <Settings stroke={theme.textColor} width={24} height={24} />
    </TouchableOpacity>
  );
};

export default FavoritesIcon;

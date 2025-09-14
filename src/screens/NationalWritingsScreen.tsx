import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';
import Layout from '../components/Layout';
import { ChevronRight } from 'react-native-feather';


interface Category {
  id: number;
  name: string;
  description: string;
  parent: number | null;
}

const NationalWritingsScreen = ({ navigation }: { navigation: any }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const { fontSize } = useSettings();
  const BASE_URL = 'https://xaliq-danaligi.uz:8000';
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/mobile/categories/`);
      const data = await response.json();
      console.log('Fetched categories:', data.results); // Debug log
      setCategories(data.results);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
     <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: theme.cardBackground }]}
      onPress={() => {
        console.log('Selected category:', item); // Debug log
        navigation.navigate('Writers', {
          screen: 'CategoryBooks',
          params: {
            categoryId: item.id,
            categoryName: item.name
          }
        });
      }}
    >
      <View style={styles.categoryContent}>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.categoryTitle,
              { color: theme.textColor, fontSize: fontSize * 1.2 },
            ]}
          >
            {item.name}
          </Text>
          <Text
            style={[
              styles.categoryDescription,
              { color: theme.secondaryTextColor, fontSize: fontSize * 0.9 },
            ]}
          >
            {item.description}
          </Text>
        </View>
        <ChevronRight
          stroke={theme.secondaryTextColor}
          width={24}
          height={24}
        />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <ActivityIndicator size="large" color={theme.accentColor} />
      </View>
    );
  }

  return (
    <Layout style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  categoryCard: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  categoryTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryDescription: {
    opacity: 0.8,
  },
});

export default NationalWritingsScreen;

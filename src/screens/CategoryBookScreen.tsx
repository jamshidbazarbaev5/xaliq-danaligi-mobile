import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';
import Layout from '../components/Layout';
import { BookOpen } from 'react-native-feather';


interface Book {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  epub_file: string;
  authors: Array<{ id: number; name: string }>;
}

const CategoryBooksScreen = ({ route, navigation }:any) => {
  const { categoryId, categoryName } = route.params;
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const { fontSize } = useSettings();
  const BASE_URL = 'https://xaliq-danaligi.uz:8000';
  useEffect(() => {
    fetchCategoryBooks();
    navigation.setOptions({ title: categoryName });
  }, [categoryId]);

  const fetchCategoryBooks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/mobile/books/?category=${categoryId}`);
      const data = await response.json();
      setBooks(data.results);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      style={[styles.bookItem, { backgroundColor: theme.cardBackground }]}
      onPress={() =>
        navigation.navigate('AdvancedEpubReader', {
          title: item.title,
          epubUrl: item.epub_file,
          bookId: item.id,
        })
      }
      activeOpacity={0.7}
    >
      <View style={styles.bookCover}>
        {item.cover_image ? (
          <Image
            source={{ uri: item.cover_image }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        ) : (
          <BookOpen width={24} height={24} color={theme.accentColor} />
        )}
      </View>
      <View style={styles.bookItemContent}>
        <Text style={[styles.bookTitle, { color: theme.textColor, fontSize: fontSize * 1.1 }]}>
          {item.title}
        </Text>
        <Text 
          style={[styles.authorName, { color: theme.secondaryTextColor, fontSize: fontSize * 0.9 }]}
        >
          {item.authors.map(author => author.name).join(', ')}
        </Text>
        {item.description && (
          <Text 
            style={[styles.bookExcerpt, { color: theme.secondaryTextColor, fontSize: fontSize * 0.9 }]}
            numberOfLines={2}
          >
            {item.description}
          </Text>
        )}
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
        data={books}
        renderItem={renderBookItem}
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
    paddingBottom: 32,
  },
  bookItem: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  bookCover: {
    width: 50,
    height: 70,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  coverImage: {
    width: 50,
    height: 70,
    borderRadius: 8,
  },
  bookItemContent: {
    flex: 1,
  },
  bookTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },
  authorName: {
    fontStyle: 'italic',
    marginBottom: 6,
  },
  bookExcerpt: {
    lineHeight: 18,
    marginBottom: 8,
  },
});

export default CategoryBooksScreen;

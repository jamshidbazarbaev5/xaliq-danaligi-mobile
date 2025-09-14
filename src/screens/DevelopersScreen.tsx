import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import Layout from '../components/Layout';
import {ArrowLeft} from 'react-native-feather';
import {useNavigation} from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { developersApi } from '../api/developers';

interface Developer {
  name: string;
  position: string;
}


const DevelopersScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
    const [developers, setDevelopers] = useState<Developer[]>([])


    useEffect(()=>{
    const fetchDevelopers = async ()=>{
      try {
          const BASE_URL = 'https://xaliq-danaligi.uz:8000';
         const response = await fetch(`${BASE_URL}/api/developers/`, {
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           }
         });
         
         const data = await response.json();
         console.log('API Response:', data);
         setDevelopers(data.results);
      } catch (error) {
        console.error('Error fetching developers:', error)
      }
    }

    fetchDevelopers()
  },[])



  console.log(developers)

  return (
    <>
      <Layout style={styles.container}>
        <ScrollView style={styles.scrollView}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()} style={{marginBottom: 16}}>
                    <ArrowLeft stroke={theme.textColor} width={24} height={24} />
                  </TouchableOpacity> */}
          {developers?.map((developer:any, index:any) => (
            <View
              key={index}
              style={[
                styles.developerCard,
                {backgroundColor: theme.cardBackground},
              ]}>
              <Text style={[styles.name, {color: theme.textColor}]}>
                {developer.name}
              </Text>
              <Text
                style={[styles.position, {color: theme.secondaryTextColor}]}>
                {developer.description}
              </Text>
            </View>
          ))}
        </ScrollView>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  developerCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  position: {
    fontSize: 16,
  },
});

export default DevelopersScreen;

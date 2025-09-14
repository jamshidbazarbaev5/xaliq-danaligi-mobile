import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import FavoritesIcon from "./src/components/FavoritesIcon";
import { Writer } from './src/types/navigation'

export type RootStackParamList = {
  WritersList: undefined;
  WriterDetail: { writer: Writer };
  Poem: undefined;
  CategoryBooks: { categoryId: number; categoryName: string };
  Riddle: undefined;
  NationalWritings: undefined;
  AdvancedEpubReader: { bookUrl: string; bookTitle: string };
  Introduction: undefined;
  Developers: undefined;
  Favorites: undefined;
  Settings: undefined;
  MainTabs: undefined;


}
import { SafeAreaProvider } from "react-native-safe-area-context"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { ThemeProvider, useTheme } from './src/context/ThemeContext.tsx'
import { LanguageProvider, useLanguage } from "./src/context/LanguageContext"
import { SettingsProvider, useSettings } from "./src/context/SettingsContext"
import { NetworkProvider } from "./src/context/NetworkContext.tsx"
import { RefreshButton } from "./src/components/RefreshButton"
import { Users, Heart, Settings, Book, Globe } from "react-native-feather"

// Screens
import WritersScreen from './src/screens/WritersScreen'
import WriterDetailScreen from './src/screens/WriterDetailScreen'
import PoemScreen from './src/screens/PoemScreen'
import FavoritesScreen from './src/screens/FavouritesScreen.tsx'
import SettingsScreen from "./src/screens/SettingsScreen"
import BookListScreen from "./src/screens/BookListScreen.tsx"
import DevelopersScreen from "./src/screens/DevelopersScreen"
import NationalWritingsScreen from "./src/screens/NationalWritingsScreen"
import IntroductionScreen from "./src/screens/IntroductionScreen"
import RiddleScreen from './src/screens/RiddleScreen'
import AdvancedEpubReaderScreen from './src/screens/AdvancedEpubReaderScreen'
import { useFirstLaunch } from "./src/hooks/useFirstLaunch"
import CategoryBooksScreen from "./src/screens/CategoryBookScreen.tsx"
import FavouritesScreen from "./src/screens/FavouritesScreen.tsx";

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator<RootStackParamList>()

function WritersStack() {
  const { theme } = useTheme()
  const { fontSize } = useSettings()

  return (
      <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.cardBackground,
            },
            headerTintColor: theme.textColor,
            headerTitleStyle: {
              fontWeight: "bold",
              color: theme.textColor,
              fontSize: fontSize * 1.2,
            },
          }}
      >
        <Stack.Screen name="WritersList" component={WritersScreen} options={{headerShown:false}} />
        <Stack.Screen
            name="WriterDetail"
            component={WriterDetailScreen}
            options={({ route: { params } }) => ({ title: params?.writer?.name_cyr })}
        />
        <Stack.Screen
            name="Poem"
            component={PoemScreen}
            options={{ headerShown: false }}
        />
         <Stack.Screen
            name="CategoryBooks"
            component={CategoryBooksScreen}
            options={({ route: { params } }) => ({ title: params?.categoryName })}
        />

        <Stack.Screen
            name="Riddle"
            component={RiddleScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="NationalWritings"
            component={NationalWritingsScreen}
            options={{ title: "National Writings" }}
        />
        <Stack.Screen
            name="AdvancedEpubReader"
            component={AdvancedEpubReaderScreen}
            options={{ headerShown: false }}
        />
      </Stack.Navigator>
  )
}

function TabNavigator() {
  const { theme } = useTheme()
  const { fontSize } = useSettings()
  const { translations } = useLanguage()
  const isFirstLaunch = useFirstLaunch()

  if (isFirstLaunch === null) {
    return null; // or a loading screen
  }

  return (
      <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              const iconSize = fontSize * 1.2
              if (route.name === "Writers") {
                return <Users stroke={color} width={iconSize} height={iconSize} />
              } else if (route.name === "Books") {
                return <Book stroke={color} width={iconSize} height={iconSize} />
              } else if (route.name === "NationalWritings") {
                return <Globe stroke={color} width={iconSize} height={iconSize} />
              } else if (route.name === "Favourites") {
                return <Heart stroke={color} width={iconSize} height={iconSize} />
              }
              
            },
            tabBarActiveTintColor: theme.accentColor,
            tabBarInactiveTintColor: theme.secondaryTextColor,
            tabBarStyle: {
              backgroundColor: theme.cardBackground,
              borderTopColor: theme.secondaryTextColor,
              elevation: 0,
              height: 80,
              paddingBottom: 50
            },
            tabBarLabelStyle: {
              fontSize: fontSize * 0.8,
              paddingBottom: 5
            },
            headerShown: false
          })}
      >
        {isFirstLaunch ? (
            <Tab.Screen
                name="Introduction"
                component={IntroductionScreen}
                options={{
                  tabBarStyle: { display: 'none' },
                  tabBarItemStyle: { display: 'none' }
                }}
            />
        ) : null}
        <Tab.Screen
            name="Writers"
            component={WritersStack}
            options={{ tabBarLabel: translations.authors }}
        />
        <Tab.Screen
            name="Books"
            component={BookListScreen}
            options={{ tabBarLabel: translations.books }}
        />
         <Tab.Screen
            name="NationalWritings"
            component={NationalWritingsScreen}
            options={{ tabBarLabel: translations.nationalWritings }}
        />  
        <Tab.Screen
            name="Favourites"
            component={FavouritesScreen}
            options={{ tabBarLabel: translations.favoritesTitle }}
        />
        {/* <Tab.Screen name="ss" component={ss} /> */}
        {/* <Tab.Screen name="Bookmarks" component={BookmarksScreen} /> */}
      </Tab.Navigator>
  )
}

function MainStack() {
  const { theme } = useTheme();
  const { translations } = useLanguage();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.cardBackground,
        },
        headerTintColor: theme.textColor,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator} 
        options={{ 
          headerShown: true, 
          headerTitle: "Xaliq danaliġi",
          headerRight: () => <FavoritesIcon />,
        }} 
      />
      <Stack.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{
          headerTitle: translations.favorites
        }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          headerTitle: translations.settings
        }}
      />
       <Stack.Screen 
        name="Developers" 
        component={DevelopersScreen} 
        options={{
          headerTitle: translations.developers
        }}
       
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <SettingsProvider>
            <ThemeProvider>
              <LanguageProvider>
                <NetworkProvider>
                  <NavigationContainer>
                    <MainStack />
                    <RefreshButton />
                  </NavigationContainer>
                </NetworkProvider>
              </LanguageProvider>
            </ThemeProvider>
          </SettingsProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
  )
}
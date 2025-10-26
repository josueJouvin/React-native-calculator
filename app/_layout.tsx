import { globalStyles } from '@/styles/global-styles'
import { useFonts } from 'expo-font'
import * as NavigationBar from 'expo-navigation-bar'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Platform, View } from 'react-native'
const isAndroid = Platform.OS === 'android';

if (isAndroid) {
  NavigationBar.setVisibilityAsync('hidden');
}
const RootLayout = () => {

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <View style={globalStyles.Background}>
      <Slot />
      <StatusBar style="light" />
    </View>
  )
}

export default RootLayout
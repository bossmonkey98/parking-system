import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Home, Parking, Payment } from './Screens/'
import { Provider } from 'react-redux';
import { store } from './Store/Store'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export type ScreenParamTypes = {
  Home: undefined;
  Parking: undefined;
  Payment: undefined;
}

export default function App() {
  const Stack = createNativeStackNavigator<ScreenParamTypes>()
  return (
    <NavigationContainer>
        <Provider store={store}>
          <View style={styles.container}>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={Home} options={{ title: 'Home' }} />
            <Stack.Screen name='Parking' component={Parking} options={{ title: "Parking Space" }} />
            <Stack.Screen name='Payment' component={Payment} options={{title:"Payment"}}/>
            </Stack.Navigator>
            <StatusBar style="auto" />
          </View>
        </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

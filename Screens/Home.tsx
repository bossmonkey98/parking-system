import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ScreenParamTypes } from '../App'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useAppDispatch} from '../Hooks/hooks'
import { addParkingSpace } from '../Features/ParkingSpaceSlice'

const Home = () => {
  const [parkingSpace, setParkingSpace] = React.useState<Number | any>()
  const navigator = useNavigation<NativeStackNavigationProp<ScreenParamTypes,'Home'>>()
  const dispatch = useAppDispatch()
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Parking Management</Text>
      <TextInput style={styles.input} placeholder='Enter number of parking spaces'
        keyboardType='number-pad'
        onChangeText={(text) => {
          setParkingSpace(text)
        }} />
      <TouchableOpacity style={parkingSpace ? styles.btn : styles.disabledBtn} disabled={!parkingSpace ? true : false}
        onPress={() =>{
        dispatch(addParkingSpace(parkingSpace))
        navigator.navigate('Parking')
      }}
      >
        <Text style={styles.btnContent}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
    margin: 18,
  },
  btn: {
    width: 100,
    height: 50,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  disabledBtn: {
    backgroundColor: 'grey',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  btnContent: {
    fontSize: 18,
    color: '#FFF'
  },
  input: {
    margin: 8,
    padding: 5,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    fontSize: 18,
  }
})

export default Home
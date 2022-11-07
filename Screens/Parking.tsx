import { View, TouchableOpacity, Text, StyleSheet, TextInput, FlatList, ScrollView } from 'react-native'
import React from 'react'
import {TimePicker} from 'react-native-simple-time-picker'
import { useAppDispatch, useAppSelector } from '../Hooks/hooks'
import { allocateParking, fetchParkingSpotDetails } from '../Features/ParkingSpaceSlice'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenParamTypes } from '../App'


export default function Parking() {
  const [newParking ,setNewParking] = React.useState<boolean>(false)
  const {parkingSpaces} = useAppSelector(state=>state.ParkingSpace)
  const dispatch = useAppDispatch()
  const navigator = useNavigation<NativeStackNavigationProp<ScreenParamTypes,'Parking'>>()

  const AssignParking = () => {
    var time = new Date()
    const [hours, setHours] = React.useState<number>(time.getHours())
    const [minutes, setMinutes] = React.useState<number>(time.getMinutes())
    const [carReg ,setCarReg] = React.useState<any>()
  
    return (
      
      <View style={styles.carRegContainer}>
        <View style={{ flex: 2 , justifyContent:'space-evenly'}}>
          <Text style={styles.parkingText}>Car Registration</Text>
          <TextInput style={styles.regInput} placeholder='Enter Car Registration'  onChangeText={(text)=>setCarReg(text)}/>
          <Text style={styles.parkingText}>Parking Time</Text>
          <TimePicker  value={{ hours, minutes}} onChange={(value: { hours: number, minutes: number}) => {
            setHours(value.hours)
            setMinutes(value.minutes)
          }} />
        </View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <TouchableOpacity style={styles.regBtn} onPress={() => setNewParking(false)}>
            <Text style={{ fontSize: 18, color: '#FFF' }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.regBtn}>
            <Text style={{ fontSize: 18, color: '#FFF' }} onPress={()=>{
            if(carReg){
            dispatch(allocateParking({carReg:carReg , startTime:{hours:hours,minutes:minutes}}))
            setNewParking(false)
            } else alert('Please add car registration')
            }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (

    <View style={styles.container}>
      <ScrollView  contentContainerStyle={styles.parkingContainer} >
         {parkingSpaces.map((i:any)=>
          !i.occupied?
          <View style={styles.parkingSpace} key={i.id} ><Text>{i.id}</Text></View>:
          <TouchableOpacity style={styles.AllocatedSpace} key={i.id} onPress={()=>{ 
            navigator.navigate('Payment')
            dispatch(fetchParkingSpotDetails(i))
            }} >
            <Text>Tap to checkout</Text>
            <Text>{i.carReg}</Text>
            <Text>Parked at {i.startTime.hours}:{i.startTime.minutes}</Text>
          </TouchableOpacity>
         )} 
      </ScrollView>
      {newParking ?
        <AssignParking /> :
        <TouchableOpacity style={styles.newParkingBtn} onPress={() => setNewParking(true)} >
          <Text style={{ fontSize: 18, color: '#FFF' }}>Add New Parking</Text>
        </TouchableOpacity>
      }
    </View>
  )
}


const styles = StyleSheet.create({
  parkingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5,
    padding: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 5,
    padding: 4,
  },
  parkingSpace: {
    width: 150,
    height: 80,
    borderWidth: 1,
    borderColor: 'green',
    borderStyle:'dashed',
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  AllocatedSpace: {
    width: 150,
    height: 80,
    borderWidth: 1,
    borderColor: 'red',
    borderStyle:'dashed',
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  newParkingBtn: {
    height:50,
    backgroundColor: 'blue',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8
  },
  carRegContainer: {
    height:300,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    margin: 5,
    padding: 8,
  },
  regBtn: {
    flex:1,
    height:50,
    backgroundColor: 'blue',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8
  },
  parkingText:{
    fontSize: 18,
    fontWeight: 'bold',
    margin:3
  },
  regInput:{
    height:40,
    borderWidth: 1,
    borderColor: 'blue',
    margin: 5,
    padding:5,
  }
})
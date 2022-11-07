import { View, Text ,TouchableOpacity ,StyleSheet} from 'react-native'
import { useAppDispatch, useAppSelector } from '../Hooks/hooks'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenParamTypes } from '../App'
import { deAllocateParking } from '../Features/ParkingSpaceSlice'

const Payment = () => {
    const {parkingSpotDetails} = useAppSelector((state)=>state.ParkingSpace)
    const {startTime , endTime , carReg} = parkingSpotDetails
    const navigator = useNavigation<NativeStackNavigationProp<ScreenParamTypes,'Payment'>>()
    const dispatch = useAppDispatch()

    const calcTimeSpent = (h1:number,h2:number,m1:number,m2:number) =>{
        let t1 = h1*60 + m1
        let t2 = h2*60 + m2
        let totalTime =  t2-t1>0? t2 -t1 : t1-t2
        return {hours:Math.floor(totalTime/60),minutes:totalTime % 60}
    }

    const timeSpent = calcTimeSpent(startTime.hours,endTime.hours ,startTime.minutes,endTime.minutes)

    const calcAmount = (time:number)=>{
        if(time < 2) return 10
        else {
            let extraTime = time - 2
            return 10 + extraTime*10
        }
    }

    let totalAmount = calcAmount(timeSpent.hours)

    return (
        <View style={{flex:1,margin:10,padding:10,flexDirection:'column',justifyContent:'center'}}>
            <View style={styles.carRegContainer}>
                <Text style={{ fontSize: 18 }}>Car Registration : {carReg}</Text>
                <Text style={{ fontSize: 18 }}>Time Spent: {timeSpent.hours} hr {timeSpent.minutes} mins</Text>
                <Text style={{ fontSize: 18 }}>Amount : {totalAmount}$</Text>
            </View>
            <TouchableOpacity style={styles.newParkingBtn}>
                <Text style={{ fontSize: 18, color: '#FFF' }} onPress={()=>{
                    dispatch(deAllocateParking(totalAmount))
                    navigator.navigate('Parking')
                }}>Payment Taken</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.newParkingBtn}>
                <Text style={{ fontSize: 18, color: '#FFF' }} onPress={()=>{
                    navigator.navigate('Parking')
                }}>Go Back</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    newParkingBtn: {
        height:55,
        backgroundColor: 'blue',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin:5
      },
    carRegContainer: {
        height:200,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 10,
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        margin: 5,
        padding:8,
      }
})

export default Payment
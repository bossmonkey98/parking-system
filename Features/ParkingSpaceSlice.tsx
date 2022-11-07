import { createSlice } from "@reduxjs/toolkit"
import { fetchPayment } from "../Utils/fetchPayment";

type InitialStateTypes = {
    noOfParkingSpace:number;
    parkingSpaces:parkingSpaceTypes[];
    parkingSpotDetails:parkingSpaceTypes;
}

export type parkingSpaceTypes = {
    id:number;
    occupied:boolean;
    carReg:string;
    startTime:{hours:number; minutes:number};
    endTime:{hours:number; minutes:number};
}


const initialState: InitialStateTypes = {
    noOfParkingSpace:0,
    parkingSpaces:[],
    parkingSpotDetails: {
        id:0,
        carReg:'',
        occupied:false,
        startTime:{hours:0,minutes:0},
        endTime:{hours:0,minutes:0}
    },
}

const ParkingSpaceSlice = createSlice({
    name:'ParkingSpace',
    initialState,
    reducers:{
        addParkingSpace(state,action:{payload:number}){
            state.noOfParkingSpace=action.payload
            state.parkingSpaces=[]
            for (let i =0 ; i<state.noOfParkingSpace;i++){
                let objectSpace = {
                    id:0,
                    occupied:false,
                    carReg:'',
                    startTime:{hours:0,minutes:0},
                    endTime:{hours:0,minutes:0},
                }
                objectSpace.id = i
                state.parkingSpaces = [...state.parkingSpaces,objectSpace]
            }
        },

        allocateParking(state,action:{payload:{startTime:{hours:number , minutes:number},carReg:any}}){
                        let availableSpaces = state.parkingSpaces.filter((i)=>i.occupied === false)
                        if(availableSpaces.length !== 0){
                            let value = availableSpaces[0].id
                        state.parkingSpaces[value] = {...action.payload,
                            id:value,
                            endTime:{hours:0,minutes:0},
                            occupied:true,
                    }}else alert('No parking Space Available')
        },
        fetchParkingSpotDetails(state,action){
            var time = new Date()
            state.parkingSpotDetails = {...action.payload , endTime:{hours:time.getHours(),minutes:time.getMinutes()}}
        },

        deAllocateParking(state,action){
                        let value = state.parkingSpotDetails.id
                        fetchPayment({carRegistration:state.parkingSpotDetails.carReg,charge:action.payload})
                        state.parkingSpaces[value] = {
                                id:state.parkingSpotDetails.id,
                                occupied:false,
                                carReg:'',
                                startTime:{hours:0,minutes:0},
                                endTime:{hours:0,minutes:0},
                            }
        }
    }
})

export default ParkingSpaceSlice.reducer
export const {addParkingSpace , allocateParking , fetchParkingSpotDetails , deAllocateParking} = ParkingSpaceSlice.actions


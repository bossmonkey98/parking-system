import axios from "axios"


export const fetchPayment = async(parkingDetails:any) =>{
    try{
        const res = await axios.post(`https://httpstat.us/200/${parkingDetails}`)
        alert('Payment Successfull')
    }
    catch (err){
        console.warn(err)
    }
}
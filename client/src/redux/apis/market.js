import axios from "axios"
import { ENDPOINT } from "../../utils/constants"

const url = "/market"

export const getMarkets = async () => {
  try {
    const result =  await axios.get(`${ENDPOINT}${url}/get-list`)
    return result.data.map(e => {
      e.key = e._id
      return e
    })
  }
  catch(e) {
    console.error(e)
    throw e
  }
}

export const createMarket = async (data) => {
  try {
    let body = data
    const result = await axios.post(`${ENDPOINT}${url}`, body)
    return result.data
  }
  catch(e) {
    console.error(e)
    throw e
  }
}
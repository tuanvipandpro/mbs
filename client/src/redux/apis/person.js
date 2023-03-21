import axios from "axios"
import { ENDPOINT } from "../../utils/constants"

const url = "/persons"

export const getPersons = async () => {
  try {
    const result =  await axios.get(`${ENDPOINT}${url}`)
    return result.data
  }
  catch(e) {
    console.error(e)
    throw e
  }
}
import axios from "axios"
import { useState, useEffect } from "react"
import { API_BASE } from "../constants/apiBase"

export const useKeywords = () => {
  const [data, setData] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [key, setKey] = useState('')
  const [recent, setRecent] = useState([])

  useEffect(() => {
    if (key !== '') {
      getList()
    }
  }, [key])

  const getList = () => {
    setIsError(false)
    setIsLoading(true)
    axios.get(`${API_BASE}autocomplete?query=${key}`)
    .then((res) => {
      setData(res.data.suggestions)
      setIsLoading(false)
    }).catch((error) => {
      setIsError(true)
      setIsLoading(false)
      console.log(error)
    })
  }

  return { data, isLoading, isError, setKey, setData, recent, setRecent }
}

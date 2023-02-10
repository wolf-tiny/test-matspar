import axios from "axios"
import { useState, useEffect } from "react"
import { API_BASE } from "../constants/apiBase"

export const useProducts = () => {
  const [list, setList] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if (keyword !== '') {
      getList()
    }
  }, [keyword])

  const getList = () => {
    setIsError(false)
    setIsLoading(true)
    axios.post(`${API_BASE}slug`, {
      slug: '/kategori',
      query: {
        q: keyword
      }
    }).then((res) => {
      setList(res.data.payload.products)
      setIsLoading(false)
    }).catch((error) => {
      setIsError(true)
      setIsLoading(false)
      console.log(error)
    })
  }

  return { list, isLoading, isError, setKeyword }
}

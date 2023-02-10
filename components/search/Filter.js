
import { useCallback, useEffect, useRef, useState } from "react"
import { useKeywords } from "../../hooks/useKeywords"
import Input from "./Input"

import { Close } from "../icons/Close"
import { Search } from "../icons/Search"

export default function Filter({ keyword, onSearch, data, setData, recent, setRecent, setKey }) {

  const [search, setSearch] = useState(keyword)
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus()
    }
  }, [inputRef])

  useEffect(() => {
    if (search === '') {
      setData([])
    } else {
      setKey(search)
    }
  }, [search])

  useEffect(() => {
    if (keyword !== '') {
      setSearch(keyword)
    }
  }, [keyword])

  const handleSearch = useCallback((keyword) => {
    setRecent(content => content.filter(item => item === keyword).length > 0 ? content : content.concat(keyword))
    onSearch(keyword)
  }, [])

  const handleDelete = useCallback((index) => {
    setRecent(content => content.filter((item, i) => index !== i))
  }, [])

  const handleDeleteAll = useCallback(() => {
    setRecent([])
  }, [])

  const handleEnter = useCallback((e) => {
    if ((e.keyCode === 13 || e.keyCode === 40) && e.target.value !== '') {
      onSearch(e.target.value)
    }
  }, [])

  return (
    <div className="filter">
      <div>
        <Input
          value={search}
          setSearch={setSearch}
          onEnter={handleEnter}
          refContent={inputRef}
        />
      </div>
      <div className="middle">
        <p>{search !== '' ? 'Popular searches' : 'Recent searches'}</p>
        {search === '' && <p onClick={handleDeleteAll}>Clear all</p>}
      </div>
      <div className="list">
        {search !== '' ? data && data.map((item, index) => {
          return <div
            className="item"
            key={index}
            onClick={() => { handleSearch(item.text) }}
          >
            <p>{item.text}</p>
            <Search />
          </div>
        }) : recent.map((item, index) => {
          return <div
            className="item"
            key={index}
          >
            <p>{item}</p>
            <div onClick={() => { handleDelete(index) }}>
              <Close />
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

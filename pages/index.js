
import { useCallback, useEffect, useState } from "react"
import { useProducts } from "../hooks/useProducts"
import { useKeywords } from "../hooks/useKeywords"
import Input from "../components/search/Input"

import Filter from "../components/search/Filter"
import { Menu } from "../components/icons/Menu"

const categories = [
  { title: 'Trendy foods', status: true },
  { title: 'Bread', status: false },
  { title: 'Milk', status: false },
  { title: 'Egg', status: false },
]

const getProductImageUrl = (image) => {
  return image ? (`https://d1ax460061ulao.cloudfront.net/140x150/${image[0]}/${image[1]}/${image}.jpg`) : null;
}

export default function Home() {

  const { list, isLoading, setKeyword } = useProducts()
  const { data, setData, recent, setRecent, setKey } = useKeywords()

  const [category, setCategory] = useState(categories)
  const [search, setSearch] = useState('')
  const [isSearch, setIsSearch] = useState(false)

  useEffect(() => {
    setKeyword('Trendy foods')
  }, [])

  const onCategory = (title) => {
    setCategory(content => content.map((item, i) => {
      return { title: item.title, status: title === item.title }
    }))
  }

  const handleCategory = useCallback((index) => {
    setSearch('')
    setCategory(content => content.map((item, i) => {
      if (index === i) {
        setKeyword(item.title)
      }
      return { title: item.title, status: index === i }
    }))
  }, [])

  const handleEnter = useCallback((e) => {
    if ((e.keyCode === 13 || e.keyCode === 40) && e.target.value !== '') {
      setRecent(content => content.filter(item => item === e.target.value).length > 0 ? content : content.concat(e.target.value))
      setKeyword(e.target.value)
      onCategory(e.target.value)
    }
  }, [])

  const handleFocus = useCallback(() => {
    setIsSearch(true)
  }, [])

  const handleLeaveFocus = useCallback(() => {
    // setIsSearch(false)
  }, [])

  const handleSearch = useCallback((keyword) => {
    setIsSearch(false)
    setKeyword(keyword)
    setRecent(content => content.filter(item => item === keyword).length > 0 ? content : content.concat(keyword))
    setSearch(keyword)
    onCategory(keyword)
  }, [])

  return (
    <div className="app">
      <div>
        <div className="menu">
          <Menu />
        </div>
        <Input
          value={search}
          setSearch={setSearch}
          onEnter={handleEnter}
          onFocus={handleFocus}
          onBlur={handleLeaveFocus}
        />
      </div>
      <p>Find your favorite products now.</p>
      <div className="category">
        {category.map((item, index) => {
          return <div
            className={`${item.status ? 'select' : ''}`}
            key={index}
            onClick={() => {
              handleCategory(index)
            }}
          >
            <div>
              {item.title}
              {item.status && <p />}
            </div>
          </div>
        })}
      </div>
      {isLoading ?
        <div className="loading"><h2>Loading...</h2></div> :
        !list || list.length === 0 ? <div className="loading"><h2>no products</h2></div> : <div className="product">
          {list.map((item, index) => {
            return <div key={index}>
              <img src={getProductImageUrl(item.image)} alt="product" />
              <p>{item.name}</p>
              <p>{item.brand}</p>
              <p>${item.price}</p>
            </div>
          })}
        </div>}
      {isSearch && <div className="suggestions">
        <Filter
          keyword={search}
          onSearch={handleSearch}
          data={data} 
          setData={setData}
          recent={recent} 
          setRecent={setRecent} 
          setKey={setKey}
        />
      </div>}
    </div>
  )
}

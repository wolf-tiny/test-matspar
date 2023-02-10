
import { useCallback, useEffect, useState } from "react"

import { Search } from "../icons/Search"

export default function Input({ refContent, value, setSearch, onEnter, onFocus, onBlur }) {

  return (
    <div className="search">
      <Search />
      <input
        placeholder="Search Product"
        value={value}
        onChange={(e) => { setSearch(e.target.value) }}
        onKeyDown={onEnter}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={refContent}
      />
    </div>
  )
}

import React, { useContext, useState } from "react";
import { fetchSearch } from "services";


const AppContext = React.createContext();

function AppProvider(props) {
  const [search, setSearch] = useState(undefined);
  const [searchHistory, setSearchHistory] = useState(localStorage.getItem("history") ? JSON.parse(localStorage.getItem("history")) : []);
  const [pages, setPages] = useState({});
  const [data, setData] = useState(null);

  const confirmSearch = (value) => {
    if(!searchHistory.some(item => item === value)) {
        let newSearchHistory = [{query: value}, ...searchHistory];
        setSearchHistory(newSearchHistory);
        localStorage.setItem("history", JSON.stringify(newSearchHistory));            
    }
    document.querySelector('input').value = value; //case for searching through clicking on a suggestion
    window.history.pushState("data", value, `/${value}`);
    setSearch(value);
    fetchSearch(value).then(data => {
        setData(data.results);
        setPages({actual: 1, total: data.total_pages});
    });
  }
  
  const deleteHistory = (index) => {        
    if(index === "full") {
        setSearchHistory([]);
        localStorage.removeItem("history");
    } else {
        let newSearchHistory = searchHistory.filter(item => item.query !== searchHistory[index].query);
        setSearchHistory(newSearchHistory);
        localStorage.setItem("history", newSearchHistory.toString());
    }
}

  const { children } = props;

  return (
    <AppContext.Provider
      value={{
        search,
        setSearch,
        searchHistory,
        setSearchHistory,
        pages,
        setPages,
        data,
        setData,
        confirmSearch,
        deleteHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

const useApp = () => useContext(AppContext);

export { AppProvider, AppContext, useApp };
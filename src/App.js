import { useContext } from 'react';

import { Main, Searched } from "views";
import { AppContext } from "providers";

function App() {
  const { search } = useContext(AppContext)

  return search ? (
    <Searched />
    ) :
    (
      <Main />    
  );
}

export default App;

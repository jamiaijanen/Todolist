import React from 'react';
import Todos from './components/Todos'
import Home from './components/Home'
import './App.css';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

function App() {

  const [value, setValue] = React.useState('one')

  const handleChange = (event, value) => {
    setValue(value)
  }

  return (
    <div className="App">
      <AppBar position="static" color="inherit">
        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="Home" />
          <Tab value="two" label="Todos" />
        </Tabs>
      </AppBar>
      {value === 'one' && <Home />}
      {value === 'two' && <Todos />}
    </div>
  );
}

export default App;

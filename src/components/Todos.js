import React, { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';


function Todos() {
    const [paiva, setPaiva] = React.useState(new Date())
    const [inputs, setInputs] = React.useState({description: '', priority: '', date: ''})
    const [todos, setTodos] = React.useState([])
    const gridRef = useRef()

    const addTodo = (event) => {
        event.preventDefault()
        setTodos([...todos, inputs])
        setInputs({description: '', priority: ''})
    }

    const inputChanged = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value})
    }

    const dateChanged = (paiva) => {
        setPaiva(paiva)
        const muutos = paiva.toString()
        const date = muutos.substring(4, 15)
        setInputs({...inputs, date})
    }

    const deleteTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
        setTodos(todos.filter((inputs, index) => index !== gridRef.current.getSelectedNodes()[0].childIndex))
        } else {
            alert('Select Row First')
        }
    }

    const deleteAllTodos = () => {
        setTodos([])
    }

    const columns = [
        {field: 'description', sortable: true, filter: true, floatingFilter: true, animateRows: true},
        {field: 'date', sortable: true, filter: true, floatingFilter: true, animateRows: true},
        {field: 'priority', sortable: true, filter: true, floatingFilter: true, animateRows: true,
        cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}}
    ]

    return(
        <div style={{marginTop: 20, marginBottom: 20}}>
        <Stack direction="row" spacing={2} justifyContent="center">
            <TextField size="small" type ="text" value={inputs.description} name="description" onChange={inputChanged} placeholder="Description" />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker value={paiva} onChange={dateChanged} />
            </MuiPickersUtilsProvider>
            <TextField size="small" type ="text" value={inputs.priority} name="priority" onChange={inputChanged} placeholder="Priority" />
            <Button variant="contained" startIcon={<AddIcon />} onClick={addTodo}>Add</Button>
            <Tooltip title="Select row first">
                <Button variant="contained" startIcon={<DeleteIcon />} color="error" onClick={deleteTodo}>Delete</Button>
            </Tooltip>
            <Tooltip title="Removes all todos from list">
                <Button variant="contained" startIcon={<DeleteIcon />} color="error" onClick={deleteAllTodos}>Clear</Button>
            </Tooltip>
        </Stack>
            <div className="ag-theme-material" style={{height: 400, width: 600, margin: 'auto'}}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={ params => gridRef.current = params.api }
                    rowSelection="single"
                    rowData={todos}
                    columnDefs={columns}
                />
            </div>
        </div>
    )
}

export default Todos
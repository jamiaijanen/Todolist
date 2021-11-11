import React from 'react';

function TodoTable(props) {
    return(
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                    </tr>
                    {
                        props.todos.map((todos, index) => 
                            <tr key={index}>
                                <td>{todos.date}</td>
                                <td>{todos.desc}</td>
                                <td><button onClick={() => props.deleteTodo(index)}>Delete</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TodoTable;
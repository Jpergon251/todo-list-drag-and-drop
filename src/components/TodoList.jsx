import React, { useState } from 'react'
import Formulario from './Formulario'
import Tarea from './Tarea'
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TodoList = () => {

    // Variables & Estados
    const [tareas, setTareas] = useState([])
    console.log(tareas)
    
   // Funciones
    const agregarTarea = (nuevaTarea) => {
        setTareas([...tareas, nuevaTarea])
    }

    const initialTodos = [
        {},
    ];
    const [todos, setTodos] = useState(initialTodos);
    
    const handleonDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination) return;
        const startIndex = source.index;
        const endIndex = destination.index ;

        reorder(startIndex, endIndex);

        console.log(result);
    };
    
    const reorder = (startIndex, endIndex) => {
        const result = [...todos];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        setTodos(result);
        console.log(result);
    };

  return (
    <div>
        <Formulario agregarTarea={agregarTarea}/>

        <DragDropContext onDragEnd={handleonDragEnd}>
            <Droppable droppableId="droppable-1">
                {(droppableProvided)=>(
                <ul className='class="list-group list-group-numbered mt-4'
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}
                    >
                    {todos.map((todo, index) => (
                        tareas.map(item => (
                        <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                            {(dragableProvided) => (
                                <li
                                ref={dragableProvided.innerRef}
                                {...dragableProvided.draggableProps}
                                {...dragableProvided.dragHandleProps}
                                >
                                {
                                    
                                        <Tarea 
                                            key={item.id}
                                            tarea = {item}
                                        />
                                    
                                }
                                </li>
                            )}
                        </Draggable>
                        ))
                    ))} 
                    {droppableProvided.placeholder}
                </ul>
                )}
                
            </Droppable>
        </DragDropContext>
    </div>
  )
}

export default TodoList
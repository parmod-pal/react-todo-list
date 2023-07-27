import React from 'react';
import {toast, Toaster } from 'react-hot-toast';
import { useState } from "react";
import { Modal, Button, Form,Table,Container,Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoFormEdit from './TodoFormEdit';
import TodoForm from './TodoForm';
function App() {
  const[show,setShow] = useState(false);
  const[list,setList] = useState([]);
  const[count,setIndex] = useState(1);
  const [filteredList, setFilteredList] = useState(list);
  const [currentList, setCurrentList] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  

  const onSubmit = (event) => {
    event.preventDefault();
    setIndex(count + 1);
    
    const form = event.target;
    if (form.title.value === '') {
      toast.error('Please enter a title');
      return;
    }
    if (form.status.value === '') {
      toast.error('Please select status');
      return;
    } 
    const newlist = [...list,
      {
          id: count,
          title: form.title.value,
          status : form.status.value,
          time: new Date().toLocaleString(),
      },];
    setList(newlist);
    setFilteredList(newlist);
    handleClose();
    form.reset();
    toast.success('Task added successfully');
  }
  
    function onRemoveItem(itemToRemove) {
      const newItems = list.filter((item) => {
        return item.id !== itemToRemove;
      });      
      
      setList(newItems);
      setFilteredList(newItems);
    }

    function addTaskModal(){
      setIsEditing(false); 
      handleShow();
    }

    function editpop(item){   
      setIsEditing(true); 
      handleShow();
      setCurrentList({ ...item });
    }
    const handleFilter = (event) => {
      var query = event.target.value; 
      if(query !== ""){
        var updatedList = [...list];
       updatedList = updatedList.filter(item => {
        return item.status === query;
      });
      setFilteredList(updatedList);

      }else{
        setFilteredList(list);
      }

    }

    function onEditInputChange(evt) {
      setCurrentList({ ...currentList, [evt.target.name]: evt.target.value});
    }
  
    function handleUpdateTodo(id, currentList) {
      const updatedItem = list.map((list) => {
        return list.id === id ? currentList : list;
      });
      setIsEditing(false);
      setList(updatedItem);
      setFilteredList(updatedItem);
      handleClose();
    }

    function onEditFormSubmit(e) {
       e.preventDefault();
      handleUpdateTodo(currentList.id, currentList);
    }
  return (
    <>
    <Container fluid="sm">
      <Row>
        <Col sm={'8'}><h1 className="text-center"> TODO LIST</h1></Col>
      </Row>
      <Row>
        <Col sm={'6'}>
          <Button onClick={addTaskModal}>Add task</Button>
          </Col>
          <Col sm={'2'}>
          <Filter handleFilter ={handleFilter}></Filter>
          </Col>
      </Row>
      <Row>
        <Col sm={'8'}>
        <Table striped bordered hover responsive = "sm" className="mt-2">
      <thead>
      <tr>
        <td className="text-center"><b>Title</b></td>
        <td className="text-center"><b>Action</b></td>
      </tr>
      </thead>
      <tbody>
      {filteredList.map((filteredList,index)=>(
                    <TodoList editpop={editpop} onRemoveItem = {onRemoveItem} key={filteredList + index} item={filteredList}></TodoList>
                ))}      
        </tbody> </Table>
        </Col>
        </Row>     
    </Container>    
    <Modal show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header>
          <Modal.Title> {isEditing ? 'EDIT TODO':'ADD TODO' }</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        {isEditing ? (       
          <TodoFormEdit 
          onEditInputChange={onEditInputChange}
          currentList={currentList}
          onEditFormSubmit={onEditFormSubmit}></TodoFormEdit>
        ):(
         <TodoForm  
             list={list} 
             onSubmit={onSubmit}>
             </TodoForm>
        )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: '1.1rem',
          },
        }}
      />
    </>
  );
}


function TodoList({editpop,item,onRemoveItem}){
  if(item.status === "complete"){
    var checked = true;
  }
  return (
    <>
    <tr>
      <td>              
          <p><input name="checkbox" type="checkbox" class="form-check-input" checked={checked ? 'checked' : ''}></input> {item.title}, {item.status}</p>
          <p className="time">{item.time}</p>
          </td> 
    <td>
      <Button onClick ={() => editpop(item)} variant = "warning" className="px-3">Edit</Button>
      &nbsp;
      <Button onClick ={()=>onRemoveItem(item.id)} variant = "danger" className="px-3">Delete</Button>
      </td>
    </tr>
    </>
  )
}
function Filter({handleFilter}){
  return (
    <>
    <Form.Select onChange ={handleFilter}>
          <option value="">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
          </Form.Select>
    </>
  )
}

export default App;

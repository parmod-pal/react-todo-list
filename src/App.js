import React from 'react';
import {toast, Toaster } from 'react-hot-toast';
import { useState } from "react";
import { Modal, Button, Form,Table,Container,Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const[show,setShow] = useState(false);
  const[list,setList] = useState([]);
  const[count,setIndex] = useState(1);
  const [filteredList, setFilteredList] = useState(list);

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

    

    function editpop(id){
      handleShow();
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

   

    
    
    
  
  return (
    <>
    <Container fluid="md">
      <Row>
        <Col><h1> To Do List</h1></Col>
      </Row>
      <Row>
        <Col xs lg="2">
          <Button onClick={handleShow}>Add task</Button>
          </Col>
          <Col xs lg="2">
          <Filter handleFilter ={handleFilter}></Filter>
          </Col>
      </Row>
      <Row>
        <Col xl lg="4">
        <Table striped bordered hover className="mt-2">
      <thead>
      <tr>
        <td><b>Title</b></td>
        <td><b>Action</b></td>
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
          <Modal.Title>ADD TODO</Modal.Title>
        </Modal.Header>
        <Modal.Body>        
          <TodoForm onSubmit={onSubmit}></TodoForm>
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
            fontSize: '1.4rem',
          },
        }}
      />
    </>
    
    
  );
}

function TodoForm({onSubmit}){
  return(
    <>
     <Form onSubmit={onSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control placeholder="Enter title" name="title" />        
      </Form.Group>
      <Form.Group controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Select name="status">
          <option value="">Select Status</option>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
          </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit" block className="mt-2">Add </Button>
    </Form>
    </>
  )
}

function TodoList({editpop,item,onRemoveItem}){
  if(item.status === "complete"){
    var checked = true;
  }
  return (
    <>
    <tr>
      <td>
      <Form.Check
            inline
            name="checkbox"
            type="checkbox"
            checked={checked ? 'checked' : ''}
          />
        
          <p>{item.title}</p> <p className="time">{item.time}</p></td> 
    <td><Button onClick ={() => editpop(item.id)}>Edit</Button> || <Button onClick ={()=>onRemoveItem(item.id)}>Delete</Button></td>
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

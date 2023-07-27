import { Button, Form} from 'react-bootstrap';
export default function TodoFormEdit({
    currentList,
    onEditInputChange,
    onEditFormSubmit
  }) {
    return (
        <Form onSubmit={onEditFormSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Edit Title</Form.Label>
          <Form.Control placeholder="Enter title" name="title" value={currentList.title}   onChange={onEditInputChange}/>        
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label>Edit Status</Form.Label>
          <Form.Select name="status" value={currentList.status}  onChange={onEditInputChange}>
            <option value="">Select Status</option>
            <option value="incomplete">Incomplete</option>
            <option value="complete">Complete</option>
            </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" block className="mt-2">Update </Button>
      </Form>
    );
  }
  
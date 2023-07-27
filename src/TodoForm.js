import { Button, Form} from 'react-bootstrap';
export default function TodoForm({
    list,
    onSubmit
  }) {
    return (
      <Form onSubmit={onSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control placeholder="Enter title" name="title"   />        
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
    );
  }
  
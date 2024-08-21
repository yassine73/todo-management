import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Stack,
  Input,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { todoContext } from "./GetTodos";

function InputTypes(props) {
  const class_name = props.class_name;
  const val = props.val;
  const index = props.index;
  const ApiURl = `http://127.0.0.1:8000/todo/${index}`;
  const { fetchTodos } = useContext(todoContext);
  const [todo, setTodo] = useState({ id: "", item: "" });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEdit = () => {
    todo.item &&
      fetch(ApiURl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: todo.item }),
      }).then(fetchTodos);
  };

  const GetTodoInfo = () => {
    fetch(ApiURl)
      .then((res) => res.json())
      .then((data) => setTodo(data.todo));
  };

  const handleInput = (e) => {
    setTodo({ item: e.target.value });
  };

  const handleDelete = () => {
    console.log(todo.id);
    fetch(ApiURl, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: { id: todo.id },
    }).then(fetchTodos);
  };

  return (
    <>
      <input
        type="button"
        className={class_name}
        value={val}
        onClick={() => {
          onOpen();
          GetTodoInfo();
        }}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {val.toLowerCase() === "edit" ? (
          <ModalContent>
            <ModalHeader>Edit Todo</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={3}>
                <Input
                  placeholder="ID"
                  value={props.index}
                  size="md"
                  disabled
                />
                <Input
                  value={todo.item}
                  onChange={(e) => handleInput(e)}
                  placeholder="Todo"
                  size="md"
                />
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  handleEdit();
                }}
                colorScheme="yellow"
              >
                Validate
              </Button>
            </ModalFooter>
          </ModalContent>
        ) : (
          <ModalContent>
            <ModalHeader color="red">Please Confirm to Delete</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={3}>
                <Input
                  placeholder="ID"
                  size="md"
                  value={props.index}
                  disabled
                />
                <Input
                  value={todo.item}
                  placeholder="Todo"
                  size="md"
                  disabled
                />
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button onClick={handleDelete} colorScheme="red">
                Validate
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  );
}

export default InputTypes;

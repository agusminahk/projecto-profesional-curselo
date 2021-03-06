import React from "react";
import {
  Tr,
  Th,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  Button,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";
import { EmployeeForm } from "./EmployeeForm";
import { useEffect, useState } from "react";

export const Employee = ({ employee, createRow = false }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { firstname, lastname, role, telephone, email } = employee;
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setEditing(isOpen ? editing : false);
  }, [isOpen]);

  return (
    <>
      <Tr onClick={onOpen}>
        {createRow ? (
          <Button
            m={2}
            p={2}
            mr={0}
            onClick={() => setEditing(true)}
            _hover={{ backgroundColor: "gray.900" }}
            backgroundColor="blue.800"
            color="blue.50"
          >
            Crear empleado
          </Button>
        ) : (
          <>
            <Th>
              {firstname} {lastname}
            </Th>
            <Th>{role}</Th>
            <Th display={["none", "none", "none", "table-cell"]}>{email}</Th>
            <Th display={["none", "none", "table-cell"]}>{telephone}</Th>
            <Th pl={0} display="flex" flexDirection="row-reverse">
              <Button
                onClick={() => setEditing(true)}
                _hover={{ backgroundColor: "blue.800" }}
                backgroundColor="blue.500"
                color="blue.50"
              >
                Editar
              </Button>
            </Th>
          </>
        )}
      </Tr>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {email ? `${firstname} ${lastname}` : "Nuevo usuario!"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EmployeeForm
              editing={editing}
              employee={employee}
              createRow={createRow}
              close={onClose}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

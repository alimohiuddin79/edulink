import { useState, useRef } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { format } from "date-fns";

type User = {
  _id: string;
  name: string;
  email: string;
  type: string;
  phoneNumber: string;
  gender: string;
};

type SelectedTableProps = {
  users: User[];
};

const UsersTable = ({ users }: SelectedTableProps) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteRowIdRef = useRef<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleRowSelect = (rowId: string) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRows(users.map((user) => user._id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleDeleteRow = (rowId: string) => {
    deleteRowIdRef.current = rowId;
    onOpen();
  };

  const handleConfirmDelete = () => {
    const deleteRowId = deleteRowIdRef.current;
    if (deleteRowId) {
      setSelectedRows(selectedRows.filter((id) => id !== deleteRowId));
      console.log(`Deleted row with ID: ${deleteRowId}`);
    }
    onClose();
  };

  const handleCancelDelete = () => {
    deleteRowIdRef.current = null;
    onClose();
  };

  const handleEditRow = (rowId: string) => {
    console.log(`Edited row with ID: ${rowId}`);
  };

  // Calculate the index range for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = users.slice(indexOfFirstRow, indexOfLastRow);

  // Calculate the total number of pages
  const totalPages = Math.ceil(users.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Table variant="simple" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>
              <Checkbox
                isChecked={selectedRows.length === currentRows.length && currentRows.length > 0}
                onChange={handleSelectAll}
              />
            </Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Type</Th>
            <Th>Phone</Th>
            <Th>Gender</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentRows.map((user) => (
            <Tr key={user._id}>
              <Td>
                <Checkbox
                  isChecked={selectedRows.includes(user._id)}
                  onChange={() => handleRowSelect(user._id)}
                />
              </Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.type}</Td>
              <Td>{user.phoneNumber}</Td>
              <Td>{user.gender}</Td>
              {/* <Td>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => handleEditRow(blog._id)}
                  isDisabled={!selectedRows.includes(blog._id)}
                  leftIcon={<FaEdit />}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDeleteRow(blog._id)}
                  isDisabled={!selectedRows.includes(blog._id)}
                  leftIcon={<FaTrash />}
                  ml={2}
                >
                  Delete
                </Button>
              </Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>

      <div 
        className="
          mx-auto
          w-[70%]
          mt-4
          flex
          justify-center
        "
      >
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      </div>

      

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Row
            </AlertDialogHeader>
            <AlertDialogBody>Are you sure you want to delete this row?</AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleCancelDelete}>No</Button>
              <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div
    >
      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          colorScheme={pageNumber === currentPage ? "twitter" : undefined}
          ml={4}
          size="sm"
          color={'primary-1'}
          border={'1px'}
          borderStyle={'outset'}
          borderColor={'black'}
        >
          {pageNumber}
        </Button>
      ))}
    </div>
  );
};

export default UsersTable;

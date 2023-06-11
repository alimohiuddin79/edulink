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
  useToast,
} from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { format } from "date-fns";
import Pagination from "../Pagination";
import { useRouter } from "next/navigation";
import axios from "axios";

type Blog = {
  _id: string;
  title: string;
  tags: string[];
  authorId: string;
  authorName: string;
  createdAt: string;
};

type SelectedTableProps = {
  blogs: Blog[];
};

const BlogsTable = ({ blogs }: SelectedTableProps) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
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
      setSelectedRows(blogs.map((blog) => blog._id));
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
      // console.log(`Deleted row with ID: ${deleteRowId}`);
      setLoading(true);
      axios.delete(`http://localhost:3000/api/blog/${deleteRowId}`)
      .then(() => {
        toast({
          title: "Blog Deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Something went wrong",
          status: "error",
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
      setSelectedRows(selectedRows.filter((id) => id !== deleteRowId));
    }

    onClose();
  };

  const handleCancelDelete = () => {
    deleteRowIdRef.current = null;
    onClose();
  };

  const handleEditRow = (rowId: string) => {
    // console.log(`Edited row with ID: ${rowId}`);
    router.push(`/dashboard/edit-blog/${rowId}`);
  };

  // Calculate the index range for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = blogs.slice(indexOfFirstRow, indexOfLastRow);

  // Calculate the total number of pages
  const totalPages = Math.ceil(blogs.length / rowsPerPage);

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
            <Th>Title</Th>
            <Th>Author Name</Th>
            <Th>Tags</Th>
            <Th>Created At</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentRows.map((blog) => (
            <Tr key={blog._id}>
              <Td>
                <Checkbox
                  isChecked={selectedRows.includes(blog._id)}
                  onChange={() => handleRowSelect(blog._id)}
                />
              </Td>
              <Td>{blog.title}</Td>
              <Td>{blog.authorName}</Td>
              <Td>{blog.tags.join(", ")}</Td>
              <Td>{format(new Date(blog.createdAt), "MMMM d, yyyy, h:mm:ss a")}</Td>
              <Td>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => handleEditRow(blog._id)}
                  isDisabled={!selectedRows.includes(blog._id)}
                  leftIcon={<FaEdit />}
                  mr={2}
                  bgColor={'gray.400'}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDeleteRow(blog._id)}
                  isDisabled={!selectedRows.includes(blog._id) || loading}
                  leftIcon={<FaTrash />}
                  bgColor={'gray.400'}
                >
                  Delete
                </Button>
              </Td>
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
            <AlertDialogBody>Are you sure you want to delete this blog?</AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleCancelDelete}>No</Button>
              <Button colorScheme="red" onClick={handleConfirmDelete} color={'black'} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};


export default BlogsTable;

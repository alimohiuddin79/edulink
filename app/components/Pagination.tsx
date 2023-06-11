import { Button } from "@chakra-ui/react";

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


export default Pagination;
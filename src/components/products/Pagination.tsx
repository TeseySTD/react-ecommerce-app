import { useEffect, useState } from 'react';
import Product from '../../types/product';
import { Button, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';

interface PaginationProps {
  products: Product[];
  pageSize: number;
}

const Pagination = (props: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(
    1,
    Math.ceil(props.products.length / props.pageSize)
  );

  const lastIndex = currentPage * props.pageSize;
  const firstIndex = lastIndex - props.pageSize;
  const currentProducts = props.products.slice(firstIndex, lastIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [props.products]);

  return (
    <>
      <Row className="d-flex row-cols-2 justify-content-center mb-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <h3 className="text-center mt-5">No products match your filters.</h3>
        )}
      </Row>

      <div className="d-flex justify-content-center my-4 mt-auto">
        <Button
          variant="secondary"
          disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          Previous
        </Button>
        <span className="mx-3 align-self-center">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          disabled={currentPage === totalPages}
          onClick={() => {
            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export { type PaginationProps };
export default Pagination;

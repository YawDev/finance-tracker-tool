import type { IPagination } from "../utils/Types";

const Pagination = ({
  paginationData,
  setPaginationData,
}: {
  paginationData: IPagination;
  setPaginationData: (paginationData: IPagination) => void;
}) => {
  const { totalItems, itemsPerPage, currentPage } = paginationData;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (
    pgNumber: number,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setPaginationData({
      ...paginationData,
      currentPage: pgNumber,
    });
  };

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${currentPage === pgNumber ? "active" : ""}`}
          >
            <a onClick={(e) => paginate(pgNumber, e)} className="page-link">
              {pgNumber}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

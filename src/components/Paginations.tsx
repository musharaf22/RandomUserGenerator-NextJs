import ReactPaginate from "react-paginate";

// require("bootstrap/less/bootstrap.less");

const Paginations = ({
  currPage,
  setPageId,
  pageLimit,
  setPageLimit,
  noOfPages,
  refetch,
}: Ipage) => {
  const handleChange = (data: any) => {
    setPageId((data.selected as number) + 1);
    refetch();
  };
  return (
    <div className="flex justify-between items-center bg-[#fff] py-3">
      {/* Pagination Wrapper */}
      <ReactPaginate
        breakLabel={"...."}
        nextLabel={
          <span className="flex items-center text-[#333]">
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-arrow-narrow-right ml-2"
              width="23"
              height="23"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#333"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="5" y1="12" x2="19" y2="12" />
              <line x1="15" y1="16" x2="19" y2="12" />
              <line x1="15" y1="8" x2="19" y2="12" />
            </svg>
          </span>
        }
        forcePage={Number(currPage) - 1}
        onPageChange={handleChange}
        pageRangeDisplayed={5}
        pageCount={noOfPages ? noOfPages : 10}
        previousLabel={
          <span className="flex items-center text-[#333]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-arrow-left mr-2"
              width="23"
              height="23"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#333"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="5" y1="12" x2="19" y2="12" />
              <line x1="5" y1="12" x2="11" y2="18" />
              <line x1="5" y1="12" x2="11" y2="6" />
            </svg>
            Prev
          </span>
        }
        marginPagesDisplayed={3}
        pageClassName="px-3 py-1 text-[#333] rounded-[4px] md:mx-2 z-10 bg-white font-bold text-[#333  inline-flex items-center justify-center border text-sm "
        containerClassName="scale-[60%] w-fit md:scale-100 md:w-fit  text-blue-500 font-bold flex items-center justify-center"
        activeClassName="text-[#ffff] z-10 bg-[#333] font-bold text-[#333] inline-flex items-center  border text-sm"
        previousClassName={
          currPage === 1
            ? "mr-2 px-3 py-1 rounded-[4px] bg-white text-gray-400 cursor-not-allowed opacity-[0.5]"
            : "mr-2 px-3 py-1 rounded-[4px] bg-white cursor-pointer"
        }
        nextClassName={
          currPage === noOfPages
            ? "ml-2 px-3 py-1 rounded-[4px] bg-white border-gray-300  text-gray-400 cursor-not-allowed opacity-[0.5]"
            : "ml-2 px-3 py-1 rounded-[4px] bg-white border-gray-300 border cursor-pointer"
        }
      />
    </div>
  );
};

interface Ipage {
  pageId?: number;
  setPageId?: any;
  pageLimit?: number;
  setPageLimit?: any;
  noOfPages?: number;
  currPage?: number;
  refetch?: any;
  bg?: any;
}
export default Paginations;

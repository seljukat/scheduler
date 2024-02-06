import { useEffect, useState, useContext } from "react";
import { QueryContext } from "../contexts/QueryContext";
import ReactPaginate from 'react-paginate';
import '../styles/Pagination.css';

function Items({ currentItems }) {
    return (
        <div className="items">
            {currentItems && currentItems.map((item, index) => (
                <div className="scheduler-grid-container" key={index} dangerouslySetInnerHTML={{ __html: item.innerHTML }} />
            ))}
        </div>
    );
}

function Pagination({ itemsPerPage, allItems }) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    let {
        setPageNumber,
        finalQuery,
    } = useContext(QueryContext);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setPageNumber(itemOffset);
        // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        if (allItems !== undefined) {
            setCurrentItems(allItems.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(allItems.length / itemsPerPage));
        } else {
            setPageCount(0);
        }
    }, [itemOffset, itemsPerPage, setPageNumber, allItems, finalQuery]);

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % allItems.length;
        // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    return (
        <>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={-1}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />

            {(currentItems !== null && currentItems !== undefined && currentItems.length > 0) &&
                <Items currentItems={currentItems} />}
        </>
    );
}

export default Pagination;

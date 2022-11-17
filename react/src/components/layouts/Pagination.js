import React from 'react';
import { Link } from 'react-router-dom';
import { usePagination, DOTS } from '../../helper/usePagination';

function Pagination(props) {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });


    let lastPage = paginationRange[paginationRange.length - 1];

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let DOTSoccurence = 0;

    return (
        <ul>
            <li className={(currentPage === 1) ? "disabled" : ""} >
                <Link to="#" onClick={onPrevious} >
                    <i className="far fa-angle-double-left" />
                </Link>
            </li>

            {paginationRange.map(pageNumber => {
                if(pageNumber === DOTS) {
                    DOTSoccurence++;
                    return (
                        <li key={DOTSoccurence===1 ? "first-dot" : "second-dot" } className="disabled">
                            <Link to="#">...</Link>
                        </li>
                    );
                }

                return (
                    <li key={pageNumber} className={(pageNumber === currentPage) ? "active" : ""} >
                        <Link to="#" onClick={() => onPageChange(pageNumber)} >
                            {pageNumber}
                        </Link>
                    </li>
                );
            })}

            <li className={(currentPage === lastPage) ? "disabled" : ""} >
                <Link to="#" onClick={onNext} >
                    <i className="far fa-angle-double-right" />
                </Link>
            </li>
        </ul>
    );

}

export default Pagination;
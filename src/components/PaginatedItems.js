import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../style/paginatedItems.css'
import moment from 'moment';

// Example items, to simulate fetching from another resources.


function Items({ currentItems }) {
  return (
    <>
    {/* {console.log('currentItems',currentItems)} */}
      {currentItems && currentItems.length > 0 &&   
        currentItems.map((item,index) => (
            
          <div className='card-slider-container' key={index}>
              <div className='inner-card-top'>
            <img className='card-image' src={item.image} alt='product-img' />
            <div >
            <h3>{item.product_name}</h3>
            <h4>{item.brand_name}</h4>
            <h4>$ {item.price}</h4>
            </div>
            </div>

            <div>
            <h4 className='state'>  {item.address.state}</h4>
            <h4 className='city'>{item.address.city}</h4>
            <h4 className='date'>Date: {moment(item.date).format('DD:MM:YYYY')}</h4>
            <h4 className='discription'> {item.discription}</h4>
          
            </div>
          </div>
        ))}
    </>
  );
}

export default function PaginatedItems({ itemsPerPage,posts }) {
     
 
  // We start with an empty list of items.
  
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets

  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
   
    setCurrentItems(posts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(posts.length / itemsPerPage));
 
  }, [posts,itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
      
    const newOffset = (event.selected * itemsPerPage) % posts.length;
   
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
  
    setItemOffset(newOffset);
  };

  return (
    <>
    
    <div className='items'>
      <Items currentItems={currentItems}  />
      </div>
      <ReactPaginate
      className='pagination'
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}  
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
        previousLinkClassName="previous"
        nextLinkClassName="next"
        pageLinkClassName="paginatedNumber"
        pageClassName="break"
      
      />
    </>
  );
}
import React from 'react'
import PaginatedItems from './PaginatedItems';
import useWindowDimensions from '../hooks/useWindowDimensions';

function Posts({posts,loading}) {
    const {width}= useWindowDimensions();
    if(loading){
        return <h2>Loading...</h2>
    } 
    return (
        <>     {width > 600 ?
            <PaginatedItems itemsPerPage={4} posts={posts}/> 
            :
            <PaginatedItems itemsPerPage={2} posts={posts}/> 
        }     
        </>
        
    )
}

export default Posts

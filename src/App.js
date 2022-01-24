import React,{useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Posts from './components/Posts';





function App() {

  const [posts,setPosts]=useState([]);
  const [loading,setLoading]= useState(false);
  const [product,Setproduct] = useState('0');
  const [city,SetCity] = useState('0');
  const [state,SetState] = useState('0');


  const fetchPosts = async ()=>{
    setLoading(true);
    const res = await axios.get('https://assessment-edvora.herokuapp.com');
    setPosts(res.data);
    setLoading(false);
  }
  useEffect(()=>{
    fetchPosts();
  },[]); 

  function compareName(a, b) {

    // converting to uppercase to have case-insensitive comparison
    const product_name1 =  a.product_name.toUpperCase();
    const product_name2 =  b.product_name.toUpperCase();

    let comparison = 0;

    if (product_name1 > product_name2) {
        comparison = 1;
    } else if (product_name1 < product_name2) {
        comparison = -1;
    }
    return comparison;
}

// split into multi dimension array

function group(posts) {
  let map = new Map(posts.map(o => [o.product_name, []]));
 
  for (let o of posts) map.get(o.product_name).push(o);
 
  let arr= [
      ...[...map.values()].filter(({length}) => length > 1),
      [...map.values()].filter(({length}) => length === 1).flat()
    
  ];
  

  return arr

 
}

  //Get current posts

  //sorting for faster algorith comparison
  const currentPosts  = group(posts.sort(compareName)).filter(({length}) => length > 1);

 




  // Filter Product Name
  const seenProduct = new Set();
  const filteredArrProduct = posts.filter(el => {
    const duplicate = seenProduct.has(el.product_name);
    seenProduct.add(el.product_name);
    return !duplicate;
  });
  // Filter City 
  const seenCity = new Set();
  const filteredArrCity = posts.filter(el => {
    const duplicate = seenCity.has(el.address.city);
    seenCity.add(el.address.city);
    return !duplicate;
  });

   // Filter State 
   const seenSate = new Set();
   const filteredArrState = posts.filter(el => {
     const duplicate = seenSate.has(el.address.state);
     seenSate.add(el.address.state);
     return !duplicate;
   });

   //Filter selected Product

  const filteredProduct = posts.filter(function (el){
     return  el.product_name===product    
  });

  const filteredCity = posts.filter(function (el){
    return  el.address.city===city   
    
 });

 const filteredState = posts.filter(function (el){
  return  el.address.state===state   
  
});

const filteredBoth = posts.filter(function (el){
  return  el.address.state===state &&  el.address.city===city;
  
});


  return (

    <div className='container'>
    
     
    
      <div className='dropdown-container'>
  
    <input placeholder='Filters' />
    
  <select name="products" id="products" onChange={(e)=>{
   
    Setproduct(e.target.value)}
    
    }>
  <option value={0}>Products</option>   
    {filteredArrProduct.map((fil,index)=>{
      return  <option  key={index} value={fil.product_name}>{fil.product_name}</option>
    })}
  
  </select>

  
  <select name="state" id="state" onChange={(e)=>{
   
    SetState(e.target.value)} 
    }>
  <option value={0}>State</option>   
    {product==='0' && city==='0' ? filteredArrState.map((fil,index)=>{
       return <option  key={index} value={fil.address.state}>{fil.address.state}</option>
     
    })
    :
    filteredArrState.map((fil,index)=>{
      return  <option  key={index} value={fil.address.state}>{fil.address.state}</option>
    })
    
  }
  
  </select>
  


  
  <select name="city" id="city" onChange={(e)=>{
   
    SetCity(e.target.value)} 
    }>
  <option value={0}>City</option>   
    {product==='0' && state==='0' ? filteredArrCity.map((fil,index)=>{
      
       return <option  key={index} value={fil.address.city}>{fil.address.city}</option>
     
    })
    :
    <>
    {state==='0' &&
    filteredProduct.map((fil,index)=>{
      return  <option  key={index} value={fil.address.city}>{fil.address.city}</option>
    })
  }
    {state!=='0' &&
    filteredState.map((fil,index)=>{
      return  <option  key={index} value={fil.address.city}>{fil.address.city}</option>
    })
  }

</>
  }
  
  </select>

      </div>
      <div className='product-container'>

   
        <h1>Edvora</h1>
        <h2>Products</h2>

      {product==='0'?
          Object.keys(currentPosts).map((key)=> {

         
         return (
          <div className='card-container' key={key}>
          <div >
          <h1>{currentPosts[key][key]?.product_name}</h1>
       
         <hr className='line'/>
         <div className='card'>
           <div className='inner-card'>
            {city==='0' && state==='0' ?
            <Posts  posts={currentPosts[key]} loading={loading}/>  
           :  
           <>
         
         { city!=='0' && <Posts  posts={filteredCity} loading={loading}/> }
       
         { state!=='0' && <Posts  posts={filteredState} loading={loading}/>  }
         </> 
            }
            </div>
            </div>
            </div>
       </div>              
         )
       })
       
      :
      
      <div className='card-container'>
           <div >
       <h1>{filteredProduct[1].product_name}</h1>
       <hr className='line'/>
       <div className='card'>
           <div className='inner-card'>
       {city ==='0'  && state==='0' ?
         <Posts  posts={filteredProduct} loading={loading}/> 
         :
         <>
         { city!=='0' && state==='0' && <Posts  posts={filteredCity} loading={loading}/> }
         { city==='0' && state!=='0' && <Posts  posts={filteredState} loading={loading}/> }
        
         { city!=='0' && state!=='0' &&
         <div>
        
         <Posts  posts={filteredBoth} loading={loading}/> 
         </div>
         
         }
         </> 
          
       }
        </div>
      </div>
       </div>
      </div>
      }
       </div>
     
    </div>
  );
}


export default App;

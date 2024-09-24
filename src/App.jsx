import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem } from './config/redux/reducers/cartSlice';
import Navbar from './components/Navber';

const App = () => {

  const [products, setProducts] = useState();

  //   selector
  const selector = useSelector(state => state.cart.cartItems)
  console.log(selector);

//  Api handling
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(res => {
        setProducts(res.products)
      })
      .catch(err => console.log(err))
  }, [])

  //   dispatch
  const dispatch = useDispatch()

  const addToCart = (item) => {
    console.log(item);
    dispatch(addCartItem({
      item
    }))
  }
  



  //  Css Style
  return (
    <>

    <Navbar/>

        <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "10px"
      }}>
        {
          products ? products.map((item)=>{
            return <div style={{
              border: "1px solid black",
              borderRadius: "20px",
              padding: "20px",
              margin: "10px"
            }} key={item.id}>
            <img width="200" src={item.thumbnail} alt="productImg" />
            <h2>{item.title.slice(0, 15) + "..."}</h2>
            <h1>{item.price}</h1>
            <button onClick={()=>addToCart(item)}>Cart</button>            
            </div>
          })
          : <p>Item Not Found!</p>
        }
      </div>

    </>
  )
}

export default App
import { useContext, useEffect, useState } from "react"
import "./wishlist.css"
import { UserContext } from "../../context/userContext"

function Wishlist() {
  const {user} = useContext(UserContext)
  const [wishList, setWishList] = useState([])

  useEffect(()=>{
      async function getWishList(){
        try {
          const response = await fetch(`http://localhost:5100/api/wishlist/get/${user._id}`)

            if(response.ok){
              const data = await response.json();
              setWishList(data)
              console.log(data);
            }else {
              const { error } = await response.json();
              throw new Error(error.message);
             } 
        }catch (error) {
          console.log(error.message);
      }

    }
    getWishList()
  },[user._id])


  return (
    <>
    <h3>Wishlist</h3>
    {!!wishList.length &&
          wishList.map((item) => (
            <div className="productsBox" key={item._id}>
              <div className="imageBox">
                <img src={item.image} alt="" width={100} height={100} />
                <button className="addToCart">add to cart</button>
                
              </div>
              <div className="info">
                <p>~ {item.name} ~</p>
                <p>{item.price}€</p>
              </div>
            </div>
          ))}

    </>
  )
}

export default Wishlist
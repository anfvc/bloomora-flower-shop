import React, { useState, useEffect } from "react";
import "./MyOrders.css";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

function MyOrders() {
  const { user, orders, setOrders } = useContext(UserContext);

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}/order/all/${user.user._id}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setOrders(data);
        } else {
          const { error } = await response.json();
          throw new Error(error.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getOrders();
  }, [user.user?._id, user.user?.orders]);

  function total(order) {
    return order.orderItems.reduce(
      (acc, current) => acc + current.product.price * current.quantity,
      0
    );
  }

  console.log(orders);
  console.log(user);

  return (
    <>
      <div className="wishlist-container">
        <div className="wishListBox">
          {!!orders?.length &&
            orders.map((order) => (
              <div className="productsBox" key={order._id}>
                <div className="info">
                  <h2>Order Number {order._id}</h2>
                  <p>Order Status: {order.status}</p>
                  <p>Order Placed: {new Date(order.date).toLocaleString()}</p>
                  <p>Total: {total(order)}€</p>
                  <div>
                    {order.orderItems.map((item) => {
                      return (
                        <div key={item._id}>
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                          />
                          <p>Ordered Products: {item.product.name}</p>
                          <p>Product Price: {item.product.price}€</p>
                          <p>Product Quantity: {item.quantity}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default MyOrders;

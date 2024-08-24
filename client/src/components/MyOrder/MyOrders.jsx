import React, { useState, useEffect } from "react";
import "./MyOrders.css";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useTranslation } from "react-i18next";

function MyOrders() {
  const { user, orders, setOrders } = useContext(UserContext);
  const { t } = useTranslation();

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

  return (
    <>
      <div className="order-container">
        <div className="orderHeader">
          <h1>{t("userPanel.myOrders.header")}</h1>
        </div>
        <div className="orderBox">
          {!!orders?.length &&
            orders.map((order) => (
              <div className="productsBox" key={order._id}>
                <div className="info">
                  <div className="image-info">
                    {order.orderItems.map((item) => {
                      return (
                        <div className="productInfo" key={item._id}>
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                          />
                          <p>
                            <span>{t("userPanel.myOrders.orderedProducts")}</span> {item.product.name}
                          </p>
                          <p>
                            <span>{t("userPanel.myOrders.productPrice")}</span> {item.product.price}€
                          </p>
                          <p>
                            <span>{t("userPanel.myOrders.productQuantity")}</span> {item.quantity}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="orderInfos">
                    <h2>
                      <span>{t("userPanel.myOrders.orderNumber")}</span> {order._id}
                    </h2>
                    <p>
                      <span>{t("userPanel.myOrders.orderStatus")}</span> {order.status}
                    </p>
                    <p>
                      <span>{t("userPanel.myOrders.orderPlaced")}</span>{" "}
                      {new Date(order.date).toLocaleString()}
                    </p>

                    <h5>{t("userPanel.myOrders.deliveryAddress")}</h5>
                    <p>
                      <span>{t("userPanel.myOrders.street")}</span> {order.deliveryAddress.street}{" "}
                      {order.deliveryAddress.houseNum}
                    </p>
                    <p>
                      <span>{t("userPanel.myOrders.plz")}</span> {order.deliveryAddress.zip}
                    </p>
                    <p>
                      <span>{t("userPanel.myOrders.city")}</span> {order.deliveryAddress.city}
                    </p>

                    <p>
                      <span>{t("userPanel.myOrders.total")}</span> {total(order)}€
                    </p>
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

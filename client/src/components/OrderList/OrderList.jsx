/* eslint-disable react/prop-types */
import React from "react";
import styles from "./OrderList.module.css";

export default function OrderList({ orders }) {
  return (
    <ul className={styles.listContainer}>
      {orders.map((order) => (
        <li className={styles.listItem} key={order.Id}>
          <p>Заголовок: {order.Title}</p>
          <p>Цена: {order.Price}</p>
          <p>Адрес доставки: {order.DeliveryAddress.AddressLine1}</p>
          {order.Shipping?.Phone && <p>Телефон: {order.Shipping.Phone}</p>}
        </li>
      ))}
    </ul>
  );
}

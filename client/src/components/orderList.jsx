import React from "react";
import styles from './OrderList.module.css';


export default function orderList({ orders }) {
  return (
    <ul className={styles.list__container}>
      {orders.map((order) => (
        <li className={styles.list__item} key={order.Id}>
            <p>Заголовок: {order.Title}</p>
            <p>Цена: {order.Price}</p>
            <p>Адрес доставки: {order["DeliveryAddress"]["AddressLine1"]}</p>
            <p>Телефон: {order["Shipping"]["Phone"]}</p>

        </li>
      ))}
    </ul>
  );
}

import React from "react";
import styles from './OrderList.module.css';


export default function orderList({ orders }) {
  return (
    <ul className={styles.list__container}>
      {orders.map(({ Id,DeliveryAddress, Title,  }) => (
        <li className={styles.list__item} key={Id}>
            <p>{Title}</p>
            <p>{Id}</p>
        </li>
      ))}
    </ul>
  );
}

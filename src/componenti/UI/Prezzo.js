import React from "react";
import { BiEuro } from "react-icons/bi";

/**
 * @author
 * @function Price
 **/

const Price = (props) => {
  return (
    <div
    >Prezzo Biglietto:
      <BiEuro />
      {props.value}
    </div>
  );
};

export default Price;
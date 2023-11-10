import React,{useState,useEffect} from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import CardSection from "./CardSection";
import { useDispatch } from "react-redux";
import { SetOrderCount } from "../redux/actions/order";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import {
  setFirstName,
  setLastName,
  setAddress,
  setPhone,
  setEmail,
  setCity,
  setPostal,
} from "../redux/actions/orderDetail";

function CheckoutForm(props) {
  console.log("Props", props);
  const [stripe, setStripe] = useState(null);
  const [cartItems, setCartItems] = React.useState([]);
  const [elements, setElements] = useState(null);
  const formData = useSelector((state) => state.orderDetailReducer); // Use useSelector to fetch formData
  const user = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();

  useEffect(() => {
    const { stripe, elements, formData } = props;
    setStripe(stripe);
    setElements(elements);
    
  }, [props]);

  useEffect(() => {
    axios.get(`http://localhost:4000/order/get/${user.userId}`).then((res) => {
      setCartItems(res.data);
    });
  }, []);

  // Calculate the total amount
  const totalAmount = cartItems.reduce((total, item) => {
    const currentPrice = item.products.currentPrice.$numberDecimal.toString();
    return total + parseFloat(currentPrice); // Parse and add the value
  }, 0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      axios
        .post(`http://localhost:4000/payment/make`, {
          tokenId: result.token.id,
          price: totalAmount,
        })
        .then((res) => {
          axios
            .post(`http://localhost:4000/order/address/${user.userId}`, formData)
            .then((res) => {
              toast.success("Order Placed Successfully");
              dispatchRedux(SetOrderCount("0"));
              dispatchRedux(setFirstName(""));
            dispatchRedux(setLastName(""));
            dispatchRedux(setEmail(""));
            dispatchRedux(setAddress(""));
            dispatchRedux(setCity(""));
            dispatchRedux(setPostal(""));
            dispatchRedux(setPhone(""));
              navigate("/");
            });
        });
    }
  };

  return (
    <div>
      <div className="product-info">{/* Display product info here */}</div>
      <form onSubmit={handleSubmit}>
        <CardSection />
        <button disabled={!stripe} className="btn-pay">
          Buy Now
        </button>
      </form>
    </div>
  );
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}

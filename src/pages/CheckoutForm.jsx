import React, { useState, useEffect } from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import CardSection from "./CardSection";
import { useDispatch, useSelector } from "react-redux";
import { SetOrderCount } from "../redux/actions/order";

function CheckoutForm(props) {
  const [stripe, setStripe] = useState(null);
  const [elements, setElements] = useState(null);
  const [formData,setFormData] = useState(null);
  const [amount,setAmount] = useState(null);
  const user= useSelector((state)=>state.authReducer)
  const dispatchRedux = useDispatch();
  useEffect(() => {
    const { stripe, elements , formData ,amount } = props;
    setStripe(stripe);
    setElements(elements);
    setFormData(formData);
    setAmount(amount);
  }, [props]);

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
      console.log("Token",result.token);
      axios.post(`http://localhost:4000/payment/make`, {tokenId:result.token.id, price:amount})
      .then((res)=>{
        axios.post(`http://localhost:4000/order/address/${user.userId}`, formData)
        .then((res)=>{  
          console.log("Hello:",res)
          dispatchRedux(SetOrderCount('0'))
            
      })})
      }
  };

  return (
    <div>
      <div className="product-info">
      </div>
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

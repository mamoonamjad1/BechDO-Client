import React, { useState, useEffect } from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import CardSection from "./CardSection";
import { useDispatch, useSelector } from "react-redux";
import { SetOrderCount } from "../redux/actions/order";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CheckoutForm(props) {
  console.log("PROPPPS",props.amount)
  const [stripe, setStripe] = useState(null);
  const [cartItems, setCartItems] = React.useState([]);
  const [elements, setElements] = useState(null);
  const [formData,setFormData] = useState(null);
  const [amount,setAmount] = useState(null);
  const user= useSelector((state)=>state.authReducer)
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();
  useEffect(() => {
    const { stripe, elements , formData  } = props;
    setStripe(stripe);
    setElements(elements);
    setFormData(formData);
  }, [props]);

  useEffect(()=>{
    axios.get(`http://localhost:4000/order/get/${user.userId}`)
    .then((res)=>{
    console.log("CART:",res)
    setCartItems(res.data)

    })
    },[])
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
      console.log("Token",result.token);
      axios.post(`http://localhost:4000/payment/make`, {tokenId:result.token.id, price:10})
      .then((res)=>{
        axios.post(`http://localhost:4000/order/address/${user.userId}`, formData)
        .then((res)=>{  
          console.log("Hello:",res)
          toast.success("Order Placed Successfully");
          dispatchRedux(SetOrderCount('0'))
          navigate("/")
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

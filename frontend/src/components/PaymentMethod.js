import { React, useEffect, useState } from "react";

function PaymentMethod() {
  const [paymentMethodsCount, setPaymentMethodsCount] = useState();
  const [paymentMethodsCountendingineven, setPaymentMethodsCountendingineven] =
    useState();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [idCard, setIdCard] = useState();

  //TODO JG Implement fetch inside of useEffect for the first pull and set the state of paymentMethod
  useEffect(() => {
    fetch("http://127.0.0.1/payment_methods?type=credit_card")
      .then((response) => response.json())
      .then((data) => setPaymentMethods(data))
      .catch((error) => console.log(error));
    setTimeout(() => {
      window.location.reload();
    }, 30000);
  }, []);

  //TODO JG implemente isLoagind just for the first pull
  useEffect(() => {
    if (paymentMethods) {
      setIsLoading(false);
    }
  }, []);

  function evenNumber(number) {
    const lastNumber = number.toString().split("").pop();
    if (lastNumber % 2 === 0) {
      return true;
    }
  }

  const deleteCard = () => {
    if (idCard) {
      fetch(`http://127.0.0.1/payment_methods/delete/${idCard}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((res) => console.log(res));

      window.location.reload();
    }
  };

  useEffect(() => {
    const paymentMethodsEven = paymentMethods.filter((e) => {
      return evenNumber(e.last4);
    });
    setPaymentMethodsCountendingineven(paymentMethodsEven.length);
  }, [paymentMethods]);

  useEffect(() => {
    setPaymentMethodsCount(paymentMethods.length);
  }, [paymentMethods]);

  return (
    <div className="App">
      <h1>Payment Methods.</h1>
      <h2>Total: ({paymentMethodsCount})</h2>
      <h2>
        Total ending in an even number: ({paymentMethodsCountendingineven}){" "}
      </h2>
      <div>
        <h4>Delete By Card ID:</h4>
        <select
          name="id_card"
          id="id_card"
          onChange={(e) => setIdCard(e.target.value)}
        >
          <option value={false}>Select an id card</option>
          {paymentMethods.map((e) => {
            return (
              <option key={e.id} value={e.id}>
                {e.id}
              </option>
            );
          })}
        </select>
        <button onClick={() => deleteCard()}>Delete Card</button>
      </div>
      <hr />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {paymentMethods.map((o, key) => {
            return (
              // TODO JG Implement key for each list item
              <li key={key}>
                Brand: {o.brand}, Last 4: {o.last4}, Created At: {o.created_at}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default PaymentMethod;

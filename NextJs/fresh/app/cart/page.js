export default function Cart() {
  let cart = ['Tomatoes', 'Pasta', 'Coconut'];

  return (
    <div>
      <h4 className="title">Cart</h4>
      <CartItem cart={cart} />
    </div>
  )
}

function CartItem(props) {
  return(
    props.cart.map((a,i) => {
      return(
        <div className="cart-item">
          <p>{a}</p>
          <p>$40</p>
          <p>1개</p>
          <Btn />
        </div>
      )
    }) 
  )
}

function Btn() {
  return(
    <button style={{background: 'red'}}>btn</button>
  )
}
export default function List() {
  let product = ['Tomatoes', 'Pasta', 'Coconut'];

  return (
    <div>
      <h4 className="title">list</h4>
      {
        product.map((a,i) => {
          return(
            <div className="food" key={i}>
              <img src={"/food" + i + ".png"} className="food-img" />
              <h4>{a} $40</h4>
            </div>
          )
        })
      }
    </div>
  )
}
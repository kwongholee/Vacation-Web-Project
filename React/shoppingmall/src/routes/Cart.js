import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

function Cart() {

    let a = useSelector((state) => {return state.cartproduct});

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>       
                </thead>
                <tbody>
                    {
                        a.map((a,i) => {
                            return(
                                <tr>
                                    <td>{a.id}</td>
                                    <td>{a.name}</td>
                                    <td>{a.count}</td>
                                    <td>?</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table> 
        </div>
    )
}

export default Cart;
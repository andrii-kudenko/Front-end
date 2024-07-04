import React from "react";

const Checkout = () => {
    
    const saveAddressToDb = () => {
        pass
    }

    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                <br/>
                <br/>
                <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>Save</button>
                <hr/>
                <h4>Got Coupon?</h4>
                <br/>
                coupon input
            </div>

            <div className="col-md-6">
                <h4>Order Summary</h4>
                <hr/>
                <p>Products x</p>
                <hr/>
                <p>List of produtcs</p>
                <hr/>
                <p>Cart total: $x</p>

                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-primary">Place Order</button>
                    </div>
                    <div className="col-md-6">
                        <button className="btn btn-primary">Empty Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
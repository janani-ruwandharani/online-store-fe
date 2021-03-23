import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { render } from "react-dom";


class ItemDisplayComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      cart : [],
      count: [],
      total:0,
    };
  }
  
  componentDidMount() {
    var self = this;
    axios
      .get(`${process.env.REACT_APP_BACK_END_SERVICE}/api/items`)
      .then(function(response) {
        self.setState({ items: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  

  render() {
    const items = this.state.items;
    const cart = this.state.cart;
    const count = this.state.count;
    const total = this.state.total;
    //console.log(items);


    const addToCart = (item, price)=>{
      this.setState({cart:cart.concat(item)})
      this.setState({total:total + price})
      this.setState({count:count + 1})
    };

    if(Array.isArray(items) && items.length>0){return (
      <div>
         <header>
          <button>Cart({count.length}) Total({total})</button>
        </header>
        <main role="main">
          <div className="album py-5 bg-light">
            <div className="container">
              <div className="row">
                {items.map(item => (
                  <div className="col-md-4" key={item._id}>
                    <div className="card mb-4 shadow-sm">
                      <a
                        href={"/#/viewItem/" + item._id + "/#"}
                        className="card-img-top-new"
                      >
                        <img src={item.imageLocation} className="card-img-top-new"/>
                      </a>
                      <div className="card-body">
                        <h5>{item.name}</h5>
                        <br />
                        <p className="card-text">
                          {item.description}
                          <br />
                          {item.price}
                          <br />
                          {item.owner.name}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <a href={"/#/viewItem/"+item._id}
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                            >
                              View
                            </a>
                            <a 
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                              
                              onClick = {()=>addToCart(item.name, item.price)}
                            >
                              Add to Cart
                            </a>
                            {/*<a href={"/#/editItem/"+item._id}
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                            >
                              Edit
                            </a>*/}
                          </div>
                          {/*<small className="text-muted">9 mins</small>*/}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    )}
    else{
      return(<div></div>)
    }
  }
}
export default ItemDisplayComp;

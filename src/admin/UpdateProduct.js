import React, { useEffect, useState } from 'react'
import { Link, matchPath, useHistory } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getProduct, getCategories, updateProduct } from './helper/adminapicall';


const UpdateProduct = ({match}) => {

  const {user , token} = isAuthenticated();

    const [values, setValues] = useState({
        name : "",
        description : "",
        price : "",
        stock : "",
        photo :"",
        categories : [],
        category : "",
        loading : false,
        error : "",
        createdProduct : "",
        getRedirect : false,
        formData : "",
    })

    const {name, description, price, stock, photo, 
        categories, category, loading, error, createdProduct, 
        getRedirect, formData } = values;

    const preload = (productId) => {
            getProduct(productId).then(data => {
                console.log(data);
                if(data.error){
                    setValues({...values, error : data.error})
                }
                else{
                    preloadCategories();
                    setValues({
                        ...values,
                        name : data.name,
                        description : data.description,
                        price : data.price,
                        category : data.category._id,
                        stock : data.stock,
                        formData : new FormData()
                    })
                    console.log(categories);
                }
            })
    }

    const preloadCategories = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values, error : data.error});
            }
            else{
                setValues({
                categories : data,
                formData : new FormData()
            })
            }
        })
    }

    
    useEffect(() => {
        preload(match.params.productId);
    }, [])


const history = useHistory();

    const onSubmit = (event) => {
      event.preventDefault();
      setValues({...values, error : "", loading : true});

      updateProduct(match.params.productId, user._id, token, formData).then(data => {
        if(data.error){
          setValues({...values, error : data.error})
        }
        else{
          setValues({
            ...values,
            name : "",
            description:"",
            price : "",
            photo : "",
            stock : "",
            loading : false,
            createdProduct : data.name,
            getRedirect : true
          })
        }
      })
    }

    const performRedirect = () => {
      if(getRedirect){
          setTimeout(() => {
            history.push("/admin/products")
          }, 2000);
      }
    }

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value 
        formData.set(name, value);
        setValues({...values, [name] : value})
    }

    const successMsg = () => (
      <div className="alert alert-success mt-3" style={{display : createdProduct ? "" : "none"}}>
        <h4>{createdProduct} successfully updated </h4>
      </div>
    )

    const errorMsg = () => {
      if(error){
          return <h4 className="text-danger">Failed to update product</h4>
      }
  }

    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories && 
              categories.map((cate, index) => (
                <option key={index} value={cate._id}>{cate.name}</option>
              ))}
              
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
            Update Product
          </button>
        </form>
      );

    return (
        <Base title="Add Product" description="welcome to product creation section" className="container bg-info p-4">
            <h1 className="text-white">Add Product</h1>
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                {successMsg()}
                {errorMsg()}
                   {createProductForm()}
                   {performRedirect()}
                </div>
            </div>
        </Base>
    )
}


export default UpdateProduct;
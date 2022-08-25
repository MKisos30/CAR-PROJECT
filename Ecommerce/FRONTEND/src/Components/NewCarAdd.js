import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addNewProduct } from '../Redux-Store/Reducers/updateSlice';

const NewCarAdd = () => {
    const dispatch = useDispatch()

    const addNewCar = async (event) => {
       try {
        event.preventDefault()

        const type = event.target.elements.type.value;
        const name = event.target.elements.name.value;
        const color = event.target.elements.color.value;
        const price = event.target.elements.price.value;
        const engineCapacity = event.target.elements.engineCapacity.value;
        const folder = event.target.elements.folder.value;
        const img = event.target.elements.img.value;

        dispatch(addNewProduct({name, type, color, price, engineCapacity,img, folder}))
              
       } catch (error) {
           console.log(error)
       }
    }

  return (
    <div>
      <form onSubmit={addNewCar} className="formNewCar">
      <h1>Add new car</h1>
        <input type="text" name="type" placeholder="Please enter car type" />
        <input type="text" name="name" placeholder="Please enter car name" />
        <input type="text" name="color" placeholder="Please enter car color" />
        <input type="number" name="price" placeholder="Please enter car price" />
        <input type="number" name="engineCapacity" placeholder="Please enter car engine-capacity" />
        <input type="text" name="folder" placeholder="Please enter folder of img" />
        <input type="text" name="img" placeholder="Please enter car img" />
        <button type="submit">Add new car</button>
      </form>
    </div>
  )
}

export default NewCarAdd
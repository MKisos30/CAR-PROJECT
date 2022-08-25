import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { editStatusChange, listCarState } from '../Redux-Store/Reducers/editCarSlice';
import { updateCarItem, updateStatus } from '../Redux-Store/Reducers/updateSlice';

const EditWindow = ({ displayWindow, setDisplayWindow }) => {
  const car = useSelector(listCarState)
  const dispatch = useDispatch()
  const updatestatus = useSelector(updateStatus)

  const updateCar = async (event) => {
    try {
      event.preventDefault();

      const id = event.target.id
      const type = event.target.elements.type.value;
      const name = event.target.elements.name.value;
      const price = event.target.elements.price.value;
      const color = event.target.elements.color.value;
      const engineCapacity = event.target.elements.engineCapacity.value;
      const folder = event.target.elements.folder.value;
      const img = event.target.elements.img.value;

      dispatch(updateCarItem({ id, type, name, price, color, engineCapacity, folder, img }))

      event.target.reset()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (updatestatus === "succses") {
      dispatch(editStatusChange())
      setDisplayWindow("none")
    }
  }, [updatestatus, dispatch])

  return (
    <div className="editWindow" style={{ display: displayWindow }}>
      <div className="editWindow__background">
        <div className="editWindow__closeBtn" onClick={() => { setDisplayWindow("none") }}>X</div>
        <h1>Edit {car.name}</h1>
        <form onSubmit={updateCar} id={car._id} className="editWindow__form">
          <input type="text" name="type" defaultValue={car.type} />
          <input type="text" name="name" defaultValue={car.name} />
          <input type="text" name="price" defaultValue={car.price} />
          <input type="text" name="color" defaultValue={car.color} />
          <input type="text" name="engineCapacity" defaultValue={car.engineCapacity} />
          <input type="text" name="folder" defaultValue={car.folder} />
          <input type="text" name="img" defaultValue={car.img} />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  )
}

export default EditWindow
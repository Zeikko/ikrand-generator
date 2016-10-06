import React from 'react'
import './Item.scss'

export const Item = (props) => (
  <div>
    <h2 className="name">{props.item.name}</h2>
    <div className="description">{props.item.description}</div>
    <button className='btn btn-primary' onClick={props.generateItem}>
      Generate Item
    </button>
  </div>
)

Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  generateItem: React.PropTypes.func.isRequired
}

export default Item

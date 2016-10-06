import React from 'react'
import './Item.scss'

class Item extends React.Component { 

  componentDidMount() {
    this.props.getItemTypes()
  }

  render() {
    return (
      <div>
        <form className="form-horizontal">
        <div className="form-group">
          <label className="col-sm-2 control-label">Item Type</label>
          <div className="col-sm-4">
            <select className="form-control item-type-select" onChange={this.props.setItemType}>
              {this.props.item.itemTypes.map(itemType => <option className="item-type-option" key={itemType.name}>{itemType.name}</option>)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">Potency</label>
          <div className="col-sm-4">
            <select className="form-control" onChange={this.props.setEnchantmentCount}>
              <option value="random">Random</option>
              <option value="1">Enchanted</option>
              <option value="2">Artifact</option>
              <option value="3">Major Artifact</option>
            </select>
          </div>
        </div>
        </form>
        <div className="row">
          <div className="col-sm-2 col-md-offset-2">
          <button className="btn btn-primary generate-item-button" onClick={this.props.generateItem}>Generate Item</button>
          </div>
        </div>
        <h2 className="name">{this.props.item.result.name}</h2>
        <ul className="description">
        {this.props.item.result.descriptions.map(description => <li key={description}>{description}</li>)}
        </ul>
      </div>
    )
  }
}

Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  generateItem: React.PropTypes.func.isRequired,
  getItemTypes: React.PropTypes.func.isRequired,
  setItemType: React.PropTypes.func.isRequired,
  setEnchantmentCount: React.PropTypes.func.isRequired
}

export default Item

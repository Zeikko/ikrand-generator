import { connect } from 'react-redux'
import { generateItem } from '../modules/item'

import Item from '../components/Item'

const mapDispatchToProps = {
  generateItem
}

const mapStateToProps = (state) => ({
  item : state.item
})


export default connect(mapStateToProps, mapDispatchToProps)(Item)

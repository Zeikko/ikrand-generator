import { connect } from 'react-redux'
import { actions } from '../modules/item'

import Item from '../components/Item'

const mapDispatchToProps = actions

const mapStateToProps = (state) => ({
  item: state.item,
  itemTypes: state.itemTypes
})


export default connect(mapStateToProps, mapDispatchToProps)(Item)

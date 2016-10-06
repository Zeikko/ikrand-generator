import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'item',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Item = require('./containers/ItemContainer').default
      const reducer = require('./modules/item').default

      injectReducer(store, { key: 'item', reducer })

      cb(null, Item)

    }, 'item')
  }
})

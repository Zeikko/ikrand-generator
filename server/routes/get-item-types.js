import _ from 'lodash'
import { getTypeTable } from '../read-spreadsheet'

let typeTable = []
let featureTable = []

export function getItemTypes(req, res) {
  const typeTable = getTypeTable()
  res.json(typeTable)
}
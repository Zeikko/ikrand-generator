import axios from 'axios'
import parse from 'csv-parse/lib/sync'
import _ from 'lodash'

let typeTable = {}
let featureTable = {}

function readSpreadsheet(url) {
  return axios.get(url)
    .then(function (response) {
      return parse(response.data, {
        columns: true
      })
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function getTypeTable() {
  return typeTable
} 

export function getFeatureTable() {
  return featureTable
}

function update() {
  readSpreadsheet('https://docs.google.com/spreadsheets/d/1ruAQ7ANPyhweh-sJFZ7iijCY9JTB86iHXZavtLsacD8/pub?gid=0&single=true&output=csv').then(data => {
    typeTable = _.map(data, type => {
      type.probability = type.probability.length ? parseInt(type.probability) : 1
      return type
    })
  })

  readSpreadsheet('https://docs.google.com/spreadsheets/d/1CEwom9L3QxZHLjfaDtB1PB8g5aiErmcuQZ7LQciNpcw/pub?gid=0&single=true&output=csv').then(data => {
    featureTable = _.map(data, feature => {
      let aspects = feature.aspects.split(',')
      feature.aspects = {}
      _.forEach(aspects, aspect => {
        const aspectParts = aspect.split(':') 
        feature.aspects[aspectParts[0]] = parseInt(aspectParts[1])
      })
      return feature
    })
  })
}

update()

setInterval(update, 60 * 1000)
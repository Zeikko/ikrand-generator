import _ from 'lodash'
import { getTypeTable, getFeatureTable } from '../read-spreadsheet'

let typeTable = []
let featureTable = []

export function generateItem(req, res) {
  typeTable = getTypeTable()
  featureTable = getFeatureTable()
  console.log(featureTable)
  const type = getType([], 'item', req.query.type)
  type.parents = _.chain(type.parents)
    .map(parent => parent.split(','))
    .flatten()
    .value()
  const aspects = req.query.aspects
  const features = getFeatures(type, aspects)
  res.json({
    name: createName(type, features),
    descriptions: createDescriptions(type, features),
    features,
    type
  })
}

function createName(type, features) {
  const adjective = _.get(features, '[0].adjective')
  const secondAdjective = _.get(features, '[1].adjective')
  const noun = _.get(features, '[1].noun')
  const item = type.name
  const templates = []
  if(adjective) {
    templates.push(`${adjective} ${item}`)
  }
  if(adjective && noun) {
    templates.push(`${adjective} ${item} of the ${noun}`)
  }
  if(noun) {
    templates.push(`${item} of the ${noun}`)
    templates.push(`${noun} ${item}`)
  }
  if(adjective && secondAdjective) {
    templates.push(`${adjective} ${item} of ${secondAdjective}`)
  }
  return _.chain(templates)
    .shuffle()
    .head()
    .value()
}


function createDescriptions(type, features) {
  const nameMap = [
    'The ' + type.name,
    'It',
  ]
  return _.chain(features)
    .reduce((result, feature, key) => {
      return result = [...result, feature.description.replace('%item%', nameMap[key])]
    }, [type.description || null])
    .filter(description => description)
}

function getFeatures(type, aspects) {
  return _.chain(featureTable)
    .filter(feature => _.includes(type.parents, feature.type))
    .shuffle()
    .reduce((result, feature, key) => {
      const aspectsMatch = _.chain(feature.aspects)
        .map((aspectLevel, aspect) => {
          return aspects[aspect] >= aspectLevel
        })
        .every()
        .value()
      if(aspectsMatch) {
        //Subtract aspects
        _.forEach(feature.aspects, (aspectLevel, aspect) => {
          aspects[aspect] -= aspectLevel
        })
        return [...result, feature]
      } else {
        return result
      }
    }, [])
    .value()
}

function getRandom(parents, arr) {
  const max = _.chain(arr)
    .map('probability')
    .sum()
    .value()
  let random = _.random(0, max)
  const randomType = _.find(arr, item => {
    random -= item.probability
    return random <= 0
  })
  const children = getChildren(randomType.name)
  if(children.length) {
    return getRandom([...parents, randomType.name], children)
  } else {
    randomType.parents = parents
    return randomType
  }
}

function getType(parents, parentType, type) {
  const children = getChildren(parentType)
  if(parentType === type) {
    if(children.length) {
      //Pick random recursively
      return getRandom([...parents, parentType], children)
    } else {
      const item = getItem(parentType)
      item.parents = parents
      return item
    }
  } else {
    if(children.length) {
      return _.chain(children)
        .map(child => {
          return getType([...parents, parentType], child.name, type)
        })
        .flatten()
        .filter(child => child)
        .first()
        .value()
    } else {
      return false
    }
  }
}

function getItem(name) {
  return _.find(typeTable, type => {
    return type.name === name
  }) 
}

function getChildren(parentType) {
  return _.filter(typeTable, type => {
    return type.parent === parentType
  })
}

import ErrorMessages from '@src/utils/ErrorMessages'
import { monthObjects, monthsArray } from '@src/utils/DateTime.js'

const TrimString = (s) => {
  let l = 0
  let r = s.length - 1
  while (l < s.length && s[l] === ' ') l++
  while (r > l && s[r] === ' ') r -= 1
  return s.substring(l, r + 1)
}

const CompareObjects = (o1, o2) => {
  let k = ''
  for (k in o1) {
    if (o1[k] !== o2[k]) return false
  }
  for (k in o2) {
    if (o1[k] !== o2[k]) return false
  }
  return true
}

const ItemExists = (haystack, needle) => {
  for (let i = 0; i < haystack.length; i++) {
    if (CompareObjects(haystack[i], needle)) return true
  }
  return false
}

const SortArrayObjects = (a, b, type) => {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    return false
  }
  let modifier = 1
  if (type === 'desc') {
    modifier = -1
  }
  if (a[0].sortKey < b[0].sortKey) {
    return -1 * modifier
  }
  if (a[0].sortKey > b[0].sortKey) {
    return 1 * modifier
  }
  return 0
}

const SortPrimitives = (a, b, type) => {
  let modifier = 1
  if (type === 'desc') {
    modifier = -1
  }
  if (a < b) {
    return -1 * modifier
  }
  if (a > b) {
    return 1 * modifier
  }
  return 0
}

const SortByDate = (a, b, type) => {
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  let modifier = 1
  if (type === 'desc') {
    modifier = -1
  }

  const newA = new Date(a)
  const newB = new Date(b)

  if (newA < newB) {
    return -1 * modifier
  }
  if (newA > newB) {
    return 1 * modifier
  }
  return 0
}

const ExpandAllByKey = (dataArray, key) => {
  const expanded = dataArray.map((i) => {
    return i[key].map((j) => ({ ...i, [key]: j }))
  })
  return expanded.flat()
}

const getSearchStr = (Obj) => {
  if (Array.isArray(Obj)) {
    Obj = Obj.reduce(function (str, i) {
      return str + ' ' + i.sortKey
    }, '').toLowerCase()
  } else {
    Obj = Obj.toLowerCase()
  }

  return Obj
}

const isValidData = (value) => {
  let status = true
  const valueType = typeof value
  if (valueType === 'object') {
    if (!Object.keys(value).length) {
      status = false
    }
  } else {
    if (value === null || value === undefined) {
      status = false
    }
  }

  return status
}

export const IsSimilarObject = (oldObject, newObject) => {
  const xObject = ParseObject(oldObject)
  const yObject = ParseObject(newObject)
  const ObjOld = xObject?.constructor?.name
  const ObjNew = yObject?.constructor?.name
  if (ObjOld !== 'Object' || ObjNew !== 'Object') {
    return false
  }
  let count = 0
  Object.keys(xObject).forEach((key) => {
    const checkKey = Object.hasOwnProperty.call(yObject, key)
    const noSameKey = yObject[key] !== xObject[key]
    if ((!checkKey || noSameKey) && key !== 'id') {
      count++
    }
  })

  if (count > 0) {
    return false
  }
  return true
}

export const PushUniqueObjects = (dataArray, newObj) => {
  if (newObj?.constructor.name !== 'Object') {
    return {
      type: 'error',
      message: ErrorMessages.VALID_OBJECT
    }
  }

  if (dataArray?.constructor.name !== 'Array') {
    return {
      type: 'error',
      message: ErrorMessages.VALID_ARRAY
    }
  }

  const res = dataArray.map((item) => {
    return IsSimilarObject(item, newObj)
  })
  const checkIt = res.some((i) => i === true)
  if (dataArray.length && checkIt) {
    alert(ErrorMessages.NO_DUPLICATES)
  } else {
    dataArray.push(newObj)
  }
  return dataArray
}

export const ParseObject = (objectData) => {
  return JSON.parse(JSON.stringify(objectData))
}

export const StringifyObject = (objectData) => {
  return JSON.stringify(objectData)
}

export const IsValidObject = (dataObj) => {
  let objCnt = 0
  if (!dataObj || Array.isArray(dataObj)) {
    objCnt = 0
  } else {
    const objKeys = Object.keys(dataObj)
    const objValues = Object.values(dataObj)

    if (typeof dataObj === 'object' && objKeys.length) {
      objValues.forEach((elm) => {
        if (isValidData(elm)) {
          objCnt++
        }
      })
    } else {
      objCnt = 0
    }
  }

  return Boolean(objCnt)
}

export const CustomSort = (objectsArray, key, type) => {
  if (!objectsArray) return false
  if (!key) key = 'sortKey'
  if (!type) type = 'asc'
  return objectsArray?.sort((a, b) => {
    const keyExists = Object.hasOwnProperty.call(a, key)
    if (!keyExists) return false
    let itemA = a[key]
    let itemB = b[key]

    if (!isNaN(itemA)) itemA = Number(itemA)
    if (!isNaN(itemB)) itemB = Number(itemB)

    if (key === 'date') {
      return SortByDate(itemA, itemB, type)
    }

    if (Array.isArray(itemA)) {
      return SortArrayObjects(itemA, itemB, type)
    }
    return SortPrimitives(itemA, itemB, type)
  })
}

export const SearchObjectsArray = (searchData, searchStr, searchBy = '') => {
  if (!searchData.length || !searchStr) return false
  const results = []
  const toSearch = TrimString(searchStr).toLowerCase() // trim it
  for (let i = 0; i < searchData.length; i++) {
    if (searchBy !== '') {
      const searchItem = getSearchStr(searchData[i][searchBy])
      if (searchItem.indexOf(toSearch) !== -1) {
        if (!ItemExists(results, searchData[i])) {
          results.push(searchData[i])
        }
      }
    } else {
      for (const key in searchData[i]) {
        const searchItem = getSearchStr(searchData[i][key])
        if (searchItem.indexOf(toSearch) !== -1) {
          if (!ItemExists(results, searchData[i])) {
            results.push(searchData[i])
          }
        }
      }
    }
  }
  return results
}

export const RemoveMultiSpaces = (str) => {
  return str.replace(/\s\s+/g, ' ')
}

export const SpaceToUnderscore = (str) => {
  const lowerStr = str.toLowerCase()
  const noSpaces = lowerStr.replace(/\s/g, '_')
  return noSpaces
}

export const UnderscoreToSpace = (str) => {
  if (!str) return false
  const withSpaces = str.replace(/_+/g, ' ')
  const capitalized = withSpaces.Capitalize()
  return capitalized
}

export const UpdateArrayByKey = (dataArray, key, item) => {
  return dataArray?.map((i) => {
    if (i[key] === item[key]) {
      return item
    }
    return i
  })
}

export const GroupByKey = (dataArray, key) => {
  const validData = Array.isArray(dataArray) && dataArray.length
  if (!validData) return false
  const expandedData = ExpandAllByKey(dataArray, key)

  const result = expandedData.reduce((r, a) => {
    r[a[key].optValue] = r[a[key].optValue] || []
    r[a[key].optValue].push(a)
    return r
  }, Object.create(null))
  return result
}

export const descSubstr = (item, max) => {
  const descStr = item.description
  if (descStr.length > max) {
    return descStr.substr(0, max) + '...'
  } else {
    return descStr
  }
}

export const toggleElementView = (classes, action = 'show') => {
  if (!Array.isArray(classes)) {
    return false
  }

  classes.forEach((className) => {
    if (action === 'hide') {
      document.querySelectorAll(className).forEach((el) => el.classList.add('d-none'))
    } else {
      document.querySelectorAll(className).forEach((el) => el.classList.remove('d-none'))
    }
  })
}

export const openLink = (link) => {
  if (!/^https?:\/\//i.test(link)) {
    link = 'http://' + link
  }
  window.open(link, '_blank')
}

export const classNames = (clsArray) => {
  const defCls = ''

  if (!clsArray.length) return defCls

  const classes = clsArray.reduce((acc, cls) => {
    acc += ` ${cls.trim()}`
    return acc.trim()
  }, defCls)

  return classes
}

export const monthsToYears = (totalMonths) => {
  let months = 0
  let yearStr = '0 Years'
  if (totalMonths > 0) {
    yearStr = Math.floor(totalMonths / 12) + ' Years'
    months = totalMonths % 12
  }

  if (months > 0) {
    yearStr = yearStr + ' and ' + months + ' Months'
  }

  return yearStr
}

export const toUTCDate = (dateStr) => {
  let year = new Date().getUTCFullYear()
  let month = new Date().getUTCMonth()
  if (dateStr.toLowerCase() !== 'present') {
    const dateArr = dateStr.split(' ')
    year = dateArr[1]
    month = monthsArray.findIndex((month) => month.includes(dateArr[0]))
  }

  return new Date(Date.UTC(year, month))
}

export const monthDiffer = (d1, d2) => {
  if (typeof d1 === 'string' && d1.toLowerCase() === 'present') {
    d1 = new Date()
  } else {
    d1 = new Date(d1)
  }
  if (typeof d2 === 'string' && d2.toLowerCase() === 'present') {
    d2 = new Date()
  } else {
    d2 = new Date(d2)
  }
  let months
  months = (d2.getFullYear() - d1.getFullYear()) * 12
  months -= d1.getMonth() + 1
  months += d2.getMonth()
  return months <= 0 ? 0 : months
}

export const monthsCount = (d1, d2) => {
  if (typeof d1 === 'string' && d1.toLowerCase() === 'present') {
    d1 = new Date()
  } else {
    d1 = toUTCDate(d1)
  }
  if (typeof d2 === 'string' && d2.toLowerCase() === 'present') {
    d2 = new Date()
  } else {
    d2 = toUTCDate(d2)
  }

  let months
  months = (d2.getFullYear() - d1.getFullYear()) * 12
  months -= d1.getMonth()
  months += d2.getMonth()

  return months <= 0 ? 0 : months
}

export const dateDiffer = (props) => {
  const { from, to, format = 'YMD' } = props
  let toDate = to
  let startDate = new Date(new Date(from).toISOString().slice(0, 10))
  if (!toDate) {
    toDate = new Date().toISOString().slice(0, 10) // get date in YYYY-MM-DD format
  }
  let endDate = new Date(toDate)
  if (startDate > endDate) {
    const swap = startDate
    startDate = endDate
    endDate = swap
  }

  const startYear = startDate.getUTCFullYear()
  const endYear = endDate.getUTCFullYear()
  const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28

  const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  let yearDiff = endYear - startYear
  let monthDiff = endDate.getUTCMonth() - startDate.getUTCMonth()
  if (monthDiff < 0) {
    yearDiff--
    monthDiff += 12
  }

  let dayDiff = endDate.getUTCDate() - startDate.getUTCDate()
  if (dayDiff < 0) {
    if (monthDiff > 0) {
      monthDiff--
    } else {
      yearDiff--
      monthDiff = 11
    }
    dayDiff += daysInMonth[startDate.getUTCMonth()]
  }

  const ydt = yearDiff > 1 ? yearDiff + ' years ' : yearDiff + ' year '
  const mdt = monthDiff > 1 ? monthDiff + ' months ' : monthDiff + ' month '
  const ddt = dayDiff > 1 ? dayDiff + ' days ' : dayDiff + ' day '

  if (format === 'Y.M') {
    return yearDiff + '.' + monthDiff + ' years '
  } else if (format === 'YM') {
    return ydt + mdt
  } else if (format === 'Y+') {
    return yearDiff + '+ years '
  } else {
    return ydt + mdt + ddt
  }
}

export const fetchMstrMonth = (dateRefStr, type) => {
  if (!dateRefStr) return monthObjects[0]
  let monthNum = new Date(dateRefStr).getMonth() + 1
  if (type === 'next') {
    monthNum = new Date(dateRefStr).getMonth() + 2
  } else if (type === 'previous') {
    monthNum = new Date(dateRefStr).getMonth()
  }
  if (monthNum > 12) {
    monthNum = 1
  } else if (monthNum < 1) {
    monthNum = 12
  }
  const monthObject = monthObjects.find((i) => i.id === monthNum)
  return monthObject
}

export const px2rem = (size) => {
  const remPx = 16
  const remSize = size / remPx
  return remSize + 'rem'
}

export const px2pt = (size) => {
  const ptPx = 72 / 96
  const ptSize = size * ptPx
  return ptSize + 'pt'
}

export const getYearsFromDateList = (datesArray) => {
  if (!datesArray.length) return 'Error!'

  const totalMonths = datesArray
    .map((date) => {
      return monthsCount(date.from, date.to)
    })
    .reduce((acc, months) => {
      acc += months
      return Number(acc)
    }, 0)

  return monthsToYears(totalMonths)
}

export const findWindowSize = () => {
  const mobileMin = 200
  const mobileMax = 600
  const tabletMin = 600
  const tabletMax = 768
  const laptopMin = 768
  const laptopMax = 960
  const desktopMin = 960
  const desktopMax = 1200
  const monitorMin = 1200
  const monitorMax = 1800

  let deviceType = 'mobile'

  const width = document.documentElement.clientWidth || document.body.clientWidth

  if (width > mobileMin && width <= mobileMax) deviceType = 'mobile'

  if (width > tabletMin && width <= tabletMax) deviceType = 'tablet'

  if (width > laptopMin && width <= laptopMax) deviceType = 'laptop'

  if (width > desktopMin && width <= desktopMax) deviceType = 'desktop'

  if (width > monitorMin && width <= monitorMax) deviceType = 'monitor'

  return deviceType
}

Array.prototype.remove = function (key, value) {
  const index = this.findIndex((obj) => obj[key] === value)
  return index >= 0 ? [...this.slice(0, index), ...this.slice(index + 1)] : this
}

Array.prototype.pushUnique = function (key, object) {
  const payload = object
  const fullArray = this
  const index = fullArray.findIndex((obj) => obj[key] === payload[key])
  if (index < 0 || fullArray.length === 0) {
    fullArray.push(payload)
  }
  return fullArray
}

String.prototype.toCapitalized = function () {
  const payload = JSON.parse(JSON.stringify(this))
  return payload.charAt(0).toUpperCase() + payload.slice(1)
}

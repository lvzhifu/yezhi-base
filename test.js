function Http(op = {}) {
  this.init(op)
}
Http.prototype.options = {
  axiosConfig: {kk: 1}
}
Http.prototype.init= function (op) {
  const axiosConfig = {...this.options.axiosConfig, ...op.axiosConfig}
  this.options = {
    axiosConfig
  }
  // this.options.axiosConfig = {...this.options.axiosConfig, ...op.axiosConfig}
}
const testhtp = new Http({
  axiosConfig: {
    kk: 3,
    bb: 4
  }
})
console.log(testhtp)

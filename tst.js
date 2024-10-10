const testdt = [{
  "name": "川/国网四川检修公司/检修公司成都运维分部/（500kV蜀州变～500kV丹景变）光缆01",
  "coords": [
      [
          103.608,
          30.64
      ],
      [
          103.84,
          31.02
      ]
  ],
  "aresobjid": "7640022F-7EE8-488C-A303-39660BBE8D98-00114",
  "zresobjid": "7640022F-7EE8-488C-A303-39660BBE8D98-00103",
  "id": "E21F67A6-6ADF-43C4-8A5C-867706EA74B6-00031",
  "lineStyle": {
      "normal": {
          "color": "#ffffff",
          "width": 2,
          "opacity": 0.4
      }
  }
},
{
  "name": "川/国网四川检修公司/检修公司成都运维分部/（500kV蜀州变～500kV丹景变）光缆02",
  "coords": [
      [
          103.608,
          30.64
      ],
      [
          103.84,
          31.02
      ]
  ],
  "aresobjid": "7640022F-7EE8-488C-A303-39660BBE8D98-00114",
  "zresobjid": "7640022F-7EE8-488C-A303-39660BBE8D98-00103",
  "id": "E21F67A6-6ADF-43C4-8A5C-867706EA74B6-0002",
  "lineStyle": {
      "normal": {
          "color": "#ffffff",
          "width": 2,
          "opacity": 0.4
      }
  }
},
{
  "name": "川/国网四川检修公司/检修公司成都运维分部/（500kV蜀州变～500kV丹景变）光缆02",
  "coords": [
      [
          105.608,
          30.64
      ],
      [
          103.84,
          31.02
      ]
  ],
  "aresobjid": "7640022F-7EE8-488C-A303-39660BBE8D98-00114",
  "zresobjid": "7640022F-7EE8-488C-A303-39660BBE8D98-00103",
  "id": "E21F67A6-6ADF-43C4-8A5C-867706EA74B6-0002",
  "lineStyle": {
      "normal": {
          "color": "#ffffff",
          "width": 2,
          "opacity": 0.4
      }
  }
},
{
  "name": "川/国网四川检修公司/检修公司成都运维分部/（500kV蜀州变～500kV丹景变）光缆02",
  "coords": [
      [
          105.608,
          30.64
      ],
      [
          103.84,
          31.02
      ]
  ],
  "aresobjid": "7640022F-7EE8-488C-A303-39660BBE8D98-00114",
  "zresobjid": "7640022F-7EE8-488C-A303-39660BBE8D98-00103",
  "id": "E21F67A6-6ADF-43C4-8A5C-867706EA74B6-0002",
  "lineStyle": {
      "normal": {
          "color": "#ffffff",
          "width": 2,
          "opacity": 0.4
      }
  }
},
{
  "name": "川/国网四川检修公司/检修公司成都运维分部/（500kV蜀州变～500kV丹景变）光缆02",
  "coords": [
      [
          104.608,
          30.64
      ],
      [
          103.84,
          31.02
      ]
  ],
  "aresobjid": "7640022F-7EE8-488C-A303-39660BBE8D98-00114",
  "zresobjid": "7640022F-7EE8-488C-A303-39660BBE8D98-00103",
  "id": "E21F67A6-6ADF-43C4-8A5C-867706EA74B6-0002",
  "lineStyle": {
      "normal": {
          "color": "#ffffff",
          "width": 2,
          "opacity": 0.4
      }
  }
}]

const finaArry = []

function main(pendArry) {
  pendArry.forEach(itm => {
    const clzdobj = isHas(itm, finaArry);
    if (clzdobj) {
      clzdobj.val.push(itm)
    } else {
      clzdobj.push({
          key: itm.coords,
          val: [itm]
        })
    }
  })
  console.log(finaArry)
}

function isHas(itm, resagg) {
  let zdOj = null
  resagg.some(nitm => {
    if (nitm.key.length === itm.coords.length) {
      let isok = nitm.key.every((nnitm, idx) => {
        if (nitm.key[idx][0] === itm.coords[idx][0] && nitm.key[idx][1] === itm.coords[idx][1]) {
          return true
        }
        return false
      })
      if (isok) {
        zdOj = nitm
        return true
      }
    }
    return false
  })
  return zdOj
}

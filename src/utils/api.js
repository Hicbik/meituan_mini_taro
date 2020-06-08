import Taro from '@tarojs/taro'

// const root = (query) => `http://192.168.137.1:666${query}`
// const root = (query) => `http://129.204.52.195:666${query}`

export const staticReq = 'cloud://w-jtn5n.772d-w-jtn5n-1300780801'

// export class ShopRequest {
//   static api = root('/shop/')
//
//   static get (page,city) {
//     return new Promise((resolve,reject) => {
//       Taro.request({
//         url:this.api + 'get',
//         data:{ page,city }
//       })
//         .then(res => resolve(res))
//         .catch(e => reject(e))
//     })
//   }
//
//   static search ({ page,value }) {
//     return new Promise(resolve => {
//       Taro.request({
//         url:this.api + 'search',
//         data:{
//           page,
//           value
//         }
//       })
//         .then(res => resolve(res))
//     })
//   }
// }

// export class UserRequest {
//   static api = root('/user/')
//
//   static verification_token (token) {
//     return new Promise(resolve => {
//       Taro.request({
//         url:this.api + 'verification_token',
//         method:'POST',
//         header:{
//           'Content-Type':'application/x-www-form-urlencoded',
//           'Authorization':token
//         }
//       })
//         .then(res => resolve(res))
//     })
//   }
//
//   static weChatGet (code,info) {
//     return new Promise(resolve => {
//       Taro.request({
//         url:this.api + 'weChatGet',
//         data:{ code,...info },
//         method:'POST',
//         header:{ 'Content-Type':'application/x-www-form-urlencoded' }
//       })
//         .then(res => {
//           Taro.setStorageSync('token',res.data.token)
//           resolve(res)
//         })
//
//     })
//   }
//
//   static login (user) {
//     return new Promise(resolve => {
//       Taro.request({
//         url:this.api + '/get',
//         method:'POST',
//         header:{ 'Content-Type':'application/x-www-form-urlencoded' },
//         data:user
//       })
//         .then(res => {
//           if (res.data.state !== 'err') Taro.setStorageSync('token',res.data.token)
//           resolve(res)
//         })
//     })
//   }
//
//   static registered (user) {
//     return new Promise(resolve => {
//       Taro.request({
//         url:this.api + 'add',
//         method:'POST',
//         header:{ 'Content-Type':'application/x-www-form-urlencoded' },
//         data:user
//       })
//         .then(res => {
//           if (res.data.state !== 'err') Taro.setStorageSync('token',res.data.token)
//           resolve(res)
//         })
//     })
//   }
//
//   static bind_phone (phone) {
//     return new Promise(resolve => {
//       let token = Taro.getStorageSync('token')
//       Taro.request({
//         url:this.api + 'bind_phone',
//         method:'POST',
//         header:{
//           'Content-Type':'application/x-www-form-urlencoded',
//           'Authorization':token
//         },
//         data:{ phone }
//       })
//         .then(res => {
//           if (res.data.state !== 'err') Taro.setStorageSync('token',res.data.token)
//           resolve(res)
//         })
//     })
//   }
//
// }

// export class GroupBuyRequest {
//   static api = root('/group-buy/')
//
//   static get (id) {
//     return new Promise(resolve => {
//       Taro.request({
//         url:this.api + 'get',
//         data:{ id }
//       })
//         .then(res => resolve(res))
//     })
//   }
// }

// export class OrderRequest {
//   static api = root('/order/')
//
//   static create ({ shop_id,amount,closing_price,type,shop_pic,shop_title,group_buy_id }) {
//     return new Promise(resolve => {
//       let token = Taro.getStorageSync('token')
//       Taro.request({
//         url:this.api + 'create',
//         method:'POST',
//         header:{
//           'Content-Type':'application/x-www-form-urlencoded',
//           'Authorization':token
//         },
//         data:{
//           shop_id,
//           amount,
//           closing_price,
//           type,
//           shop_pic,
//           shop_title,
//           group_buy_id
//         }
//       })
//         .then(res => {
//           resolve(res)
//         })
//     })
//   }
//
//   static all () {
//     return new Promise(resolve => {
//       let token = Taro.getStorageSync('token')
//       Taro.request({
//         url:this.api + 'all',
//         header:{
//           'Content-Type':'application/x-www-form-urlencoded',
//           'Authorization':token
//         }
//       })
//         .then(res => resolve(res))
//     })
//   }
//
//   static singleton (id) {
//     return new Promise(resolve => {
//       let token = Taro.getStorageSync('token')
//       Taro.request({
//         url:this.api + 'singleton',
//         header:{
//           'Content-Type':'application/x-www-form-urlencoded',
//           'Authorization':token
//         },
//         data:{
//           id
//         }
//       })
//         .then(res => resolve(res))
//     })
//   }
//
//   static update (id) {
//     return new Promise(resolve => {
//       let token = Taro.getStorageSync('token')
//       Taro.request({
//         url:this.api + 'update',
//         data:{ id },
//         header:{
//           'Content-Type':'application/x-www-form-urlencoded',
//           'Authorization':token
//         },
//         method:'POST'
//       })
//         .then(res => resolve(res))
//     })
//   }
// }

// export class FilmRequest {
//   static api = root('/film/')
//
//   static get ({ page,type }) {
//     return new Promise((resolve,reject) => {
//       Taro.request({
//         url:this.api + 'get',
//         data:{
//           page,
//           type
//         }
//       })
//         .then(res => resolve(res))
//         .catch(e => reject(e))
//     })
//   }
// }


//云
Taro.cloud.init()

export class ShopRequest {
  static get (page,city) {
    return new Promise((resolve,reject) => {
      Taro.cloud.callFunction({
        name:'shop',
        data:{
          $url:'get',
          page,city
        }
      })
        .then(res => resolve({ data:res.result }))
        .catch(e => reject(e))
    })
  }

  static search ({ page,value }) {
    return new Promise((resolve,reject) => {
      Taro.cloud.callFunction({
        name:'shop',
        data:{
          $url:'search',
          page,
          value
        }
      })
        .then(res => resolve({ data:res.result }))
        .catch(e => reject(e))
    })
  }
}

export class GroupBuyRequest {
  static get (id) {
    return new Promise((resolve,reject) => {
      Taro.cloud.callFunction({
        name:'group_buy_get',
        data:{ id }
      })
        .then(res => resolve({ data:res.result }))
        .catch(e => reject(e))
    })
  }
}

export class FilmRequest {
  static get ({ page,type }) {
    return new Promise((resolve,reject) => {
      Taro.cloud.callFunction({
        name:'film',
        data:{
          $url:'get',
          page,type
        }
      })
        .then(res => resolve({ data:res.result }))
        .catch(e => reject(e))
    })
  }

  static getHot (page) {
    return new Promise(resolve => {
      Taro.cloud.callFunction({
        name:'film',
        data:{
          $url:'gethot',
          page
        }
      })
        .then(res => resolve({ data:res.result }))
    })
  }

  static search ({ page,value }) {
    return new Promise((resolve,reject) => {
      Taro.cloud.callFunction({
        name:'film',
        data:{
          $url:'search',
          page,
          value
        }
      })
        .then(res => resolve({ data:res.result }))
        .catch(() => reject())
    })
  }

}

export class FilmDealRequest {
  static get ({ id }) {
    return new Promise((resolve,reject) => {
      Taro.cloud.callFunction({
        name:'film',
        data:{
          $url:'deal',
          id
        }
      })
        .then(res => resolve({ data:res.result }))
        .catch(e => reject(e))
    })
  }
}

export class UserRequest {

  static verification_token (token) {
    return new Promise(resolve => {
      Taro.cloud.callFunction({
        name:'user',
        data:{
          $url:'decode',
          token
        }
      })
        .then(res => resolve({ data:res.result }))
    })
  }

  static weChatGet (code,info) {
    return new Promise(resolve => {
      Taro.cloud.callFunction({
        name:'user',
        data:{ $url:'weapp',code,userInfo:info.userInfo }
      })
        .then(res => {
          Taro.setStorageSync('token',res.result.token)
          resolve({ data:res.result })
        })
    })
  }

  static registered (user) {
    return new Promise(resolve => {
      Taro.cloud.callFunction({
        name:'user',
        data:{ $url:'create',userInfo:user }
      })
        .then(res => {
          if (res.result.state !== 'err') Taro.setStorageSync('token',res.result.token)
          resolve({ data:res.result })
        })
    })
  }

  static login (user) {
    return new Promise(resolve => {
      Taro.cloud.callFunction({
        name:'user',
        data:{ $url:'login',user }
      })
        .then(res => {
          if (res.result.state !== 'err') Taro.setStorageSync('token',res.result.token)
          resolve({ data:res.result })
        })
    })
  }

  static bind_phone (phone) {
    return new Promise(resolve => {
      let token = Taro.getStorageSync('token')
      Taro.cloud.callFunction({
        name:'user',
        data:{ $url:'bindPhone',token,phone }
      })
        .then(res => {
          if (res.result.state !== 'err') Taro.setStorageSync('token',res.result.token)
          resolve({ data:res.result })
        })
    })
  }

  static change ({ type,value }) {
    return new Promise(resolve => {
      let token = Taro.getStorageSync('token')
      Taro.cloud.callFunction({
        name:'user',
        data:{
          $url:'change',
          value,
          type,
          token
        }
      })
        .then(res => resolve({ data:res.result }))
    })
  }
}

export class OrderRequest {


  static create ({ shop_id,amount,closing_price,type,shop_pic,shop_title,group_buy_id }) {
    return new Promise(resolve => {
      let token = Taro.getStorageSync('token')
      Taro.cloud.callFunction({
        name:'order',
        data:{
          $url:'create',
          shop_id,
          amount,
          closing_price,
          type,
          shop_pic,
          shop_title,
          group_buy_id,
          token
        }
      })
        .then(res => resolve({ data:res.result }))
    })
  }

  static all () {
    return new Promise(resolve => {
      let token = Taro.getStorageSync('token')
      Taro.cloud.callFunction({
        name:'order',
        data:{
          $url:'all',
          token
        }
      })
        .then(res => resolve({ data:res.result }))
    })
  }

  static singleton (id) {
    return new Promise(resolve => {
      let token = Taro.getStorageSync('token')
      Taro.cloud.callFunction({
        name:'order_singleton',
        data:{
          $url:'singleton',
          id,token
        }
      })
        .then(res => resolve({ data:res.result }))
    })
  }

  static update (id) {
    return new Promise(resolve => {
      let token = Taro.getStorageSync('token')
      Taro.cloud.callFunction({
        name:'order',
        data:{ $url:'update',id,token }
      })
        .then(res => resolve({ data:res.result }))
    })
  }

  static del (id) {
    return new Promise(resolve => {
      let token = Taro.getStorageSync('token')
      Taro.cloud.callFunction({
        name:'order',
        data:{
          $url:'del',
          id,
          token
        }
      })
        .then(res => resolve({ data:res.result }))
    })
  }

}



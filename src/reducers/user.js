const INITIAL_STATE = {
  nick_name:'',
  gender:0,
  avatar:'',
  like:[],
  shipping_address:[],
  status:'',
  isLogin:false,
  _id:'',
  city:''
}

export default function counter (state = INITIAL_STATE,action) {
  switch (action.type) {
    case 'user/change':
      return {
        nick_name:action.data.nick_name,
        gender:action.data.gender,
        avatar:action.data.avatar,
        like:action.data.like,
        shipping_address:action.data.shipping_address,
        status:action.data.status,
        isLogin:true,
        phone:action.data.phone,
        _id:action.data._id
      }
    case 'user/change_city':
      return {
        ...state,
        city:action.city
      }
    case 'user/signOut':
      return {
        nick_name:'',
        gender:0,
        avatar:'',
        like:[],
        shipping_address:[],
        status:'',
        isLogin:false
      }
    case 'user/change_one':
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}

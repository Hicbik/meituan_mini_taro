import Taro from '@tarojs/taro'
import { View,Button,Image } from '@tarojs/components'
import { useDispatch } from '@tarojs/redux'
import { UserRequest } from '../../utils/api'
import Protocol from '../../component/protocol'
import './style.less'

function Login () {
  const dispatch = useDispatch()

  const toBegin = async wx => {
    if (!wx.detail.userInfo) {
      await Taro.showModal({
        title:'提示',
        content:'您已拒绝授权,请重新点击并授权!',
        showCancel:false,
        confirmColor:'#09bb07'
      })
      return
    }
    await Taro.showLoading({
      title:'loading'
    })
    let wx_user = await Taro.login()
    if (!wx_user.code) {
      await Taro.showToast({
        title:'微信登录失败，请稍后重试',
        icon:'none',
        mask:true
      })
      return
    }
    let wx_info = await Taro.getUserInfo()
    try {
      let res = await UserRequest.weChatGet(wx_user.code,wx_info)
      dispatch({ type:'user/change',data:res.data.data })
      await Taro.hideLoading()
      await Taro.navigateBack()
      await Taro.showToast({
        title:'登录成功',
        icon:'success',
        duration:2000
      })
    } catch (e) {
      await Taro.showModal({
        title:'提示',
        content:'网络错误,请稍后登录!',
        showCancel:false,
        confirmColor:'#09bb07'
      })
    }
  }


  const gotoAccountLogin = () => {
    Taro.navigateTo({
      url:'/pages/accountLogin/index'
    })
  }


  return (
    <View className='login'>
      <View style={{ textAlign:'center',width:'90%',margin:'1rem auto' }}>
        <Image src='https://772d-w-jtn5n-1300780801.tcb.qcloud.la/images/login.jpg' mode='widthFix' />
      </View>
      <View className='btn'>
        <Button openType='getUserInfo' onGetUserInfo={toBegin}>微信用户一键登录</Button>
        <Button onClick={gotoAccountLogin}>账号登录/注册</Button>
      </View>
      <Protocol />
    </View>
  )
}


Login.config = {
  navigationBarTitleText:'登录',
  navigationBarBackgroundColor:'#fff'
}

export default Login

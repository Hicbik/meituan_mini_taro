import Taro from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import { useDispatch,useSelector } from '@tarojs/redux'
import './style.less'


function Setting () {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleSignOut = async () => {
    dispatch({ type:'user/signOut' })
    await Taro.navigateBack()
    Taro.removeStorageSync('token')
  }

  const handleBindPhone = () => {
    Taro.navigateTo({ url:'/pages/bindPhone/index' })
  }

  return (
    <View className='setting'>
      <View className='btn' onClick={handleBindPhone}>
        <Text style={{ marginRight:'auto' }}>{user.phone ? '换绑手机' : '绑定手机'}</Text>
        <Text style={{ marginLeft:'auto' }}>&gt;</Text>
      </View>
      <View className='btn sign-out' onClick={handleSignOut}>
        <Text>退出登录</Text>
      </View>
    </View>
  )
}


Setting.config = {
  navigationBarTitleText:'',
  navigationBarBackgroundColor:'#fff'
}

export default Setting

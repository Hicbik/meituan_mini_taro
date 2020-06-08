import Taro,{ useState,useEffect } from '@tarojs/taro'
import { View,Input,Button } from '@tarojs/components'
import { useDispatch } from '@tarojs/redux'
import Protocol from '../../component/protocol'
import { UserRequest } from '../../utils/api'
import './style.less'

function AccountLogin () {
  const [showLogin,setShowLogin] = useState(true)
  const [user,setUser] = useState({
    phone:'',
    password:'',
    verifyPassword:''
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if (showLogin) {
      Taro.setNavigationBarTitle({ title:'登录' })
    } else {
      Taro.setNavigationBarTitle({ title:'注册' })
    }
  },[showLogin])

  const handleShowLogin = () => {
    setShowLogin(!showLogin)
  }

  const handleInputValue = (e,type) => {
    let newUser = { ...user }
    newUser[type] = e.target.value
    setUser(newUser)
  }

  const handleButton = async () => {
    if (!(/^1([3456789])\d{9}$/.test(user.phone)) || user.password.length <= 5) {
      await Taro.showModal({
        title:'提示',
        content:'请正确输入您的手机号或者密码!',
        showCancel:false,
        confirmColor:'#09bb07'
      })
      return
    }
    if (showLogin) {
      //登录
      let res = await UserRequest.login(user)
      if (res.data.state !== 'err') {
        dispatch({ type:'user/change',data:res.data.data })
        await Taro.navigateBack({ delta:2 })
        await Taro.showToast({
          title:'登录成功',
          icon:'success',
          duration:2000
        })
        return
      }
      await Taro.showModal({
        title:'提示',
        content:res.data.errMsg,
        showCancel:false,
        confirmColor:'#09bb07'
      })

    } else {
      //注册
      if (user.password !== user.verifyPassword) {
        await Taro.showModal({
          title:'提示',
          content:'两次密码不一致!',
          showCancel:false,
          confirmColor:'#09bb07'
        })
        return
      }
      let res = await UserRequest.registered(user)
      if (res.data.state !== 'err') {
        dispatch({ type:'user/change',data:res.data.data })
        await Taro.navigateBack({ delta:2 })
        await Taro.showToast({
          title:'注册成功!',
          icon:'success',
          duration:2000
        })
        return
      }
      await Taro.showModal({
        title:'提示',
        content:res.data.errMsg,
        showCancel:false,
        confirmColor:'#09bb07'
      })
    }
  }

  return (
    <View className='AccountLogin'>
      <View className='AccountLogin-con'>
        <Input
          placeholder='请输入手机号'
          value={user.account}
          onInput={e => handleInputValue(e,'phone')}
          type='number'
          confirmType='next'
          maxLength={15}
        />
        <Input
          placeholder='请输入密码'
          value={user.password}
          onInput={e => handleInputValue(e,'password')}
          password
          confirmType='next'
          name='password'
          maxLength={15}
        />
        {
          !showLogin && (
            <Input
              placeholder='请确认密码'
              value={user.verifyPassword}
              onInput={e => handleInputValue(e,'verifyPassword')}
              password
              confirmType='next'
              name='verifyPassword'
              maxLength={15}
            />
          )
        }
        <Button onClick={handleButton}>{showLogin ? '登录' : '注册'}</Button>
        <Button onClick={handleShowLogin}>{showLogin ? '没有账号?去注册!' : '已有账号?去登录!'}</Button>
      </View>
      <Protocol />
    </View>
  )
}

AccountLogin.config = {
  navigationBarTitleText:'登录',
  navigationBarBackgroundColor:'#fff'
}

export default AccountLogin

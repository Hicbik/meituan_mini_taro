import Taro,{ useEffect,useState } from '@tarojs/taro'
import { View,Text,Input,Button } from '@tarojs/components'
import { useSelector,useDispatch } from '@tarojs/redux'
import './style.less'
import { UserRequest } from '../../utils/api'

function BindPhone () {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [phone,setPhone] = useState('')

  useEffect(() => {
    Taro.setNavigationBarTitle({ title:user.phone ? '更换手机号' : '绑定手机号' })
  },[])

  const handlePhone = async () => {
    let title = user.phone ? '更换手机号成功!' : '绑定手机号成功!'
    await Taro.showLoading({
      title:'loading'
    })
    let res = await UserRequest.bind_phone(phone)
    await Taro.hideLoading()
    if (res.data.state === 'ok') {
      dispatch({ type:'user/change',data:res.data.data })
      await Taro.navigateBack()
      await Taro.showToast({
        title,
        icon:'success',
        duration:2000
      })
    } else {
      await Taro.showModal({
        title:'提示',
        content:res.data.errMsg,
        showCancel:false,
        confirmColor:'#09bb07'
      })
    }
  }


  return (
    <View className='bindPhone'>
      <View className='title'>
        <Text>{user.phone ? '请输入新的手机号' : '请输入您的手机号'}</Text>
      </View>
      <View className='phone'>
        <Text>+86</Text>
        <Input
          placeholder={user.phone ? '请输入新的手机号' : '请输入您的手机号'}
          type='number'
          value={phone}
          onInput={e => setPhone(e.target.value)}
        />
      </View>
      <Button
        className='btn'
        disabled={!(/^1([3456789])\d{9}$/.test(phone))}
        onClick={handlePhone}
      >绑定手机</Button>
    </View>
  )
}

BindPhone.config = {
  navigationBarTitleText:'',
  navigationBarBackgroundColor:'#fff'
}

export default BindPhone

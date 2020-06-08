import Taro,{ memo } from '@tarojs/taro'
import { View,Image,Text } from '@tarojs/components'
import './style.less'
import { staticReq } from '../../utils/api'


function TabList ({ listData,isBorderTop,onHandleClick }) {

  return (
    <View className={isBorderTop ? 'tablist ling' : 'tablist'}>
      {
        listData.map(value => (
          <View className={!value.color ? 'icon down' : 'icon'} key={value.name}  onClick={() => onHandleClick(value)}>
            <View className='img' style={{ backgroundColor:value.color }}>
              <Image src={staticReq + value.image} />
            </View>
            <Text>{value.name}</Text>
          </View>
        ))
      }
    </View>
  )
}

TabList.defaultProps = {
  isBorderTop:true,
  onHandleClick:() => {
  },
  listData:[
    {
      name:'美食',
      image:'/images/fenzu.png',
      color:'#fd9d21'
    },
    {
      name:'电影',
      image:'/images/mao.png',
      color:'#fe4910'
    },
    {
      name:'酒店',
      image:'/images/hebingxingzhuang.png',
      color:'#8a90fa'
    },
    {
      name:'休闲娱乐',
      image:'/images/tiandianyinpin.png',
      color:'#fed030'
    },
    {
      name:'外卖',
      image:'/images/meituan2.png',
      color:'#fd9d21'
    },
    {
      name:'KTV',
      image:'/images/KTV.png'
    },
    {
      name:'丽人/美发',
      image:'/images/美女.png'
    },
    {
      name:'景点门票',
      image:'/images/景点.png'
    },
    {
      name:'结婚/摄影',
      image:'/images/结婚.png'
    },
    {
      name:'骑单车',
      image:'/images/摩拜单车.png'
    },
    {
      name:'火车票',
      image:'/images/火车.png'
    },
    {
      name:'民宿/公寓',
      image:'/images/民宿.png'
    },
    {
      name:'免费领卷',
      image:'/images/卷票.png'
    },
    {
      name:'亲子乐园',
      image:'/images/亲子.png'
    },
    {
      name:'游泳健身',
      image:'/images/健身.png'
    }
  ]
}

export default memo(TabList)

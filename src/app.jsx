import Taro,{ Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import '@tarojs/async-await'
import Index from './pages/index'
import configStore from './store'
import './app.less'


const store = configStore()

class App extends Component {
  config = {
    pages:[
      'pages/index/index',
      'pages/order/index',
      'pages/my/index',
      'pages/deal/index',
      'pages/login/index',
      'pages/accountLogin/index',
      'pages/setting/index',
      'pages/submitOrder/index',
      'pages/bindPhone/index',
      'pages/orderDeal/index',
      'pages/conductSearch/index',
      'pages/address/index',
      'pages/film/index',
      'pages/filmDeal/index',
      'pages/filmSearch/index',
      'pages/userInfo/index',
      'pages/changeNickName/index'
    ],
    tabBar:{
      list:[
        {
          iconPath:'assets/shouye-.png',
          selectedIconPath:'assets/shouye-s.png',
          pagePath:'pages/index/index',
          text:'首页'
        },
        {
          iconPath:'assets/dingdan-.png',
          selectedIconPath:'assets/dingdan-s.png',
          pagePath:'pages/order/index',
          text:'便签'

        },
        {
          iconPath:'assets/wode.png',
          selectedIconPath:'assets/wode-s.png',
          pagePath:'pages/my/index',
          text:'我的'
        }
      ],
      'color':'#333',
      'selectedColor':'#fe9900',
      'backgroundColor':'#fff',
      'borderStyle':'white'
    },
    window:{
      backgroundTextStyle:'light',
      navigationBarBackgroundColor:'#fff',
      navigationBarTitleText:'今天你喝岩浆了吗?',
      navigationBarTextStyle:'black',
    },
    permission: {
      "scope.userLocation": {
        "desc": "基于 react + taro 构建的小程序 共16个页面。"
      }
    }
  }

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}


Taro.render(<App />,document.getElementById('app'))


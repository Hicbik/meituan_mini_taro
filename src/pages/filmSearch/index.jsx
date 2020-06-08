import Taro,{ useState } from '@tarojs/taro'
import { Image,Input,Text,View } from '@tarojs/components'
import { FilmRequest,staticReq } from '../../utils/api'
import FilmList from '../../component/filmList'
import './style.less'


const useSearch = ({ key }) => {
  const [searchList,setSearchList] = useState([])
  const [searchState,setSearchState] = useState('')
  const [searchValue,setSearchValue] = useState('')
  const [HistorySearch,setHistorySearch] = useState(() => {
    let data = Taro.getStorageSync(key)
    return data ? JSON.parse(data) : []
  })


  const onSearch = async (value) => {
    setSearchState('搜索中...')
    setSearchList([])
    setHistorySearch(prevState => {
      const list = Array.from(new Set([...prevState,value]))
      Taro.setStorageSync(key,JSON.stringify(list))
      return list
    })
    let res = await FilmRequest.search({ value,page:1 })

    if (res.data.data.length === 0) {
      setSearchState('找不到哦...')
    } else {
      setSearchList([...res.data.data.map(value => ({ ...value,img:value.img.replace(/w.h/,'128.180') }))])
      setSearchState('')
    }
  }

  const onTabSearch = (value) => {
    setSearchValue(() => {
      onSearch(value)
      return value
    })
  }

  const onDelHistorySearch = () => {
    Taro.removeStorageSync(key)
    setHistorySearch([])
  }

  return { searchList,searchState,searchValue,HistorySearch,onSearch,onTabSearch,onDelHistorySearch,setSearchValue }

}


function FilmSearch () {

  const {
    searchList,
    searchState,
    searchValue,
    setSearchValue,
    HistorySearch,
    onSearch,
    onTabSearch,
    onDelHistorySearch,
    gotoBack
  } = useSearch({ key:'FilmHistorySearch' })

  return (
    <View className='FilmSearch'>
      <View className='search'>
        <View className='search-input'>
          <Image src='https://p0.meituan.net/travelcube/99c29829cf1b85d5cdbc76a1bd0b7329814.png' />
          <Input
            type='text'
            placeholder='搜电影 搜演员'
            placeholderStyle='color:#999'
            confirmType='search'
            onConfirm={() => onSearch(searchValue)}
            value={searchValue}
            onInput={e => setSearchValue(e.target.value)}
          />
        </View>
        <View className='addr'>
          <Text onClick={gotoBack}>取消</Text>
        </View>
      </View>
      {searchValue && <FilmList listData={searchList} state={searchState} showState />}
      {
        !!!searchValue && !!HistorySearch.length && (
          <View className='FilmSearch-list'>
            <View className='title'>
              <Text>历史搜索</Text>
              <Image mode='scaleToFill' src={staticReq + '/images/垃圾.png'} onClick={onDelHistorySearch} />
            </View>
            <View className='list'>
              {
                HistorySearch.map(value => (
                  <Text key={value} onClick={() => onTabSearch(value)}>{value}</Text>
                ))
              }
            </View>
          </View>
        )
      }
    </View>
  )
}

FilmSearch.config = {
  navigationBarTitleText:'电影',
  navigationBarBackgroundColor:'#f03d37',
  navigationBarTextStyle:'white'
}

export default FilmSearch

import news from 'fixtures/news'

export default (state = news, action) => {
  const { data, type } = action

  /*switch (type) {
    case LOAD + ALL_NEWS:
      break;
  }*/

  return state
}

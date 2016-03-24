import comments from 'fixtures/comments'

export default (state = comments, action) => {
  const { data, type } = action

  /*switch (type) {
    case LOAD + ALL_NEWS:
      break;
  }*/

  return state
}

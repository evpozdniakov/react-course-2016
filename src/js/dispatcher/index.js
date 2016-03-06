import {Dispatcher} from 'flux'

const AppDispatcher = new Dispatcher()

AppDispatcher.register(action => {
  console.log('--- got action: ', action)
})

export default AppDispatcher

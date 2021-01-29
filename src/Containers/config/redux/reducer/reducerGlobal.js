import actiontype from '../dispatch/dispatchAction';

// state
const initState = {
    totalOrder: 'huda man',
    nama: 'Muhammad',
    isLoading: false,
    isLogin: false,
    user: {},
    notes: [],
    notes2: [],
    orderGrab: [],
    status: '',
    menu: '',
    orderan: []
  }
  
  // reducer
  const rootReducer = (state = initState, action) => {
    if(action.type === actiontype.PLUS_ORDER) {
      return {
        ...state,
        totalOrder: state.totalOrder + 1
      }
    }

    if(action.type === actiontype.MINUS_ORDER) {
      // const totalOrder = 0 ;
  
      if(state.totalOrder > 0) {
        return {
          totalOrder: state.totalOrder - 1
        }
      }
    }

    if(action.type === actiontype.VALUE_CHANGE) {
      return {
        ...state,
        nama: action.value
      }
    }

    if(action.type === actiontype.LOADING) {
      return {
        ...state,
        isLoading: action.value
      }
    }

    if(action.type === actiontype.LOGIN) {
      return {
        ...state,
        isLogin: action.value
      }
    }

    if(action.type === actiontype.USER) {
      return {
        ...state,
        user: action.value
      }
    }

    if(action.type === actiontype.NOTES) {
      return {
        ...state,
        notes: action.value
      }
    }

    if(action.type === actiontype.NOTES2) {
      return {
        ...state,
        notes2: action.value
      }
    }

    if(action.type === actiontype.ORDERGRAB) {
      return {
        ...state,
        orderGrab : action.value
      }
    }

    if(action.type === actiontype.STATUSGRABUSER) {
      return {
        ...state,
        status: action.value
      }
    }

    if(action.type === actiontype.MENUWHAT) {
      return {
        ...state, 
        menu: action.value
      }
    }

    if(action.type === actiontype.MIDTRANS) {
      return {
        ...state, 
        orderan: action.value
      }
    }

    return state;
  }

  export default rootReducer;
import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { userReducer } from "../reducers/userReducer";
import { vehicleReducer } from "../reducers/vehicleReducer";
import { productReducer } from "../reducers/productReducer";
import { companyReducer } from "../reducers/companyReducer";
import { driverReducer } from "../reducers/driverReducer";
import { documentReducer } from "../reducers/documentReducer";
import { conversionReducer } from "../reducers/conversionReducer";
import { workdaysReducer } from "../reducers/workdaysReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    users: userReducer,
    vehicles: vehicleReducer,
    products: productReducer,
    companies: companyReducer,
    drivers: driverReducer,
    documents: documentReducer,
    conversions: conversionReducer,
    workdays: workdaysReducer
})

export const store = createStore(
    reducers,
    composeEnhancers( applyMiddleware( thunk ))
)
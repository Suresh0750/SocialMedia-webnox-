"use client";

import { Provider } from "react-redux";
import appStore from '@/redux/store'

export const StoreProvider = ({children}:{children:React.ReactNode})=>{
    return(
        <Provider store={appStore}>
             {children}
        </Provider>
    )

}
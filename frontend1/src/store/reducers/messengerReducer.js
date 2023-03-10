import {FRIEND_GET_SUCCESS,MESSAGE_GET_SUCCESS,MESSAGE_SEND_SUCCESS,SOCKET_MESSAGE,UPDATE_FRIEND_MESSAGE,MESSAGE_SEND_SUCCESS_CLEAR} from "../types/messengerType";

const messengerState = {
     friends : [],
     message : [],
     mesageSendSuccess : false     
}

export const messengerReducer = (state=messengerState,action) => {
     const {type,payload} = action;
     if(type === FRIEND_GET_SUCCESS){
          return {
               ...state,
               friends : payload.friends
          }
     }

     if(type === MESSAGE_GET_SUCCESS){
          return {
               ...state,
               message : payload.message
          }
     }

     if(type === MESSAGE_SEND_SUCCESS){
          return {
               ...state,
               mesageSendSuccess : true,
               message : [...state.message,payload.message]
          }
     }

     if(type === SOCKET_MESSAGE){
          return {
               ...state,
               message : [...state.message,payload.message]
          }
     }

     if(type === UPDATE_FRIEND_MESSAGE){
          const index = state.friends.findIndex(f=>f.fndInfo._id === payload.msgInfo.reseverId || f.fndInfo._id === payload.msgInfo.senderId);
          state.friends[index].msgInfo = payload.msgInfo;
          return state;
     }

     if(type === MESSAGE_SEND_SUCCESS_CLEAR){
          return {
               ...state,
               mesageSendSuccess : false               
          }
     }

     return state;
}
import { AsyncStorage } from "react-native";
import axios from "../modules/axiosConfig";
import { AUTH_KEY } from "../constants";

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(AUTH_KEY)
      .then(token => {
        if(token){
            axios()
            .get("/auth", {
              headers: {
                "x-auth": token
              }
            })
            .then(res => {
                if (res.status === 200) {
                    resolve({
                        token,
                        user: res.data
                    });
                } 
                else if(res.status === 401) {
                    AsyncStorage.removeItem(AUTH_KEY);
                    resolve(false);
                }
                else {
                    resolve(false);
                }
            })
            .catch(err => {
                AsyncStorage.removeItem(AUTH_KEY);
                resolve(false);
            });
        } else {
            resolve(false);
        }
      }) 
  });
};
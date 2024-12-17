import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {

    isLoggedIn = signal<boolean>(false)
    __tokenKey = '_app_token'
    __decodedToken = signal<any>(null)
    constructor() {
        this.onParseToken(localStorage.getItem(this.__tokenKey) as string)
    }

    onAfterLogin(token: string) {
        const getToken = localStorage.getItem(this.__tokenKey)
        if (getToken === null || getToken === undefined) {
            localStorage.setItem(this.__tokenKey, token)
        } else {
            localStorage.removeItem(this.__tokenKey)
            localStorage.setItem(this.__tokenKey, token)
        }
        this.onParseToken(token)
    }
    
    isToekenExpiredOrRemoved() {
        const token = localStorage.getItem(this.__tokenKey)
        if (token === null || token === undefined) {
            return true
        }
        const decodedToken = JSON.parse(atob(token.split('.')[1]))
        const exp = decodedToken.exp
        return Date.now() > exp * 1000 || localStorage.getItem(this.__tokenKey) === null
    }

    onParseToken(token: string) {
        if (token === null || token === undefined) {
            this.isLoggedIn.set(false)
            return
        }
        const decodedToken = JSON.parse(atob(token.split('.')[1]))
        this.__decodedToken.set(decodedToken)
        console.log(decodedToken)
        this.isLoggedIn.set(true)
    }


}
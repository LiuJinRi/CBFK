import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {HttpProvider} from '../http/http';
import {URLSearchParams} from '@angular/http';
import {App, Events, ModalController, Platform} from "ionic-angular";
import {ToastProvider} from "../../providers/toast/toast";

@Injectable()
export class UserProvider {

    constructor(public httpProvider: HttpProvider,
                private storage: Storage,
                private app: App,
                private events: Events,
                private modalCtrl: ModalController,
                private toastProvider: ToastProvider,
                private platform: Platform) {

    }

    login(loginName, password){
        /*
        let param = {
            loginName: loginName,
            password: password
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostWithAuth("/sys/login/login", body);
        */
        let params: URLSearchParams = new URLSearchParams();
        params.set('loginName', loginName);
        params.set('password', password);
        return this.httpProvider.httpGetNoAuth("/sys/login/login", params);
    }

    changePassword(loginName, newPassword, phonenumber, verificationCode) {
        /*
        let param = {
            loginName: loginName,
            newPassword: newPassword,
            verificationCode: verificationCode,
            phonenumber: phonenumber
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostWithAuth("/sys/login/findPassword", body);
        */
        let params: URLSearchParams = new URLSearchParams();
        params.set('loginName', loginName);
        params.set('newPassword', newPassword);
        params.set('phonenumber', phonenumber);
        params.set('verificationCode', verificationCode);
        return this.httpProvider.httpPostNoAuth("/sys/login/findPassword", params);
    }

   
    register(loginName,password,verificationCode,userName,phonenumber,email) {
        /*
        let param = {
            loginName: loginName,
            password: password,
            userName: userName,
            phonenumber: phonenumber,
            verificationCode: verificationCode,
            email: email
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/sys/login/sysRegister", body);
        */

        let params: URLSearchParams = new URLSearchParams();
        params.set('loginName', loginName);
        params.set('password', password);
        params.set('verificationCode', verificationCode);
        params.set('userName', userName);
        params.set('phonenumber', phonenumber);
        params.set('email', email);
        return this.httpProvider.httpGetNoAuth("/sys/login/sysRegister", params);
    }

    getCode(phonenumber) {
        /*
        let param = {
            phonenumber: phonenumber
        };

        let body = JSON.stringify(param);

        return this.httpProvider.httpPostWithAuth("/sys/login/getCode", body);
        */
        
        let params: URLSearchParams = new URLSearchParams();
        params.set('phonenumber', phonenumber);
        return this.httpProvider.httpGetNoAuth("/sys/login/getCode", params);
        
    }

    changePhone(telephoneNumber, verificationCode) {
        let param = {
            telephoneNumber: telephoneNumber,
            verificationCode: verificationCode
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostWithAuth("/setting/my/changePhoneNumber", body);
    }

    changePhoneNext(sysUserId, newTelephonenumber, verificationCode) {
        let param = {
            sysUserId : sysUserId,
            newTelephonenumber: newTelephonenumber,
            verificationCode: verificationCode
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostWithAuth("/setting/my/nextStep", body);
    }

    changeSettingPassword (sysUserId, password, newPassword) {
        let param = {
            sysUserId : sysUserId,
            password: password,
            newPassword: newPassword
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/setting/my/changePhoneNumber", body);
    }

    findOrganization(organizationCode) {
        /*
        let param = {
            organizationCode : organizationCode
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostWithAuth("/setting/organization/find", body);
        */
        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationCode', organizationCode);
        return this.httpProvider.httpGetNoAuth("/setting/organization/find", params);
    }

    applyOrganization(organizationName, sysUserId) {       
        /*
        let param = {
            organizationName : organizationName,
            sysUserId : sysUserId
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/setting/organization/applyfor", body);
        */
        
        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationName', organizationName);
        params.set('sysUserId', sysUserId);
        return this.httpProvider.httpGetNoAuth("/setting/organization/applyfor", params);
        
    }

    exitOrganization(organizationName, sysUserId) {
        console.log(organizationName);
        console.log(sysUserId);
        
        let param = {
            organizationName : organizationName,
            sysUserId : sysUserId
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/setting/organization/exit", body);
        /*
        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationName', organizationName);
        params.set('sysUserId', sysUserId);
        return this.httpProvider.httpGetNoAuth("/setting/organization/exit", params);
        */
    }
}

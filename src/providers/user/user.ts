import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpProvider} from '../http/http';
import {URLSearchParams} from '@angular/http';

@Injectable()
export class UserProvider {

    constructor(public httpProvider: HttpProvider) {

    }

    //登录
    login(loginName, password){

        let params: URLSearchParams = new URLSearchParams();
        params.set('loginName', loginName);
        params.set('password', password);
        return this.httpProvider.httpGetNoAuth("/sys/login/login", params);
    }

    // 变更密码
    changePassword(loginName, newPassword, phonenumber, verificationCode) {

        let params: URLSearchParams = new URLSearchParams();
        params.set('loginName', loginName);
        params.set('newPassword', newPassword);
        params.set('phoneNumber', phonenumber);
        params.set('verificationCode', verificationCode);
        return this.httpProvider.httpPostNoAuth("/sys/login/findPassword", params);
    }

   //注册
    register(loginName,password,verificationCode,userName,phonenumber,email) {

        let params: URLSearchParams = new URLSearchParams();
        params.set('loginName', loginName);
        params.set('password', password);
        params.set('verificationCode', verificationCode);
        params.set('userName', userName);
        params.set('phonenumber', phonenumber);
        params.set('email', email);
        return this.httpProvider.httpGetNoAuth("/sys/login/sysRegister", params);
    }

    //获取验证码
    getCode(phonenumber) {
        
        let params: URLSearchParams = new URLSearchParams();
        params.set('phoneNumber', phonenumber);
        return this.httpProvider.httpGetNoAuth("/sys/login/getCode", params);
        
    }

    //变更手机号
    changePhone(telephoneNumber, verificationCode) {
        let param = {
            telephoneNumber: telephoneNumber,
            verificationCode: verificationCode
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/setting/my/changePhoneNumber", body);
    }

    //变更手机号下一步
    changePhoneNext(sysUserId, newTelephonenumber, verificationCode) {
        let param = {
            sysUserId : sysUserId,
            newTelephoneNumber: newTelephonenumber,
            verificationCode: verificationCode
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/setting/my/nextStep", body);
    }

    //变更密码
    changeSettingPassword (sysUserId, password, newPassword) {
        let param = {
            sysUserId : sysUserId,
            password: password,
            newPassword: newPassword
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/setting/my/changePassword", body);
    }

    //查询组织代码
    findOrganization(organizationCode) {

        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationCode', organizationCode);
        return this.httpProvider.httpGetNoAuth("/setting/organization/find", params);
    }

    //添加组织
    applyOrganization(organizationName, sysUserId) {       

        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationName', organizationName);
        params.set('sysUserId', sysUserId);
        return this.httpProvider.httpGetNoAuth("/setting/organization/applyfor", params);
        
    }


    //退出组织
    exitOrganization(organizationName, sysUserId) {
        console.log(organizationName);
        console.log(sysUserId);
        
        let param = {
            organizationName : organizationName,
            sysUserId : sysUserId
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/setting/organization/exit", body);

    }
}

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {HttpProvider} from '../http/http';
import {URLSearchParams} from '@angular/http';
import {App, Events, ModalController, Platform} from "ionic-angular";
import {ToastProvider} from "../../providers/toast/toast";
import { count } from '../../../node_modules/rxjs/operator/count';

@Injectable()
export class CarProvider {

    constructor(public httpProvider: HttpProvider,
                private storage: Storage,
                private app: App,
                private events: Events,
                private modalCtrl: ModalController,
                private toastProvider: ToastProvider,
                private platform: Platform) {

    }

    findCarMsg(vincode, type, sysUserId) {

        let param = {
            vincode: vincode,
            type: type,
            sysUserId : sysUserId
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/common/car/findCarMsg", body);
        /*
        let params: URLSearchParams = new URLSearchParams();
        params.set('vincode', vincode);
        params.set('type', type);
        return this.httpProvider.httpGetWithAuth("/common/car/findCarMsg", params);
        */
    }

    detailCarMsg(carId, carType) {
        let param = {
            carId: carId,
            carType: carType
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/common/car/carMsg", body);
    }

    carBindList(page, per_page) {
        /*
        let param = {
            total: page,
            count: per_page
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostWithAuth("/binding/binding/carMsgList", body);
        */
        
        let params: URLSearchParams = new URLSearchParams();
        params.set('total', page);
        params.set('count', per_page);
        return this.httpProvider.httpGetWithAuth("/binding/binding/carMsgList", params);
        
    }

    carUnBind(vincode, deviceBoxId, sysUserId) {
        console.log(vincode);
        console.log(deviceBoxId);
        console.log(sysUserId);
        let param = {
            vincode: vincode,
            deviceBoxId: deviceBoxId,
            sysUserId : sysUserId
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/binding/binding/untie", body);
    }

    carBindScan(boxCode, vincode, sysUserId) {
        let param = {
            boxCode: boxCode,
            vincode: vincode,
            sysUserId : sysUserId
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/binding/binding/scan", body);
    }

    carLevelList(page, per_page) {
        /*
        let param = {
            total: page,
            count: per_page
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostWithAuth("/cargrade/cargrade/carMsgList", body);
        */
       let params: URLSearchParams = new URLSearchParams();
        params.set('total', page);
        params.set('count', per_page);
        return this.httpProvider.httpGetWithAuth("/cargrade/cargrade/carMsgList", params);
    }

    carReactivate(deviceBoxId) {
        let param = {
            deviceBoxId: deviceBoxId
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/cargrade/cargrade/secondActivation", body);
    }

    carLeveChange(carId, dangerLevel) {
        console.log(carId);
        console.log(dangerLevel);
        let param = {
            carId: carId,
            dangerLevel: dangerLevel
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/cargrade/cargrade/setLevel", body);
    }

    carLocate(deviceBoxId) {
        let param = {
            deviceBoxId: deviceBoxId
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/cargrade/cargrade/lookLocation", body);
    }

    carInformation(deviceBoxId) {
        let param = {
            deviceBoxId: deviceBoxId
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/cargrade/cargrade/historicalTrack", body);
    }

    carParkList(page, per_page) {
        
        let param = {
            total: page,
            count: per_page
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostWithAuth("/doormonitor/doormonitor/carMsgList", body);
        
       /*
        let params: URLSearchParams = new URLSearchParams();
        params.set('total', page);
        params.set('count', per_page);
        return this.httpProvider.httpGetWithAuth("/doormonitor/doormonitor/carMsgList", params);
        */
    }

    carParkSimilarList(page, per_page, carId) {
        /*
        let param = {
            total: page,
            count: per_page,
            carId : carId
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostWithAuth("/common/car/doorMonitorMsg", body);
        */
        let params: URLSearchParams = new URLSearchParams();
        params.set('total', page);
        params.set('count', per_page);
        params.set('carId', carId);
        return this.httpProvider.httpGetNoAuth("/doormonitor/doormonitor/carMsgList", params);

    }

    carParkPass(handleResult, marketDoubtId, sysUserId) {
        
        let param = {
            handleResult: handleResult,
            marketDoubtId: marketDoubtId,
            sysUserId: sysUserId,
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostWithAuth("/doormonitor/doormonitor/ifLetGo", body);
        /*
        let params: URLSearchParams = new URLSearchParams();
        params.set('handleResult', handleResult);
        params.set('marketDoubtId', marketDoubtId);
        params.set('sysUserId', sysUserId);
        return this.httpProvider.httpGetNoAuth("/doormonitor/doormonitor/ifLetGo", params);
        */
    }


}

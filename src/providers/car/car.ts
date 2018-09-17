import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpProvider} from '../http/http';
import {URLSearchParams} from '@angular/http';

@Injectable()
export class CarProvider {

    constructor(public httpProvider: HttpProvider) {

    }


    // 查询车辆
    findCarMsg(vincode, type, sysUserId, organizationId) {

        let param = {
            vincode: vincode,
            type: type,
            sysUserId : sysUserId,
            organizationId : organizationId
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/common/car/findCarMsg", body);

    }

    //车辆详情
    detailCarMsg(carId, carType, organizationId) {
        let param = {
            carId: carId,
            carType: carType,
            organizationId : organizationId
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/common/car/carMsg", body);
    }

    // 绑定车辆
    carBindList(page, per_page, organizationId) {

        let params: URLSearchParams = new URLSearchParams();
        console.log(page);
        console.log(organizationId);
        params.set('total', page);
        params.set('count', per_page);
        params.set('organizationId', organizationId);
        return this.httpProvider.httpGetNoAuth("/binding/binding/carMsgList", params);
        
    }

    //解绑定
    carUnBind(vincode, deviceBoxId, sysUserId, organizationId) {
        console.log(vincode);
        console.log(deviceBoxId);
        console.log(sysUserId);
        let param = {
            vincode: vincode,
            deviceBoxId: deviceBoxId,
            sysUserId : sysUserId,
            organizationId : organizationId
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/binding/binding/untie", body);
    }

    //扫一扫
    carBindScan(boxCode, vincode, sysUserId, organizationId) {
        let param = {
            boxCode: boxCode,
            vincode: vincode,
            sysUserId : sysUserId,
            organizationId : organizationId
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/binding/binding/scan", body);
    }

    // 等级列表
    carLevelList(page, per_page, organizationId) {

        let params: URLSearchParams = new URLSearchParams();
        params.set('total', page);
        params.set('count', per_page);
        params.set('organizationId', organizationId);
        return this.httpProvider.httpGetNoAuth("/cargrade/cargrade/carMsgList", params);
    }

    //再激活
    carReactivate(deviceBoxId) {
        let param = {
            deviceBoxId: deviceBoxId
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/cargrade/cargrade/secondActivation", body);
    }

    //等级变更
    carLevelChange(carId, dangerLevel) {
        console.log(carId);
        console.log(dangerLevel);
        let param = {
            carId: carId,
            dangerLevel: dangerLevel
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/cargrade/cargrade/setLevel", body);
    }

    //车辆位置
    carLocate(deviceBoxId) {
        console.log(deviceBoxId);
        let param = {
            deviceBoxId: deviceBoxId
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/cargrade/cargrade/lookLocation", body);
    }

    //最新信息
    carInformation(deviceBoxId) {
        let param = {
            deviceBoxId: deviceBoxId
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/cargrade/cargrade/historicalTrack", body);
    }

    //门禁列表
    carParkList(page, per_page, organizationId) {

        let params: URLSearchParams = new URLSearchParams();
        params.set('total', page);
        params.set('count', per_page);
        params.set('organizationId', organizationId);
        return this.httpProvider.httpGetNoAuth("/doormonitor/doormonitor/carMsgList", params);

    }

    //类似车辆
    carParkSimilarList(page, per_page, carId, organizationId, vincode) {

        let params: URLSearchParams = new URLSearchParams();
        params.set('total', page);
        params.set('count', per_page);
        params.set('carId', carId);
        params.set('organizationId', organizationId);
        params.set('vincode', vincode);
        return this.httpProvider.httpGetNoAuth("/common/car/doorMonitorMsg", params);

    }

    //车辆通过
    carParkPass(handleResult, marketDoubtId, sysUserId, organizationId) {
        
        let param = {
            handleResult: handleResult,
            marketDoubtId: marketDoubtId,
            sysUserId: sysUserId,
            organizationId : organizationId
        };
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostNoAuth("/doormonitor/doormonitor/ifLetGo", body);

    }


}

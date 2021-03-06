import {Injectable, Injector} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {App, NavController, Platform, ToastController} from 'ionic-angular';

import 'rxjs/add/operator/toPromise';

import {Storage} from '@ionic/storage';

@Injectable()
export class HttpProvider {
    host: string;
    public API_URL = 'http://114.116.82.170:8200';
    public PIC_URL = "http://114.116.82.170/"

    constructor(private http: Http,
                private platform:Platform,
                private toastCtrl: ToastController,
                protected injector: Injector,
                protected app: App,
                private storage: Storage) {

    }

    public httpGetWithAuth(url: string, params: URLSearchParams) {
        return this.storage.get("token").then(data => {
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8' );
            headers.append('Authorization', 'Bearer ' + data);
            let options = new RequestOptions({headers: headers, search: params});
            return this.http.get(this.API_URL + url, options).toPromise()
                .then(this.extractData)
                .catch(err => this.handleError(err));
        });
    }

    public httpGetNoAuth(url: string, params: URLSearchParams) {
        return this.storage.get("token").then(data => {
            var headers = new Headers();
            headers.append("token",data);
            let options = new RequestOptions({ headers: headers, search: params });
            return this.http.get(this.API_URL + url, options).toPromise()
                .then(this.extractData)
                .catch(err => this.handleError(err));

        });
    }

    public httpGetNoAuth2(url: string) {
        return this.http.get(url, {}).toPromise()
            .then(this.extractData)
            .catch(err => this.handleError(err));
    }

    public httpPostNoAuth(url: string, body: any) {
        return this.storage.get("token").then(data => {
            var headers = new Headers();
            headers.append("token",data);
            let options = new RequestOptions({headers: headers});
            return this.http.post(this.API_URL + url, body, options).toPromise()
                .then(this.extractData)
                .catch(err => this.handleError(err));
        });
    }

    public httpPostWithAuth(url: string, body: any) {
        return this.storage.get("token").then(data => {
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8' );
            let options = new RequestOptions({headers: headers});
            return this.http.post(this.API_URL + url, body, options).toPromise()
                .then(this.extractData)
                .catch(err => this.handleError(err));
        });
    }

    public httpPutWithAuth(url: string, body: any) {

        return this.storage.get("token").then(data => {
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8' );
            headers.append('Authorization', 'Bearer ' + data);
            let options = new RequestOptions({headers: headers});
            return this.http.put(this.API_URL + url, body, options).toPromise()
                .then(this.extractData)
                .catch(err => this.handleError(err));
        });
    }

    public httpDeleteWithAuth(url: string) {

        return this.storage.get("token").then(data => {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/x.drip.v3+json');
            headers.append('Authorization', 'Bearer ' + data);
            let options = new RequestOptions({headers: headers});
            return this.http.delete(this.API_URL + url, options).toPromise()
                .then(this.extractData)
                .catch(err => this.handleError(err));
        });
    }

    public httpPatchWithAuth(url: string, body: any) {

        return this.storage.get("token").then(data => {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/x.drip.v3+json');
            headers.append('Authorization', 'Bearer ' + data);
            let options = new RequestOptions({headers: headers});
            return this.http.patch(this.API_URL + url, body, options).toPromise()
                .then(this.extractData)
                .catch(err => this.handleError(err));
        });
    }

    private extractData(res: Response) {
        return res.text() ? res.json() : {};
    }

    private handleError(error: Response | any): Promise<any> {
        console.log(error);

        if (error.status == 200) {
            return Promise.resolve("success");
        }

        let msg = error.text ? error.json().message : '请求地址错误';

        if (error.status == 400) {
            this.app.getRootNav().push('login-default');
        }

        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top',
            cssClass: 'my-toast my-toast-error'
        });

        toast.present();

        return Promise.reject(msg);
    }
}

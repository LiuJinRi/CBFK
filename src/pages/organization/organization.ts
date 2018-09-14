import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {Storage} from '@ionic/storage';
import {ToastProvider} from "../../providers/toast/toast";
import { MinePage } from '../mine/mine';
import { ApplyOrganizationPage } from '../apply-organization/apply-organization';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the OrganizationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-organization',
  templateUrl: 'organization.html',
})
export class OrganizationPage {
  organizationName : string = null;
  sysUserId : string = null;
  status : any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private toastProvider: ToastProvider,
    private storage: Storage,
    private alertCtrl : AlertController,
    private nativePageTransitions : NativePageTransitions) {
      storage.get('sysUserId').then((data) => { 
        if (data) {
          this.sysUserId = data;
        }
      });
  
      storage.get('organizationName').then((data) => { 
        if (data) {
          this.organizationName = data;
        }
      });

      storage.get('status').then((data) => { 
        console.log(data);
        if (data) {
          this.status = data;
        }
      });

  }

  ionViewDidLoad() {
    
  }

  applyOrganization() {
    if( this.status != 3 ) {
      let options: NativeTransitionOptions = {
        direction: 'right',
        duration: 400,
        slowdownfactor: -1,
        iosdelay: 50
       };
   
      this.nativePageTransitions.slide(options);
      this.navCtrl.push(ApplyOrganizationPage);
    }
  }

  exitOrganization() {
    console.log(this.organizationName);
    console.log(this.sysUserId);
    if( this.status == 3 ) {
      let confirm = this.alertCtrl.create({
        title: '提示',
        message: '确定要退出组织吗？',
        buttons: [
            {
                text: '否',
                handler: () => {
                }
            },
            {
                text: '是',
                cssClass: 'my-alert-danger',
                handler: () => {
                  this.userProvider.exitOrganization(this.organizationName, this.sysUserId).then((data) => {
                    console.log(data);
                    if (data['msg'] == "成功") {
                      this.toastProvider.show("组织退出成功",'success');
                      this.storage.set('organizationName', "");
                      
                      let options: NativeTransitionOptions = {
                        direction: 'left',
                        duration: 400,
                        slowdownfactor: -1,
                        iosdelay: 50
                       };
                   
                      this.nativePageTransitions.slide(options);

                      this.navCtrl.push(MinePage);
                    } else {
                      this.toastProvider.show(data['msg'],'errors');
                    }
                  });
                }
            }
        ]
      });
      confirm.present();
    }
    
  }

}

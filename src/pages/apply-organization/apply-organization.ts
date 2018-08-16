import { MinePage } from './../mine/mine';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '../../../node_modules/@ionic/storage';
import { ToastProvider } from '../../providers/toast/toast';
import {UserProvider} from "./../../providers/user/user";

/**
 * Generated class for the ApplyOrganizationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apply-organization',
  templateUrl: 'apply-organization.html',
})
export class ApplyOrganizationPage {
  searchText:string;
  public organizationName : string;
  public sysUserId : string = null;
  tmp : string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public userProvider : UserProvider,
    public storage : Storage,   
    public toastProvider : ToastProvider) {
      storage.get('sysUserId').then((data) => { 
        //console.log(data);
        if (data) {
          this.sysUserId = data;    
        }
      });
  }

  ionViewDidLoad() {
  }

  doApply() {
    if (this.organizationName == null) {
      this.toastProvider.show('请输入组织代码', 'error')
      return;
    } 

    this.storage.get('oragnizationTmp').then((data) => { 
      //console.log(data);
      if (data) {
        this.organizationName = data;
      }
    });

    this.userProvider.applyOrganization(this.organizationName, this.sysUserId).then((data) => {
      console.log(data);
      if (data['msg'] == "成功") {
        //this.storage.set('organizationName', this.organizationName);
        this.storage.set('status', 1);
        this.toastProvider.show("已申请加入" + this.organizationName + "组织。请等待申请结果！",'success');
        this.navCtrl.push(MinePage);
      } else {
        this.toastProvider.show(data['msg'], 'errors');
      }
    });

  }

  filterItems(ev: any) {
    let val = ev.target.value;
    
    if (val && val.trim() != '') { 
      this.userProvider.findOrganization(val).then((data)=>{
        var tmp = data['msg'];
        this.organizationName = tmp;
        //console.log(this.organizationName);
        this.storage.set('oragnizationTmp', tmp);
      }).catch((err)=>{
        return;
      });
    }
  }

}
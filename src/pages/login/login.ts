import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { ResetPasswordPage } from '../reset-password/reset-password';
import {UserProvider} from "./../../providers/user/user";
import {ToastProvider} from "./../../providers/toast/toast";
import {Storage} from '@ionic/storage';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public isShowPassword: boolean = false;
  public isRemember: boolean = false;
  ischecked : boolean;
  loginName : string = null;
  password : string = null;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastProvider: ToastProvider,
    private userProvider: UserProvider,
    private storage: Storage) {
      
      storage.get('isRemember').then((data) => { 
        
        if (data) {
          this.isRemember = data>0 ? true:false; 

          if (this.isRemember) {
            storage.get('loginName').then((data) => { 
              if (data) {
                this.loginName = data;    
              }
            });
      
            storage.get('password').then((data) => { 
              if (data) {
                this.password = data;    
              }
            });
          }
        }
      });
  }

  ionViewDidLoad() {
  }

  doLogin() { 
    if (this.loginName.length == 0) {
      this.toastProvider.show("请输入账号", 'success');
    } else if (this.password.length == 0) {
      this.toastProvider.show("请输入密码", 'success');
    } else {
      this.userProvider.login(this.loginName, this.password).then((response) => {
        //console.log(response.rows[0]);
        if ( response['msg'] != "成功") {
          this.toastProvider.show(response['msg'], 'error');
        }

        if ( response.rows.length != 0 ) {
          var sysUserId = response.rows[0]['sysUserId'];
          var headPortrait = response.rows[0]['headPortrait'];
          var userName = response.rows[0]['userName'];
          var phonenumber = response.rows[0]['phonenumber'];
          var email = response.rows[0]['email'];
          var organizationName = response.rows[0]['organizationName'] ;
          var status = response.rows[0]['status'];
          var user_password = this.password;

          this.storage.set('sysUserId', sysUserId);
          this.storage.set('headPortrait', headPortrait);
          this.storage.set('userName', userName);
          this.storage.set('phonenumber', phonenumber);
          this.storage.set('email', email);
          this.storage.set('organizationName', organizationName);
          this.storage.set('status', status);


          //this.storage.set('isRemember', this.isRemember);
          
          if (this.isRemember) {
            this.storage.set('loginName', this.loginName);
            this.storage.set('password', this.password);
            
          } 
       
          console.log(this.isRemember);
          this.storage.set('isRemember', this.isRemember ? 1 : 0)

          //console.log(organizationName);
          //console.log(this.isRemember);

          if ( organizationName == null) {
            //console.log('organization!!');
            this.toastProvider.show("请您先登录组织名",'success');
          }
          this.navCtrl.push(TabsPage);
        }      

        }).catch((err) => {
        });
      }
  }

  showPassword($event) {
    $event.preventDefault();
    this.isShowPassword = !this.isShowPassword;
  }

  register() {
    this.navCtrl.push(RegisterPage);
    }
  
  resetpassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

}

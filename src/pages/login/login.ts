import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { ResetPasswordPage } from '../reset-password/reset-password';
import {UserProvider} from "./../../providers/user/user";
import {ToastProvider} from "./../../providers/toast/toast";
import {Storage} from '@ionic/storage';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

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
    private storage: Storage,
    private nativePageTransitions : NativePageTransitions) {
      
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

  fadeInit() {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
     };
 
    this.nativePageTransitions.slide(options);
  }

  ionViewDidLoad() {
  }

  //登录
  doLogin() { 
    if (this.loginName.length == 0) {
      this.toastProvider.show("请输入账号", 'success');
    } else if (this.password.length == 0) {
      this.toastProvider.show("请输入密码", 'success');
    } else {
      this.userProvider.login(this.loginName, this.password).then((response) => {
        if ( response['msg'] != "成功") {
          console.log(response);
          this.toastProvider.show(response['msg'], 'error');
        } 

        if ( response.rows.length != 0 ) {
          var sysUserId = response.rows[0]['sysUserId'];
          var headPortrait = response.rows[0]['headPortrait'];
          var userName = response.rows[0]['userName'];
          var phonenumber = response.rows[0]['phoneNumber'];
          var email = response.rows[0]['email'];
          var organizationName = response.rows[0]['organizationName'] ;
          var status = response.rows[0]['status'];
          var organizationId = response.rows[0]['organizationId'];
          var user_password = this.password;
          var token = response.rows[0]['token'];   //后加的

          this.storage.set('sysUserId', sysUserId);
          this.storage.set('headPortrait', headPortrait);
          this.storage.set('userName', userName);
          this.storage.set('phonenumber', phonenumber);
          this.storage.set('email', email);
          this.storage.set('organizationName', organizationName);
          this.storage.set('organizationId', organizationId);
          this.storage.set('status', status);
          this.storage.set('token', token);//后加的

          console.log(status);
          
          if (this.isRemember) {
            this.storage.set('loginName', this.loginName);
            this.storage.set('password', this.password);
            
          } 
       
          console.log(this.isRemember);
          this.storage.set('isRemember', this.isRemember ? 1 : 0)

          if ( organizationName == null) {
            this.toastProvider.show("请您先登录组织名",'success');
          }

          let options: NativeTransitionOptions = {
            direction: 'right',
            duration: 400,
            slowdownfactor: -1,
            iosdelay: 50
           };
       
          this.nativePageTransitions.slide(options);


          if ( status == 3 ) {
            this.navCtrl.push(TabsPage, {tabindex : "0"});
          } else {          
            this.navCtrl.push(TabsPage, {tabindex : "3"});
          }
        }      

        }).catch((err) => {
        });
      }
  }

  //显示密码
  showPassword($event) {
    $event.preventDefault();
    this.isShowPassword = !this.isShowPassword;
  }

  //注册
  register() {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
     };
 
    this.nativePageTransitions.slide(options);
    this.navCtrl.push(RegisterPage);
  }
  
  //忘记密码
  resetpassword() {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
     };
 
    this.nativePageTransitions.slide(options);
    this.navCtrl.push(ResetPasswordPage);
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {UserProvider} from "../../providers/user/user";
import {Storage} from '@ionic/storage';
import {ToastProvider} from "../../providers/toast/toast";
import { SettingPage } from '../setting/setting';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  cahngePasswordForm: FormGroup;
  sysUserId : string = null;
  password : string = null;
  oldpassword : string = null;
  newpassword : string = null;
  newpassword1 : string = null;
  public isShowPassword: boolean = false;
  public isShowPassword1: boolean = false;
  public isShowPassword2: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private toastProvider: ToastProvider,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private nativePageTransitions : NativePageTransitions) {
      this.cahngePasswordForm = this.formBuilder.group({
        'password': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]],
        'newpassword': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]],
        'newpassword1': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]]
      });

      storage.get('sysUserId').then((data) => { 
        console.log(data);
        if (data) {
          this.sysUserId = data;
        }
      });
      
      
      
    }

  ionViewDidLoad() {
  }

  showPassword($event) {
    $event.preventDefault();
    this.isShowPassword = !this.isShowPassword;
  }

  showPassword1($event) {
    $event.preventDefault();
    this.isShowPassword1 = !this.isShowPassword1;
  }

  showPassword2($event) {
    $event.preventDefault();
    this.isShowPassword2 = !this.isShowPassword2;
  }

  doResetPassword() {
    
    //if (!this.cahngePasswordForm.valid) {
      console.log(this.cahngePasswordForm.value['password']);
      console.log(this.cahngePasswordForm.value['newpassword']);
      console.log(this.cahngePasswordForm.value['newpassword1']);

      this.storage.get('password').then((data) => { 
        console.log(data);
        if (data) {
          this.oldpassword = data;
        }
      });

      if (this.cahngePasswordForm.value['password'] == "") {
        this.toastProvider.show('请输入正确的旧密码', 'error')
        return;
      }

      if (this.cahngePasswordForm.value['password'] != this.oldpassword) {
        this.toastProvider.show('旧密码错误', 'error')
        return;
      }
      
      if (this.cahngePasswordForm.value['newpassword'] == "") {
        this.toastProvider.show('请输入正确的新密码', 'error')
        return;
      }

      if (this.cahngePasswordForm.value['newpassword1'] == "") {
        this.toastProvider.show('请再次输入正确的新密码', 'error')
        return;
      }

      if (this.cahngePasswordForm.value['newpassword1'] != this.cahngePasswordForm.value['newpassword']) {
        this.toastProvider.show('请再次输入正确的密码', 'error')
        return;
      }

      if (this.cahngePasswordForm.value['newpassword'] == this.password) {
        this.toastProvider.show('不会用旧密码', 'error')
        return;
      }
    //}
    
    this.password = this.cahngePasswordForm.value['password'];
    this.newpassword = this.cahngePasswordForm.value['newpassword'];

    this.userProvider.changeSettingPassword(this.sysUserId, this.password, this.newpassword).then((data) => {
      console.log(data);
      if (data['msg'] == "成功") {
        this.toastProvider.show("变更密码成功",'success');
        this.storage.set('password', this.newpassword);
        
        let options: NativeTransitionOptions = {
          direction: 'right',
          duration: 400,
          slowdownfactor: -1,
          iosdelay: 50
        };
        this.nativePageTransitions.slide(options);
        this.navCtrl.push(SettingPage);
      } else {
        this.toastProvider.show(data['msg'], 'errors');
      } 
    }).catch((err) => {
        console.log(err);
    });   
  }

}

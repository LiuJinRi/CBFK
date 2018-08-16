import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {AccountValidator} from "../../validators/account";
import {UserProvider} from "../../providers/user/user";
import {Storage} from '@ionic/storage';
import {ToastProvider} from "../../providers/toast/toast";

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  public isShowPassword: boolean = false;
  public isShowPassword1: boolean = false;
  public isTimerStart: boolean = false;
  public timerText: string = "发送验证码";
  public timerRemainSeconds: number = 60;
  public resetForm: FormGroup;
  public verify_code: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private toastProvider: ToastProvider,
    private formBuilder: FormBuilder,
    private storage: Storage) {
      this.resetForm = this.formBuilder.group({
        'loginName': ['', [Validators.required, AccountValidator.isValid]],
        'phonenumber': ['', [Validators.required, AccountValidator.isValidPhone]],
        'verificationCode': ['', [Validators.required]],
        'newpassword': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]],
        'newpassword1': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]]
    });
  }

  sendCode($event) {
    $event.preventDefault();

    if (this.resetForm.value['phonenumber'] == "") {
        this.toastProvider.show('请输入正确的手机号', 'error')
        return;
    }

    console.log(this.resetForm.value['phonenumber']);

    this.userProvider.getCode(this.resetForm.value['phonenumber']).then((response) => {
        if (response) {
            console.log(response['msg']);
            if ( response['msg'] == "成功") {
                this.toastProvider.show('验证码已发送，请注意查收', 'success')
                this.isTimerStart = true;
                this.timerTracker();
            } else {
                this.toastProvider.show(response['msg'],'error');
                return;
            }  
        }
    }).catch((err) => {
        return;
    });

  }

  timerTracker() {
      setTimeout(() => {
          if (this.timerRemainSeconds > 0) {
              this.timerRemainSeconds--;
              this.timerText = this.timerRemainSeconds + "s后再次发送";
              this.timerTracker();
          }
          else {
              this.timerText = "再次发送";
              this.timerRemainSeconds = 60;
              this.isTimerStart = false;
          }
      }, 1000);
  }

    showPassword($event) {
      $event.preventDefault();
      this.isShowPassword = !this.isShowPassword;
    }

    showPassword1($event) {
        $event.preventDefault();
         this.isShowPassword1 = !this.isShowPassword1;
    }

  goLoginDefaultPage() {
      this.navCtrl.push(LoginPage);
  }

  doReset() {
      
      if (!this.resetForm.valid) {
          if (this.resetForm.value['loginName'] == "") {
              this.toastProvider.show('请输入正确的用户名', 'error')
              return;
          }

          if (this.resetForm.value['phonenumber'] == "") {
            this.toastProvider.show('请输入正确的手机名', 'error')
            return;
          }

          if (this.resetForm.value['verificationCode'] == "") {
            this.toastProvider.show('请输入验证码', 'error')
            return;
          }

          if (this.resetForm.value['newpassword'] == "") {
            this.toastProvider.show('请输入密码', 'error')
            return;
          }

          if (this.resetForm.value['newpassword1'] == "") {
            this.toastProvider.show('请输入密码', 'error')
            return;
          }

           /* 
          if (this.resetForm.value['renewpassword'] == "") {
            this.toastProvider.show('请输入密码', 'error')
            return;
          }
          */
      }

      
      if ( this.resetForm.value['newpassword'] != this.resetForm.value['newpassword1'] ) {
        this.toastProvider.show('密码不一致，重新输入一下', 'error')
        return;
       }
      /*
      if ( this.verify_code != this.resetForm.value['verificationCode'] ) {
        this.toastProvider.show('验证码错误，重新输入一下', 'error')
        return;
       }
       */

      var loginName =  this.resetForm.value['loginName'];
      var newPassword =  this.resetForm.value['newPassword'];
      var phonenumber =  this.resetForm.value['phonenumber'];
      var verificationCode =  this.resetForm.value['verificationCode'];
      
      this.userProvider.changePassword(loginName, newPassword, phonenumber, verificationCode).then(response => {
          if (response) {
            console.log(response['msg']);
            if ( response['msg'] == "成功") {
              this.toastProvider.show("密码变更成功",'success');
              this.navCtrl.push(LoginPage);
            } else {
                this.toastProvider.show(response['msg'],'error');
                return;
            }                  
          }
      }).catch((err) => {
          return;
      });
  }

  ionViewDidLoad() {
  }

}

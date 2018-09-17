import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {AccountValidator} from "../../validators/account";
import {UserProvider} from "../../providers/user/user";
import {Storage} from '@ionic/storage';
import {ToastProvider} from "../../providers/toast/toast";
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public isShowPassword: boolean = false;
  public isShowPassword1: boolean = false;
  public isTimerStart: boolean = false;
  public timerText: string = "发送验证码";
  public timerRemainSeconds: number = 60;
  public registerForm: FormGroup;
  public verify_code: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private toastProvider: ToastProvider,
    private formBuilder: FormBuilder,
    private storage: Storage) {
      this.registerForm = this.formBuilder.group({
        'loginName': ['', [Validators.required, AccountValidator.isValid]],
        'userName': ['', [Validators.required, AccountValidator.isValid]],
        'mailaddress': ['', [Validators.required, AccountValidator.isValidEmail]],
        'phonenumber': ['', [Validators.required, AccountValidator.isValidPhone]],
        'verificationCode': ['', [Validators.required]],
        'password': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]],
        'password1': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]]
    });
  }

  sendCode($event) {
    $event.preventDefault();

    if (this.registerForm.value['phonenumber'] == "") {
        this.toastProvider.show('请输入正确的手机号', 'error')
        return;
    }

    console.log(this.registerForm.value['phonenumber']);

    this.userProvider.getCode(this.registerForm.value['phonenumber']).then((response) => {
        console.log(response);
        if (response['msg'] == "成功") {            
            this.toastProvider.show('验证码已发送，请注意查收', 'success')
            this.isTimerStart = true;
            this.timerTracker();
        } else {
            this.toastProvider.show(response['msg'], 'error');
            return;
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

  doRegister() {
      
      if (!this.registerForm.valid) {
          if (this.registerForm.value['loginName'] == "") {
              this.toastProvider.show('请输入正确的用户名', 'error')
              return;
          }

          if (this.registerForm.value['userName'] == "") {
            this.toastProvider.show('请输入正确的姓名', 'error')
            return;
          }

          if (this.registerForm.value['phonenumber'] == "") {
            this.toastProvider.show('请输入正确的手机名', 'error')
            return;
          }

          if (this.registerForm.value['mailaddress'] == "") {
            this.toastProvider.show('请输入正确的邮箱', 'error')
            return;
          }

          if (this.registerForm.value['verificationCode'] == "") {
            this.toastProvider.show('请输入验证码', 'error')
            return;
          }

          if (this.registerForm.value['password'] == "") {
            this.toastProvider.show('请输入密码', 'error')
            return;
          }
          if (this.registerForm.value['password1'] == "") {
            this.toastProvider.show('请输入密码', 'error')
            return;
          }

          if (this.registerForm.value['password'] != this.registerForm.value['password1']) {
            this.toastProvider.show('两个密码不一致， 重新输入一下', 'error')
            return;
          }

      }

     var loginName =  this.registerForm.value['loginName'];
     var password =  this.registerForm.value['password'];
     var userName =  this.registerForm.value['userName'];
     var phonenumber =  this.registerForm.value['phonenumber'];
     var verificationCode =  this.registerForm.value['verificationCode'];
     var email =  this.registerForm.value['mailaddress'];

     console.log(loginName);
     console.log(password);
     console.log(userName);
     console.log(phonenumber);
     console.log(verificationCode);
     console.log(email);
     
      this.userProvider.register(loginName,password,verificationCode,userName,phonenumber,email).then(data => {
          if (data) {
            console.log(data);
            if ( data['msg'] == "成功")  {
                this.toastProvider.show("注册成功",'success');
                this.navCtrl.push(LoginPage);
            } else {
                this.toastProvider.show(data['msg'],'error');
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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {AccountValidator} from "../../validators/account";
import {UserProvider} from "../../providers/user/user";
import {Storage} from '@ionic/storage';
import {ToastProvider} from "../../providers/toast/toast";
import { ChangehandphonePage } from '../changehandphone/changehandphone';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-handphone',
  templateUrl: 'handphone.html',
})
export class HandphonePage {
  public isShowPassword: boolean = false;
  public isTimerStart: boolean = false;
  public timerText: string = "发送验证码";
  public timerRemainSeconds: number = 60;
  public handphoneForm: FormGroup;
  public verify_code: string;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private toastProvider: ToastProvider,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private nativePageTransitions : NativePageTransitions) {
      this.handphoneForm = this.formBuilder.group({
        'oldphonenumber': ['', [Validators.required, AccountValidator.isValidPhone]],
        'verificationCode': ['', [Validators.required]]
    });
  }

  sendCode($event) {
    $event.preventDefault();

    if (!this.handphoneForm.controls.oldphonenumber.valid || this.handphoneForm.controls.oldphonenumber.errors) {
        this.toastProvider.show('请输入正确的旧手机号', 'error')
        return;
    }

    this.userProvider.getCode(this.handphoneForm.value.oldphonenumber).then((response) => {
        if (response) {
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

  doResetPhone() {
      
    if ( this.handphoneForm.value['verificationCode'] == "" ) {
        this.toastProvider.show('请输入验证码', 'error')
        return;
    } 
    
    var telephoneNumber = this.handphoneForm.value['oldphonenumber'];
    var verificationCode = this.handphoneForm.value['verificationCode'];

      this.userProvider.changePhone(telephoneNumber, verificationCode).then((data) => {
        if (data.msg == "成功") {
            let options: NativeTransitionOptions = {
                direction: 'right',
                duration: 400,
                slowdownfactor: -1,
                iosdelay: 50
               };
            this.nativePageTransitions.slide(options);
            this.navCtrl.push(ChangehandphonePage);
          } 
      }).catch((err) => {
          console.log(err);
      });      
  }
}

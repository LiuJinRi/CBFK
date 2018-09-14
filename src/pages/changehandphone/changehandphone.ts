import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {AccountValidator} from "../../validators/account";
import {UserProvider} from "../../providers/user/user";
import {Storage} from '@ionic/storage';
import {ToastProvider} from "../../providers/toast/toast";
import { MinePage } from '../mine/mine';
import { HandphonePage } from '../handphone/handphone';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the ChangehandphonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changehandphone',
  templateUrl: 'changehandphone.html',
})
export class ChangehandphonePage {
  public isShowPassword: boolean = false;
  public isTimerStart: boolean = false;
  public timerText: string = "发送验证码";
  public timerRemainSeconds: number = 60;
  public cahngeHandphoneForm: FormGroup;
  sysUserId : string = null;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private toastProvider: ToastProvider,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private nativePageTransitions : NativePageTransitions) {
      this.cahngeHandphoneForm = this.formBuilder.group({
        'newphonenumber': ['', [Validators.required, AccountValidator.isValidPhone]],
        'verificationCode': ['', [Validators.required]]
    });

    storage.get('sysUserId').then((data) => { 
      console.log(data);
      if (data) {
        this.sysUserId = data;
      }
    });
  }

  sendCode($event) {
    $event.preventDefault();

    this.userProvider.getCode(this.cahngeHandphoneForm.value['newphonenumber']).then((response) => {
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

  doResetPhone() {

      if (!this.cahngeHandphoneForm.valid) {
        if (this.cahngeHandphoneForm.value['newphonenumber'] == "") {
          this.toastProvider.show('请输入正确的新手机号', 'error')
          return;
        }
      }

      var telephoneNumber = this.cahngeHandphoneForm.value['newphonenumber'];
      var verificationCode = this.cahngeHandphoneForm.value['verificationCode'];

      this.userProvider.changePhoneNext(this.sysUserId, telephoneNumber, verificationCode).then((data) => {
        if (data['msg'] == "成功") {
          this.toastProvider.show("变更手机号成功",'success');
          this.storage.set('phonenumber', telephoneNumber);

          let options: NativeTransitionOptions = {
            direction: 'left',
            duration: 400,
            slowdownfactor: -1,
            iosdelay: 50
           };
       
          this.nativePageTransitions.slide(options);
          this.navCtrl.push(TabsPage, {tabindex:"3"});
        } else {
          this.toastProvider.show(data['msg'], 'errors');

          let options: NativeTransitionOptions = {
            direction: 'right',
            duration: 400,
            slowdownfactor: -1,
            iosdelay: 50
           };
       
          this.nativePageTransitions.slide(options);
          this.navCtrl.push(HandphonePage);
        } 
      }).catch((err) => {
          console.log(err);
      });

      
  }

}

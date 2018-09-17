import { CarProvider } from './../../providers/car/car';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ToastProvider} from "./../../providers/toast/toast";

/**
 * Generated class for the LevelLocatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var BMap;

@IonicPage()
@Component({
  selector: 'page-level-locate',
  templateUrl: 'level-locate.html',
})
export class LevelLocatePage {
  deviceBoxId : string = null;
  map: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastProvider: ToastProvider,
    public carProvider : CarProvider) {
      this.deviceBoxId = this.navParams.get('deviceBoxId');
  }

  ionViewDidLoad() {
    console.log('Loading Amap');
  }

  ionViewWillEnter() {
    this.map = new BMap.Map("container"); // 创建地图实例     
    
    this.carProvider.carLocate(this.deviceBoxId).then((data)=>{
      console.log(data);
      if ( data.rows.length != 0 ) {
        var longitude = data.rows['longitude'];
        var latitude = data.rows['latitude'];
        console.log(longitude);
        console.log(latitude);
        if (longitude != null && latitude != null ) {
          let point = new BMap.Point(longitude, latitude);
          this.map.centerAndZoom(point, 16);//设置中心和地图显示级别
          this.map.enableScrollWheelZoom();//启动滚轮放大缩小，默认禁用
          this.map.enableContinuousZoom(); //连续缩放效果，默认禁用

          //地图放大缩小控件
          let sizeMap = new BMap.Size(10, 80);//显示位置
          this.map.addControl(new BMap.NavigationControl({
            anchor: BMap.BMAP_ANCHOR_BOTTOM_RIGHT,//显示方向
            offset: sizeMap
          }));

          let icon = new BMap.Icon('../assets/imgs/fpack.png', new BMap.Size(32, 32), {
              anchor: new BMap.Size(10, 30),
          });
              
          var marker=new BMap.Marker(new BMap.Point(longitude, latitude), {
            icon: icon,
            enableDragging: false,
            raiseOnDrag: true
          }); 
          this.map.addOverlay(marker);  
        } else {
          return;
        }
      } 
      
    }).catch((err)=>{
      return;
    });
    
  }

  goToHomePage() {
     this.navCtrl.pop();
  }

}

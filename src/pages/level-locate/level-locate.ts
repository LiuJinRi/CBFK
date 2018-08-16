import { CarProvider } from './../../providers/car/car';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    public carProvider : CarProvider) {
      this.deviceBoxId = this.navParams.get('deviceBoxId');
  }

  ionViewDidLoad() {
    console.log('Loading Amap');
    //this.loadMap();
  }

  ionViewWillEnter() {
    //let map = this.map = new BMap.Map(this.mapElement.nativeElement, { enableMapClick: true });
    this.map = new BMap.Map("container"); // 创建地图实例     
    
    this.carProvider.carLocate(this.deviceBoxId).then((data)=>{
      console.log(JSON.stringify(data.msg[0]));
      var longitude = data.msg[0].longitude;
      var latitude = data.msg[0].latitude;

      if (longitude != null && latitude != null ) {
        //let point = new BMap.Point(longitude, latitude);//(116.06827, 22.549284);
        let point = new BMap.Point(data.msg[0].longitude, data.msg[0].latitude);
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
            
        var marker=new BMap.Marker(new BMap.Point(data.msg[0].longitude, data.msg[0].latitude), {
          icon: icon,
          enableDragging: true,
          raiseOnDrag: true
        }); 
        this.map.addOverlay(marker);  
      } else {
        return;
      }
    }).catch((err)=>{
      return;
    });
    
  }

  goToHomePage() {
     //push another page onto the history stack
     //causing the nav controller to animate the new page in
     //this.navCtrl.push(HomePage);
     this.navCtrl.pop();
  }

}

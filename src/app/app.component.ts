import { Component } from '@angular/core';
import {
  AdMob,
  BannerAdOptions,
  BannerAdSize,
  BannerAdPosition
} from '@capacitor-community/admob';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  constructor() {
    this.initializeAdMob();
  }

  async initializeAdMob() {
    await AdMob.initialize();
    this.showBannerAd();
  }

  async showBannerAd() {
    const options: BannerAdOptions = {
      adId: 'ca-app-pub-3940256099942544/6300978111', // Test Banner Ad ID
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true // Set to false for production
    };

    await AdMob.showBanner(options);
  }
}

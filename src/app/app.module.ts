import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WindowService } from './services/window/window.service';
import { LevelService } from './services/level/level.service';
import { SpeedService } from './services/speed/speed.service';
import { AdMobFree } from '@ionic-native/admob-free/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    WindowService,
    LevelService,
    AdMobFree,
    SpeedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

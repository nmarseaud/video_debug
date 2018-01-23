import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  video;
  constructor(public navCtrl: NavController, private mediaCapture: MediaCapture) {
      let options: CaptureVideoOptions = { limit: 1, duration:180, };
      this.mediaCapture.captureVideo(options)
      .then(
        (videodata: MediaFile[]) => {
            console.log(videodata);
            this.video = { url : videodata[0].localURL };
            videodata[0].getFormatData(function(formatData) {
                console.log(formatData);
            });
        },
        (err: CaptureError) => {
            console.error(err)
        }
      );
  }

  videoCapture() {
      console.log("Video Capture");
      let options: CaptureVideoOptions = { limit: 1, duration:180, };
      this.mediaCapture.captureVideo(options)
      .then(
        (videodata: MediaFile[]) => {
            console.log(videodata);
            this.video = { url : videodata[0].fullPath };
            videodata[0].getFormatData(function(formatData) {
                console.log(formatData);
            });
        },
        (err: CaptureError) => {
            console.error(err)
        }
      );
  }

}

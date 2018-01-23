import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  video;

  @ViewChild('myvideo') myVideo: any;
  //https://ionicacademy.com/capture-audio-video-local/
  constructor(public navCtrl: NavController, private mediaCapture: MediaCapture, private storage: Storage, private file: File, private media: Media) {
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
  ionViewDidLoad() {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      this.mediaFiles = JSON.parse(res) || [];
    })
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

import { Injectable } from '@angular/core';
import {Constants} from "./constants";
import {Platform} from "ionic-angular";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { FileTransferObject, FileTransfer, FileUploadOptions } from "@ionic-native/file-transfer";

@Injectable()
export class PictureService {

  private fileTransfer: FileTransferObject = this.transfer.create();
  private picturePreset = 'somePreset';

  constructor(private camera: Camera,
              private platform: Platform,
              private photoViewer: PhotoViewer,
              private transfer: FileTransfer) {
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 1000,
      targetHeight: 1000
    };
    return this.camera.getPicture(options)
      .then(picture => {
        return this.platform.is('ios') ? picture.replace(/^file:\/\//, '') : picture;
      })
  }

  getImageFromFile() {
    const options: CameraOptions = {
      quality: 70,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      allowEdit: true,
      targetWidth: 1000,
      targetHeight: 1000,
      saveToPhotoAlbum: false
    };

    return this.camera.getPicture(options)
      .then(picture => {
        return this.platform.is('ios') ? picture.replace(/^file:\/\//, '') : picture;
      })
  }

  showPictureFullScreen(pictureUrl: string) {
    this.photoViewer.show(pictureUrl);
  }

  uploadImage(picture: any, type: string) {
    let options: FileUploadOptions = {
      params: {'upload_preset': this.picturePreset},
      mimeType: 'image/jpeg',
      httpMethod: 'post'
    };

    return this.fileTransfer.upload(picture, Constants.PICTURE_UPLOAD_ENDPOINT, options);
  }
}

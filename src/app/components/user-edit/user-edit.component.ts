import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public idendity: Object;
  public token: string;
  public status: string;
  public url: string;
  public afuConfig;
  public resetVar: boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {
    this.page_title = "Ajustes de usuario";
    this.idendity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = <User>this.idendity;
    this.url = global.url;

    // Configuración del angular file uploader. 
    // +info en https://www.npmjs.com/package/angular-file-uploader
    this.afuConfig = {
      multiple: false,
      formatAllowed: ".jpg, .jpeg, .png, .gif",
      uploadAPI:{
        url: this.url + "upload-avatar",
        headers: {
          "Authorization": this.token
        }
      },
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Sube tu foto...',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !',
        sizeLimit: 'Size Limit'
      }
    };
    this.resetVar = true;
  }

  ngOnInit(): void {
  }

  avatarUpload(data) {
    this.user.image = data.body.user.image;
    console.log(this.user);
  }

  onSubmit(form) {
    this._userService.update(this.user).subscribe(
      response => {
        if (!response.user) {
          this.status = "error";
        } else {
          this.status = "success";
          localStorage.setItem('identity', JSON.stringify(this.user));
        }
      },
      error => {
        console.log(error);
        this.status = "error";
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.services';
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
      attachPinText: "Sube tu foto"
    };
  }

  ngOnInit(): void {
  }

  avatarUpload(data) {
    this.user.image = data.body.user.image;
    console.log(this.user);
  }

}

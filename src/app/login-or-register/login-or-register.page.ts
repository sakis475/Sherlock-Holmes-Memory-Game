import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login-or-register',
  templateUrl: './login-or-register.page.html',
  styleUrls: ['./login-or-register.page.scss'],
})
export class LoginOrRegisterPage implements OnInit {
  constructor(public httpClient: HttpClient) {}

  ngOnInit() {}

  sendPostRequest() {}
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserDetails } from './mainbody/mainbody.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  readonly BACKEND_URL;
  private httpClient : HttpClient;
  registerUserMessage;
  getRegisterUserMessageChange = new Subject<void>();
  alertPresent : boolean = false;
  alertAbsent : boolean = false;



  constructor(httpClient : HttpClient) {
    this.httpClient = httpClient;
    this.BACKEND_URL = "http://localhost:6069/form";
  }

  registerUser(userDetails : UserDetails) {
    return this.httpClient.post(this.BACKEND_URL , {

    }).subscribe(
      (response) => {
        console.log("response = " + response);
        this.registerUserMessage = response;
        this.getRegisterUserMessageChange.next();
      },
      (error) => {
        if(error.status == 200)
        this.registerUserMessage = "success";
        else
        this.registerUserMessage = "error";
        console.log("errresponse = " + error.status);
        this.getRegisterUserMessageChange.next();

      }

    )

  }
}

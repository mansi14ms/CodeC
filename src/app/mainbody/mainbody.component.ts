import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
export interface UserDetails {
  name : String;
  mail : String;
  phone : String;

}

@Component({
  selector: 'app-mainbody',
  templateUrl: './mainbody.component.html',
  styleUrls: ['./mainbody.component.scss']
})
export class MainbodyComponent implements OnInit {

 dataService : DataserviceService;
 private registerUserMessage;
 spinner : boolean = false;

 profileForm = new FormGroup({
   name : new FormControl('', [Validators.required]),
   mail : new FormControl('', [Validators.required]),
   phone : new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10)])

 })


  constructor(dataService : DataserviceService) {
    this.dataService = dataService;
   }

  ngOnInit(): void {
  }

  submitForm() {
    console.log("hello");
    this.spinner = true;
    this.dataService.registerUser(this.profileForm.value);
    this.dataService.getRegisterUserMessageChange.subscribe( () => {
      this.registerUserMessage = this.dataService.registerUserMessage;
      console.log(this.registerUserMessage);
      if(this.registerUserMessage == "error") {
        this.spinner = false;
       this.dataService.alertAbsent = true;
      }

      else {
      this.spinner = false;
      this.dataService.alertPresent = true;
      this.profileForm.reset();
      }
    })

  }

}

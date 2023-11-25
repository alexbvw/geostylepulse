
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LocationService } from 'src/app/helper/location.service';
import { AuthenticationService } from 'src/app/helper/authentication.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  RegisterForm: FormGroup | any;
  address = new FormControl('');
  addressSelected = false;
  authenticationToggle = false;
  stylist_name : any;
  location : any;
  latitude : any;
  longitude : any;
  phone_number : any;
  pin_code : any;
  pin_codeverify : any;
  role : any;
  show = false;
  step1 = true;
  step2 = false;
  step3 = false;
  selectedFile: any;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authenticationService: AuthenticationService,
    public locationService: LocationService
  ) { 
 
  }

  async ngOnInit() {
    this.address.valueChanges.subscribe(async (value: any) => {
      console.log(value);
      if (value.length > 3 && value != this.location) {
        await this.searchAddress(value);
      }
    });
  }

  validatePhone(phone_number : any) {
    const regularExpression = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    return regularExpression.test(String(phone_number).toLowerCase());
   }
  
  completeStep1(){
    console.log(this.phone_number)
    if(this.validatePhone(this.phone_number) && this.pin_code?.length > 3 && this.pin_code == this.pin_codeverify) {
      this.step2 = true;
      this.step1 = false;
    } else{
      if(!this.validatePhone(this.phone_number)){
        console.log('Invalid Phone Number')
        this.authenticationService.presentToast('Invalid Phone Number')
      }
      if(this.pin_code != this.pin_codeverify){
        console.log('Pin codes do not match')
        this.authenticationService.presentToast('Pin codes do not match')
      } else{
        console.log('Complete Step 1')
        this.authenticationService.presentToast('Complete Step 1')
      }
    }
  }

  register(){
    let stylist = {
      "name": this.stylist_name, 
      "phone_number": this.phone_number, 
      "current_address": this.location, 
      "pin_code": this.pin_code, 
      "role": "STYLIST", 
      "active": false, 
      "latitude": this.latitude,
      "longitude": this.longitude,
      "radius": 100
    }
    if(this.validatePhone(this.phone_number) && this.pin_code?.length > 3 && this.pin_code == this.pin_codeverify) {
      this.authenticationService.register(stylist)
      .then((res:any) => {
        this.authenticationService.presentToast(res.message)
        this.authenticationToggle = !this.authenticationToggle;
      })
      .catch((err:any) => {
        console.log(err)
        this.authenticationService.presentToast(err.error)
      })
    } else{
      if(!this.validatePhone(this.phone_number)){
        console.log('Invalid Phone Number')
        this.authenticationService.presentToast('Invalid Phone Number')
      }
      if(this.pin_code != this.pin_codeverify){
        console.log('Pin codes do not match')
        this.authenticationService.presentToast('Pin codes do not match')
      } else{
        console.log('Complete Step 1')
        this.authenticationService.presentToast('Complete Step 1')
      }
    }
   
  }
  
  back1(){
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
  }
  
async searchAddress(address:any){
    this.locationService.searchLocationforLatitudeAndLongitude(address)
      .then(async (res:any) => {
        console.log(res)
        this.locationService.results = await res?.items;
      })
      .catch((err:any) => {
        console.log(err)
      })
  }

  async selectLocation(location:any){
    console.log(location)
    this.locationService.results = []
    await this.locationService.getLatitudeAndLongitudeforAddress(location)
    .then(async (res:any) => {
      console.log(res)
     if(res.items.length){
       this.locationService.selectedLocation = await res.items[0]
       this.latitude = await this.locationService.selectedLocation.position.lat
       this.longitude = await this.locationService.selectedLocation.position.lng
       this.location = await this.locationService.selectedLocation.address.label
       this.address.setValue(this.location)
       this.addressSelected = true;
     }
    })
    .catch((err:any) => {
      console.log(err)
    })
  }

  async login(){
    let stylist ={
      "pin_code": this.pin_code,
      "phone_number": this.phone_number
    }

   await this.authenticationService.login(stylist)
    .then(async(res:any) => {
      localStorage.setItem('token', res.token)
      localStorage.setItem('refreshToken', res.refreshToken)
      if(localStorage.getItem('token') && localStorage.getItem('token') != ''){
        this.authenticationService.decoded = jwtDecode(localStorage.getItem('token') || '');
      }
      if(this.authenticationService.isLoggedIn){
        this.authenticationService.stylistDecode = this.authenticationService.decoded
        this.authenticationService.stylistId = this.authenticationService.stylistDecode.id
        localStorage.setItem('stylistId', this.authenticationService.stylistId)
        this.authenticationService.presentToast('welcome to geostyle pulse')
        this.router.navigate(['pulse'])
        // setTimeout(() => {
        //   window.location.reload()
        // }, 850);
      }
    })
    .catch((err:any) => {
      console.log(err)
      this.authenticationService.presentToast(err.error.message)
    })
  }

  navRegister(){
    this.router.navigate(['register'])
  }

  // toggle(){
  //   this.authenticationService.show = !this.authenticationService.show
  // }

  // private onSuccess() {
  //   this.selectedFile.pending = false;
  //   this.selectedFile.status = 'ok';
  // }

  // private onError() {
  //   this.selectedFile.pending = false;
  //   this.selectedFile.status = 'fail';
  //   this.selectedFile.src = '';
  // }

  // processFile(imageInput: any) {
  //   const file: File = imageInput.files[0];
  //   const reader = new FileReader();
  //   let id = this.auth.StylistId
  //   reader.addEventListener('load', (event: any) => {

  //     this.selectedFile = new ImageSnippet(event.target.result, file);

  //     this.selectedFile.pending = true;
  //     this.imageService.uploadImage(this.selectedFile.file, id)
  //   });

  //   reader.readAsDataURL(file);
  // }
}

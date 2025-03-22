import { Spot } from 'src/app/model/spot';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { spotsService } from 'src/app/helper/spots.service';
import { LocationService } from 'src/app/helper/location.service';
import { ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})

export class AddModalComponent  implements OnInit {
  addType = localStorage.getItem('addType');
  address = new FormControl('');
  spot: Spot = {
    name: '',
    latitude: 0,
    longitude: 0,
    address: '',
    images: [],
    open_hour: new Date().toISOString().split('T')[1],
    close_hour: new Date().toISOString().split('T')[1],
    active: false,
    radius: 10
  }

  constructor(
    private modalCtrl: ModalController,
    public spotsService: spotsService,
    private popOverCtrl: PopoverController,
    public locationService: LocationService,
  ) { }

  ngOnInit() {
    console.log(this.addType)
    this.address.valueChanges.subscribe(async (value: any) => {
      console.log(value);
      if (value.length > 3 && value != this.spot.address) {
        await this.searchAddress(value);
      }
    });
  }

  cancel() {
    return this.modalCtrl.dismiss('cancel'), this.popOverCtrl.dismiss();
  }

  async confirm() {
    if(this.addType == "spot") await this.addSpot(this.spot)
    return this.modalCtrl.dismiss('submit'), this.popOverCtrl.dismiss();
  }

  async addSpot(spot:any){    
    this.spotsService.addSpot(spot)
    .then(async (res:any) => {
      this.spotsService.presentToast(res.message)
      this.modalCtrl.dismiss('confirm');
      this.popOverCtrl.dismiss();
      console.log(res)
      spot["id"] = res.id
      localStorage.setItem("currentSpot", JSON.stringify(spot))
      await this.getStylistSpots()
    })
    .catch((err:any) => {
      console.log(err)
      this.spotsService.presentToast(err.error.message)
    })
  }

  async getStylistSpots(){
    this.spotsService.getStylistSpots()
    .then((res:any) => {
      console.log(res)
      this.spotsService.spots = res.spots
      if(localStorage.getItem("currentSpot") && localStorage.getItem("currentSpot") != "null"){
        this.spotsService.current_spot = JSON.parse(localStorage.getItem("currentSpot") ?? "")
      this.spotsService.current_spot_name = this.spotsService.current_spot.name
      console.log(this.spotsService.current_spot_name)
      }
    })
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
       this.spot.latitude = await this.locationService.selectedLocation.position.lat
       this.spot.longitude = await this.locationService.selectedLocation.position.lng
       this.spot.address = await this.locationService.selectedLocation.address.label
       this.address.setValue(await this.locationService.selectedLocation.address.label)
       this.locationService.addressSelected = true;
     }
    })
    .catch((err:any) => {
      console.log(err)
    })
  }

}

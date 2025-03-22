import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RouteService } from 'src/app/helper/route.service';
import { spotsService } from 'src/app/helper/spots.service';
import { AuthenticationService } from 'src/app/helper/authentication.service';
import { AddModalComponent } from 'src/app/molecule/add-modal/add-modal.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private router: Router,
    public routeService: RouteService,
    public authenticationService: AuthenticationService,
    public spotsService: spotsService,
    private modalCtrl: ModalController
    // private sseService: SseService
    ){

    }

    async ngOnInit() {
      if(this.authenticationService.isLoggedIn && localStorage.getItem("currentSpot")){

      }
    }

    selectionChanged(data:any){
      for(let [spotIndex, spot] of this.spotsService.spots.entries()) {
        if(spot.name == data.detail.value){
          this.spotsService.current_spot = spot
          localStorage.setItem("currentSpot", JSON.stringify(spot))
        }
      }
      console.log(this.spotsService.current_spot)
    }
    
    async openAddModal(type:any) {
      localStorage.setItem('addType', type)
      const modal = await this.modalCtrl.create({
        component: AddModalComponent,
      });
      modal.present();
    }

    async removeSelection(){
      localStorage.removeItem('currentSpot')
      this.router.navigate(['pulse'])
      this.spotsService.current_spot_name = null
      this.spotsService.current_spot = null
    }
}

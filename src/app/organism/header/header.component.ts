import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RouteService } from 'src/app/helper/route.service';
import { SpotService } from 'src/app/helper/spots.service';
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
    public spotService: SpotService,
    private modalCtrl: ModalController
    // private sseService: SseService
    ){

    }

    async ngOnInit() {
      if(this.authenticationService.isLoggedIn && localStorage.getItem("currentSpot")){

      }
    }

    selectionChanged(data:any){
      for(let [spotIndex, spot] of this.spotService.spots.entries()) {
        if(spot.name == data.detail.value){
          this.spotService.current_spot = spot
          localStorage.setItem("currentSpot", JSON.stringify(spot))
        }
      }
      console.log(this.spotService.current_spot)
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
      this.router.navigate(['/'])
      this.spotService.current_spot_name = null
      this.spotService.current_spot = null
    }
}

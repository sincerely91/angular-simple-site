import { Component, ViewChild, OnInit } from '@angular/core';
import { Location } from '../../generated/models/location';
import { Observable, of } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LocationDetailsComponent } from '../location-details/location-details.component';
import { MapComponent } from '../map/map.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { BackgroundBlurService } from 'src/app/core/services/background-blur.service';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedLocation$: Observable<Location>;
  shouldBlurBackground$: Observable<boolean>;

  @ViewChild(MapComponent) mapComp: MapComponent;

  desktop = true;

  constructor(
    private bottomSheet: MatBottomSheet,
    private backgroundBlurService: BackgroundBlurService,
    private breakpointObserver: BreakpointObserver
    ) {}

  ngOnInit() {
    this.shouldBlurBackground$ = this.backgroundBlurService.getBlur();
    this.desktop = this.breakpointObserver.isMatched('(min-width: 601px)');
  }

  onLocationEmitted(location: Location, fromMap: boolean) {
    this.selectedLocation$ = of(location);
    this.openBottomSheet(fromMap);
    if (!fromMap) {
      this.mapComp.zoomToNewLocation(location);
    }
  }

  openBottomSheet(fromMap: boolean): void {
    const bottomSheetRef = this.bottomSheet.open(LocationDetailsComponent, { data: this.selectedLocation$, disableClose: true });
    // Because of the maps weird interaction behaviours we need this workaround
    setTimeout(() => {
      bottomSheetRef.disableClose = false;
    }, 500);
    bottomSheetRef.afterDismissed().subscribe(() => {
      if (fromMap) {
        this.mapComp.deselect();
      }
    });
  }
}

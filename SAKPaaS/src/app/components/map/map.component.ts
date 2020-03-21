import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import * as olProj from 'ol/proj';
import { GpsService } from 'src/app/core/services/gps.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  customMap: Map;

  constructor(
    private gpsService: GpsService,
  ) { }

  ngOnInit(): void {
    this.gpsService.getLocation().subscribe(gpsCoordinates => {
      console.log("Map will be loaded")
      this.customMap = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
          })
        ],
        view: new View({
          center: olProj.fromLonLat([gpsCoordinates.longitude, gpsCoordinates.latitude]),
          zoom: 2
        })
      });
    });
  }
}

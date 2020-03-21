import { Injectable } from '@angular/core';
import { OccupancyService } from 'src/app/generated/services';
import { Observable } from 'rxjs';
import { Location } from 'src/app/generated/models';

@Injectable({
  providedIn: 'root'
})
export class OccupancyProviderService {

  constructor(
    private occupancyApiService: OccupancyService
  ) { }

  public checkIn(id: number): Observable<void> {
    return this.occupancyApiService.locationsIdCheckInPost({ id });
  }

  public sendOccupancy(id: number, occupancy: number): Observable<Location> {
    return this.occupancyApiService.locationsIdOccupancyPost({id, body: { occupancy }});
  }
}

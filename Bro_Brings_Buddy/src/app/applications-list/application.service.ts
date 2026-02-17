import { inject, Injectable, signal } from '@angular/core'
import { ApplicationFrom } from '../models/application-form.model'
import { Role } from '../models/role.model'
import { Page } from '../models/page.model'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private http = inject(HttpClient)
  private baseUrl = 'http://localhost:3000/applications'

  getApplicationsForUser(
    username: string,
    role: Role,
    pageType: Page,
  ): Observable<ApplicationFrom[]> {
    const params = new HttpParams()
      .set('username', username)
      .set('role', role)
      .set('pageType', pageType)

    return this.http.get<ApplicationFrom[]>(this.baseUrl, { params })
  }
}

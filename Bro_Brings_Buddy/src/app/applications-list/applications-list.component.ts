import { Component, computed, inject, input, OnInit, signal } from '@angular/core'
import { ApplicationComponent } from './application/application.component'
import { ApplicationService } from './application.service'
import { Role } from '../models/role.model'
import { Page } from '../models/page.model'
import { MatDialog } from '@angular/material/dialog'
import { NewApplicationComponent } from './new-application/new-application.component'
import { ApplicationFrom } from '../models/application-form.model'

@Component({
  selector: 'app-applications-list',
  imports: [ApplicationComponent],
  templateUrl: './applications-list.component.html',
  styleUrl: './applications-list.component.css',
})
export class ApplicationsListComponent {
  private applicationService = inject(ApplicationService)

  applicationsList = signal<ApplicationFrom[]>([])
  username = input<string>()
  role = input<Role>()
  pageType = input<Page>()

  ngOnInit() {
    this.applicationService
      .getApplicationsForUser(this.username()!, this.role()!, this.pageType()!)
      .subscribe((apps) => this.applicationsList.set(apps))
  }

  canDeleteApp = computed(() => {
    if (this.role() === 'bro') {
      return false
    }
    return true
  })

  canVote = computed(() => {
    if (this.pageType() === 'Admin') {
      return true
    }
    return false
  })

  canAddApp = computed(() => {
    if (this.role() === 'bro') {
      return false
    }
    return true
  })

  onDeleteApp(appId: number) {
    this.applicationsList.update((apps) => apps.filter((app) => app.appId !== appId))
  }

  private dialog = inject(MatDialog)

  openNewAppDialog() {
    this.dialog.open(NewApplicationComponent, {
      width: '500px',
      disableClose: true,
      panelClass: 'custom-dialog',
      data: {
        pageType: this.pageType(),
      },
    })
  }
}

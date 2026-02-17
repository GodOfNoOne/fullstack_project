import { Component, inject, input, output } from '@angular/core'
import { ApplicationFrom } from '../../models/application-form.model'
import { ApplicationService } from '../application.service'

@Component({
  selector: 'app-application',
  imports: [],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css',
})
export class ApplicationComponent {
  application = input<ApplicationFrom>()
  canDeleteApp = input.required<boolean>()
  canVote = input.required<boolean>()

  deleteApp = output<number>()

  onDelete() {
    const wantsToDelete = window.confirm('Are you sure you want to this delete application?')

    if (wantsToDelete) {
      this.deleteApp.emit(this.application()!.appId)
    }
  }
}

import { Injectable, TemplateRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notification: NzNotificationService) { }

  private createNotification(type: string, title: string, content: string): void {
    this.notification.create(
      type,
      title,
      content
    );
  }

  successNotification(message: string): void {
    this.createNotification('success', message, '');
  }

  infoNotification(title: string, content: string): void {
    this.createNotification('info', title, content);
  }

  warningNotification(title: string, content: string): void {
    this.createNotification('warning', title, content);
  }

  errorNotification(message: string): void {
    this.createNotification('error', message, '');
  }
}

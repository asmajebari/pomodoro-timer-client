import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { createPopper } from '@popperjs/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  dropdownPopoverShow = false;
  @ViewChild('btnDropdownRef', { static: false }) btnDropdownRef: ElementRef =
    {} as ElementRef;
  @ViewChild('popoverDropdownRef', { static: false })
  popoverDropdownRef: ElementRef = {} as ElementRef;
  avatar: string = "https://www.w3schools.com/howto/img_avatar.png";
  username: string = "Guest";
  showModal = false;
  user: any;
  constructor(private authService:AuthService) {}

  ngOnInit(): void { 
    this.user = JSON.parse(localStorage.getItem("Data")!);

    if (this.user) {
      if (this.user.avatar) {
        let avatarUrl = this.user.avatar;
        this.avatar = avatarUrl;
      }
      this.username = this.user.username;
    }
    
  }

  onSaveChanges() {
    this.toggleModal();
    this.authService.updateUser(this.username).subscribe();
  }
  toggleModal() {
    this.showModal = !this.showModal;
    this.dropdownPopoverShow = false;
  }

  onLogout() {
    this.authService.logout();
  }

  onDeleteAccount() {
    this.authService.deleteUser();
  }

  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: 'bottom-end',
      }
    );
  }
  toggleDropdown(event: any) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }
}

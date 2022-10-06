import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { createPopper } from '@popperjs/core';

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
  constructor() {}

  ngOnInit(): void { }
  
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

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { DatabaseService } from 'src/app/dashboard/services/database.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  navigationToggle: false;
  form: FormGroup;
  currentUrl = '';
  constructor(
    public router: Router,
    public db: DatabaseService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      filter: [''],
    });

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentUrl = this.router.url;
      }
    });
  }
}

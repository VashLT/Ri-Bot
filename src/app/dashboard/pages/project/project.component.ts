import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { Project } from '../../models/project.model';
import { Captcha } from '../../models/captcha.model';

@Component({
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  project: Project;
  inCaptchaStatisticsView = false;
  captcha: Captcha;
  addingCaptcha = false;
  constructor(
    public db: DatabaseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if (!this.router.url.startsWith('/proyecto')) return;
        this.checkUrl();
      }
    });
  }

  ngOnInit(): void {
    this.checkUrl();
  }

  checkUrl(): void {
    if (isNaN(Number(this.route.snapshot.paramMap.get('id')))) {
      alert('El proyecto al que intenta ir no existe');
      this.router.navigateByUrl('');
      return;
    }
    const projectId = Number(this.route.snapshot.paramMap.get('id'));

    console.log({ projectId });
    this.project = this.db.projects.find(({ id }) => id === projectId);

    if (!this.project) {
      alert('El proyecto al que intenta ir no existe');
      this.router.navigateByUrl('');
    }

    console.log('[INFO] In project', { project: this.project });
  }

}

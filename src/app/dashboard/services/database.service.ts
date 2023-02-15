import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  projects: Project[];
  constructor() {
    this.projects = this.getProjects();
  }

  getProjects(): Project[] {
    const rawProjects = localStorage.getItem('projects');
    if (!rawProjects) return [];
    try {
      return JSON.parse(rawProjects);
    } catch (_) {
      return [];
    }
  }

  saveProject(project: Project) {
    let projects = this.getProjects();
    projects.push(project);

    this.projects = projects;

    localStorage.setItem('projects', JSON.stringify(projects));
  }
}

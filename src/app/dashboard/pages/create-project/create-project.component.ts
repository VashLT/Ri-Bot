import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Captcha } from '../../models/captcha.model';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  form: FormGroup;
  captchaForm: FormGroup;
  addingCaptcha = false;
  inAddCaptchaView = true;
  /** Si está en la vista para seleccionar categoria y tipo de captcha */
  // inAddCaptchaView = false;
  /** Si está en la vista para crear un captcha */
  inCreateCaptchaView = false;
  // inCreateCaptchaView = true;
  /** Categoria seleccionada */
  selectedCategory: number;
  captchas: Captcha[] = [
    // {
    //   name: 'Test',
    //   content: '',
    //   instruction: 'Test instruction',
    // },
  ];
  constructor(private fb: FormBuilder, private db: DatabaseService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      projectName: ['', Validators.required],
      projectDesc: [''],
      projectImage: [''],
    });

    this.captchaForm = this.fb.group({
      name: ['', Validators.required],
      instruction: ['', Validators.required],
    });
  }

  goToAddNewCaptcha() {
    this.captchaForm = this.fb.group({
      name: ['', Validators.required],
      instruction: ['', Validators.required],
    });
    console.log('[INFO] Go to add new captcha');
    this.inAddCaptchaView = true;
  }

  addCaptcha() {
    this.captchas.push({
      name: this.captchaForm.value.name,
      instruction: this.captchaForm.value.instruction,
      content: '',
    });
    this.inCreateCaptchaView = false;
    this.inAddCaptchaView = false;

    console.log('[INFO] Add captcha', {
      captcha: {
        name: this.captchaForm.value.name,
        instruction: this.captchaForm.value.instruction,
        content: '',
      },
    });
  }

  saveProject() {
    this.db.saveProject({
      id: this.db.projects.length + 1,
      name: this.form.value.projectName,
      description: this.form.value.projectDesc,
      image: this.form.value.projectDesc ?? null,
      catpchas: this.captchas,
    });
    console.log('[INFO] Save project', {
      project: {
        name: this.form.value.projectName,
        description: this.form.value.projectDesc,
        image: this.form.value.projectDesc ?? null,
        catpchas: this.captchas,
      },
    });
  }

  test() {
    console.log({
      form: this.form,
      captchaForm: this.captchaForm,
      projects: this.db.projects,
    });
  }
}

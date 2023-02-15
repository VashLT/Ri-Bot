import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Captcha } from '../../models/captcha.model';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  form: FormGroup;
  captchaForm: FormGroup;
  addingCaptcha = false;
  // inAddCaptchaView = true;
  /** Si está en la vista para seleccionar categoria y tipo de captcha */
  inAddCaptchaView = false;
  /** Si está en la vista para crear un captcha */
  inCreateCaptchaView = false;
  // inCreateCaptchaView = true;
  /** Categoria seleccionada */
  selectedCategory: number;
  captchaInstruction: string;
  captchas: Captcha[] = [
    // {
    //   name: 'Test',
    //   content: '',
    //   instruction: 'Test instruction',
    // },
  ];
  constructor(
    private fb: FormBuilder,
    private db: DatabaseService,
    private router: Router,
    private _snackbar: MatSnackBar
  ) {}

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

  showSuccess(message: string) {
    this._snackbar.open(message, '', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
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
      instruction: this.captchaInstruction,
      content: '',
    });
    this.captchaForm.reset();
    this.addingCaptcha = false;
    this.captchaInstruction = undefined;
    this.selectedCategory = undefined;
    this.inCreateCaptchaView = false;
    this.inAddCaptchaView = false;

    this.showSuccess('Se ha creado el Acertijo exitosamente!');

    console.log('[INFO] Add captcha', {
      captcha: {
        name: this.captchaForm.value.name,
        instruction: this.captchaInstruction,
        content: '',
      },
    });
  }

  saveProject() {
    const projectId = this.db.projects.length + 1;
    this.db.saveProject({
      id: projectId,
      name: this.form.value.projectName,
      description: this.form.value.projectDesc,
      image: this.form.value.projectDesc ?? null,
      captchas: this.captchas,
    });

    console.log('[INFO] Save project', {
      project: {
        name: this.form.value.projectName,
        description: this.form.value.projectDesc,
        image: this.form.value.projectDesc ?? null,
        captchas: this.captchas,
      },
    });

    this.showSuccess('Se ha creado el proyecto exitosamente!');

    this.router.navigateByUrl(`proyecto/${projectId}`);
  }

  cancelProject() {
    this.router.navigateByUrl('');
  }

  updateInstruction() {
    this.captchaInstruction = this.captchaForm.value.instruction;
  }

  selectCategory(categoryId) {
    if (this.selectedCategory === categoryId) {
      this.selectedCategory = undefined;
    } else {
      this.selectedCategory = categoryId;
    }
  }

  test() {
    console.log({
      form: this.form,
      captchaForm: this.captchaForm,
      projects: this.db.projects,
    });

    this.showSuccess('Se ha creado!');
  }
}

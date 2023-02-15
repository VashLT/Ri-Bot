// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-file-chooser',
//   templateUrl: './file-chooser.component.html',
//   styleUrls: ['./file-chooser.component.scss'],
// })
// export class FileChooserComponent {
//   constructor(private fileUploadService: FileUploadService) {}
//   // On file Select
//   onChange(event) {
//     this.file = event.target.files[0];
//   }

//   // OnClick of button Upload
//   onUpload() {
//     this.loading = !this.loading;
//     console.log(this.file);
//     this.fileUploadService.upload(this.file).subscribe((event: any) => {
//       if (typeof event === 'object') {
//         // Short link via api response
//         this.shortLink = event.link;

//         this.loading = false; // Flag variable
//       }
//     });
//   }
// }

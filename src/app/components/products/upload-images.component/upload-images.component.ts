import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-images',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatIconModule],
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent {
  @Output() filesChanged = new EventEmitter<File[]>();
  selectedFiles: File[] = [];
  previewUrls: string[] = [];

  constructor(private cdr: ChangeDetectorRef){}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFiles(input.files);
    }
  }

 processFiles(files: FileList) {
  this.selectedFiles = [];
  this.previewUrls = [];

  Array.from(files).forEach(file => {
    this.selectedFiles.push(file);

    const reader = new FileReader();
    // 👇 Acá va el cambio:
    reader.onload = (e) => {
      // Usamos spread operator para forzar el redibujo en Angular
      this.previewUrls = [...this.previewUrls, e.target?.result as string];
       this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  });

  // Emitimos los archivos seleccionados al padre
  this.filesChanged.emit(this.selectedFiles);
}


  clearSelection() {
    this.selectedFiles = [];
    this.previewUrls = [];
    this.filesChanged.emit([]);

    const input = document.querySelector<HTMLInputElement>('input[type="file"]');
    if (input) input.value = '';
  }
}

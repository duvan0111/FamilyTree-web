import { Component } from '@angular/core';
import { ImageService } from 'src/app/Services/Image/image.service';

@Component({
  selector: 'app-image-selector-one',
  templateUrl: './image-selector-one.component.html',
  styleUrls: ['./image-selector-one.component.css']
})
export class ImageSelectorOneComponent {

  constructor(
    private _imageService: ImageService
  ) { }

  selectedImage: string | ArrayBuffer | null | undefined = undefined;

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this._imageService.selectedFile = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.selectedImage = e.target?.result;
      };

      reader.readAsDataURL(file);

      // save image to imageService
      if (this._imageService.selectedFile) {
        const formData = new FormData();
        formData.append('photo_profil', this._imageService.selectedFile);
        this._imageService.formDateCurrentImage = formData;
      }
    }
  }

  fileBrowseHandler(event: any) {
    console.log(event.target.files);

  }

}

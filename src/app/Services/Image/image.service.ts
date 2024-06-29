import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  selectedImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  formDateCurrentImage!: FormData;
}

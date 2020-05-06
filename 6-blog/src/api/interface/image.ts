import { IImageObjectFormat } from "./image-object-formats";

export interface ImageObject {
    id: string;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {[key: string]: IImageObjectFormat};
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string;
    provider: string;
    provider_metadata: {[key: string]: IImageObjectFormat};
    related: string;
  }
  
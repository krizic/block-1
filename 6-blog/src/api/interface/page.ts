export interface IPage {
  id: string;
  title: string;
  content: string;
  components: ComponentBase[];
  page: string;
  path: string;
  isPublic: boolean;
}

export interface ComponentBase{
    id: number;
    __component: string;
    [key: string]: any
}

interface Component {
  __component: string;
  id: string;
  background: Background;
  title: string;
}

export interface Background {
  id: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: Formats;
  related: string;
}

interface Formats {
}
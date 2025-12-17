export interface Photo {
  id: string;
  file: File;
  dataUrl: string;
  caption: string;
}

export interface ReportInfo {
  title: string;
  client: string;
  date: string;
  projectCode: string;
  notes: string;
}

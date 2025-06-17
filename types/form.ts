export interface FormOption {
  label: string;
  value: string;
}

export interface FormSection {
  editTitle: string;
  options: FormOption[];
}

export interface FormConfig {
  title: string;
  main: FormSection;
  secondary?: FormSection;
}

export interface FormValue {
  main?: string;
  secondary?: string;
} 
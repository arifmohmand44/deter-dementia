export type QuestionType = {
  key: string;
  text: string;
  type: string;
  value?: string | number | null;
  min?: number;
  max?: number;
  options?: string[];
  more?: Array<{
    key: string;
    text: string;
    type: string;
    value?: string | number | null;
    min?: number;
    max?: number;
    options?: string[];
  }>;
};

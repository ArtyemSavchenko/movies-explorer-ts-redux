import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FormHTMLAttributes,
  InputHTMLAttributes,
} from 'react';

export type UIButton = ButtonHTMLAttributes<HTMLButtonElement>;
export type UIAnchor = AnchorHTMLAttributes<HTMLAnchorElement>;
export type UIInput = InputHTMLAttributes<HTMLInputElement>;
export type UIForm = FormHTMLAttributes<HTMLFormElement>;

export type UITextElement = {
  children: string;
  extraClass?: string;
};

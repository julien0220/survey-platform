import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";

export type ComponentInfoTypes = {
  fe_id: string; //
  type: string;
  title: string;
  props: ComponentPropsType;
};

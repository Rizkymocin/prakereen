  import { FieldConfig } from "@/app/components/layouts/DynamicFormFields";
  
  export default function getEmptyFields<T extends object>(
      data: T,
      fields: FieldConfig<T>[]
  ): string[] {
      const empty: string[] = [];

      fields.forEach((field) => {
        if (!field.required) return;

        const value = data[field.key];
        if (
            value === "" ||
            value === null ||
            value === undefined ||
            (typeof value === "number" && value === 0)
        ) {
            empty.push(field.label);
        }
      });

      return empty;
  }
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import type { Dudi } from "@/types";

// Definisi tipe field yang didukung
export type FieldType = 'text' | 'email' | 'number' | 'date' | 'select' | 'textarea';

// Interface untuk konfigurasi field
export interface FieldConfig<T extends object = any> {
  key: Extract<keyof T, string>;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[]; // untuk select
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

// Props untuk komponen
interface DynamicFormFieldsProps {
  data: Record<string, any>;
  fields: FieldConfig[];
  onChange: (key: string, value: string | number) => void;
  className?: string;
}

export default function DynamicFormFields({
  data,
  fields,
  onChange,
  className = "",
}: DynamicFormFieldsProps) {
  
  const renderField = (field: FieldConfig) => {
    const { key, label, type, placeholder, required, options, validation } = field;
    const value = data[key] || '';

    switch (type) {
      case 'select':
        return (
          <Select 
            value={value} 
            onValueChange={(val) => onChange(key, val)}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder || `Pilih ${label}`} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'textarea':
        return (
          <Textarea
            value={value}
            placeholder={placeholder}
            required={required}
            onChange={(e) => onChange(key, e.target.value)}
            rows={4}
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            value={value}
            required={required}
            placeholder={placeholder}
            min={validation?.min}
            max={validation?.max}
            onChange={(e) => onChange(key, parseFloat(e.target.value) || 0)}
          />
        );

      case 'date':
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => onChange(key, e.target.value)}
          />
        );

      case 'email':
        return (
          <Input
            type="email"
            value={value}
            required={required}
            placeholder={placeholder || `Masukkan ${label.toLowerCase()}`}
            onChange={(e) => onChange(key, e.target.value)}
          />
        );

      default: // text
        return (
          <Input
            type="text"
            value={value}
            required={required}
            placeholder={placeholder || `Masukkan ${label.toLowerCase()}`}
            pattern={validation?.pattern}
            onChange={(e) => onChange(key, e.target.value)}
          />
        );
    }
  };

  return (
    <div className={`grid gap-4 py-4 ${className}`}>
      {fields.map((field) => (
        <div key={field.key} className="grid gap-2">
          <Label htmlFor={field.key}>
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          {renderField(field)}
        </div>
      ))}
    </div>
  );
}
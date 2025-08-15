import React from 'react'
import {Controller, FieldValues, Path, Control} from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormField = ({control, name, label, placeholder, type="text"}) => (
    
              <Controller name={name} control = {control} render={({field}) => (
                   <FormItem>
                     <FormLabel className="label">{label}</FormLabel>
                     <FormControl>
                       <Input className="input" placeholder={placeholder} {...field} />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
                
              />
            
            );


export default FormField

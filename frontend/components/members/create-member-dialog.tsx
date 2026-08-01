"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


import {
  Button,
} from "@/components/ui/button";


import {
  MemberForm,
} from "./member-form";



export function CreateMemberDialog(){

return (

<Dialog>

<DialogTrigger asChild>

<Button>
Nuevo socio
</Button>

</DialogTrigger>


<DialogContent>

<DialogHeader>

<DialogTitle>
Crear socio
</DialogTitle>

</DialogHeader>


<MemberForm/>


</DialogContent>


</Dialog>

);

}
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PenLine, Plus } from "lucide-react";

export function EditProject({ id, title, priority, deadline, description } : {id: number; title: string; priority: string; deadline: string; description: string;}) {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button size="icon" type="button" variant="secondary"  className="hover:bg-[#D5DDEE] ">
                < PenLine size={20} className=" group-hover:stroke-[#6D88B0]"/>
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Создать проект</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="project_title">Название</Label>
                <Input required type="text" id="project_title" defaultValue={title} placeholder="Введите название" />
            </div>
            <div className="flex flex-row  ">
                <div className="grid w-full  items-center gap-1.5">
                    <Label htmlFor="project_priority">Приоритет</Label>
                    <Select>  
                        <SelectTrigger className="w-1/2">
                            <SelectValue  defaultValue={priority} placeholder="Приоритет" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="high">Высокий</SelectItem>
                            <SelectItem value="middle">Средний</SelectItem>
                            <SelectItem value="low">Низкий</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="project_deadline">Дедлайн</Label>
                    <Input type="date" value={ new Date(deadline).toISOString().split('T')[0]} placeholder="Дедлайн" className="w-fit" />

                </div>
                
            </div>
            <div className="grid w-full gap-1.5">
                <Label htmlFor="project_description">Описание проекта</Label>
                <Textarea defaultValue={description} placeholder="Введите описание проекта" id="project_description" />
            </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant="outline">Создать</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

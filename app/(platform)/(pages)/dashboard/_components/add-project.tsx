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
import { Plus } from "lucide-react";


const AddProject = () => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button type="button" variant="default" className="sm:px-2 md:gap-2">                    
                <Plus />
                <span className="hidden md:block">
                    Создать проект
                </span>                       
            </Button>
        </DialogTrigger>
        <DialogContent className="border-2 border-primary sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle> Создать проект</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="project_title">Название</Label>
                <Input required type="text" id="project_title" placeholder="Введите название" />
            </div>
            <div className="flex flex-row  ">
                <div className="grid w-full  items-center gap-1.5">
                    <Label htmlFor="project_priority">Приоритет</Label>
                    <Select>
                        <SelectTrigger className="w-1/2">
                            <SelectValue placeholder="Приоритет" />
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
                    <Input type="date" placeholder="Дедлайн" className="w-fit" />

                </div>
                
            </div>
            <div className="grid w-full gap-1.5">
                <Label htmlFor="project_description">Описание проекта</Label>
                <Textarea placeholder="Введите описание проекта" id="project_description" />
            </div>
        </form>
        <DialogFooter>
          <Button type="submit" variant="outline">Создать</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProject;
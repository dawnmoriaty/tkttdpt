import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
}

export const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  onOpenChange,
  onConfirmDelete,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[420px] p-0 rounded-md">
        <DialogHeader className="p-4 border-b border-gray-200">
          <DialogTitle className="text-base font-medium">Xóa sản phẩm</DialogTitle>
        </DialogHeader>
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="mb-4 bg-gray-100 rounded-full p-3">
            <Trash2 size={24} />
          </div>
          <DialogDescription className="text-center text-sm">
            Bạn có chắc muốn xóa sản phẩm này không?
          </DialogDescription>
        </div>
        <DialogFooter className="flex p-4 border-t border-gray-200 justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-1/2 py-3 text-gray-700 border border-gray-300 rounded-[16px] mr-2 hover:bg-gray-50 text-sm bg-white"
          >
            Không
          </Button>
          <Button
            variant="secondary"
            onClick={onConfirmDelete}
            className="w-1/2 py-3 bg-gray-200 text-gray-700 rounded-[16px] ml-2 hover:bg-gray-300 text-sm"
          >
            Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  clsName: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  setOpen,
  clsName,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className={`login-round-box ${clsName}`}>
        <DialogHeader>
          <DialogTitle className="text-4xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

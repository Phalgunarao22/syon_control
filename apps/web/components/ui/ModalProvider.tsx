"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import ConsultationModal from "@/components/ui/ConsultationModal"

interface ModalContextType {
  openModal: () => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
})

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ModalContext.Provider value={{ openModal: () => setIsOpen(true), closeModal: () => setIsOpen(false) }}>
      {children}
      <ConsultationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}

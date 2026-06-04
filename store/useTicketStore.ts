"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialTickets } from "@/data/dummy/tickets";
import type { Ticket } from "@/lib/types";

type TicketInput = Omit<Ticket, "id" | "created_at" | "status">;

interface TicketState {
  tickets: Ticket[];
  addTicket: (data: TicketInput) => void;
  deleteTicket: (id: string) => void;
}

export const useTicketStore = create<TicketState>()(
  persist(
    (set, get) => ({
      tickets: initialTickets,
      addTicket: (data) => {
        const items = get().tickets;
        const num = items.length + 1;
        set({
          tickets: [
            ...items,
            {
              ...data,
              id: `TKT-${String(num).padStart(3, "0")}`,
              status: "Open",
              created_at: new Date().toISOString().split("T")[0],
            },
          ],
        });
      },
      deleteTicket: (id) =>
        set({ tickets: get().tickets.filter((t) => t.id !== id) }),
    }),
    { name: "frogs-tickets" }
  )
);

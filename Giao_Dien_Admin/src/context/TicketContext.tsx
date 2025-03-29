import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ITicket, FormTicket } from "../interface/ticket";
import { addFlight, deleteFlight, getAllFlights, updateFlight } from "../services/ticketService";

type Props = {
    children: React.ReactNode;
};

export const ticketCT = createContext({} as any);

const TicketContext = ({ children }: Props) => {
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const data = await getAllFlights();
                setTickets(data.data);
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        })();
    }, []);

    // Hàm thêm vé
    const onAdd = async (formData: FormTicket) => {
        try {
            const response = await addFlight(formData);

            if (!response || response.error) {
                throw new Error(response?.message || "Không thể thêm vé, vui lòng thử lại!");
            }

            alert("🎉 Thêm vé thành công!");

            // Cập nhật danh sách vé sau khi thêm
            const updatedTickets = await getAllFlights();
            setTickets(updatedTickets.data);
        } catch (error) {
            console.error("❌ Lỗi khi thêm vé:", error);
            alert(`⚠️ Lỗi: ${error.message || "Có lỗi xảy ra khi thêm vé!"}`);
        }
    };

    // Hàm xóa vé
    const onDelete = async (id: number | string) => {
        if (confirm("Bạn chắc chắn muốn xóa vé này?")) {
            try {
                await deleteFlight(id);
                alert("Xóa vé thành công");
                setTickets(tickets.filter((ticket) => ticket.id !== id));
            } catch (error) {
                console.error("Error deleting ticket:", error);
            }
        }
    };

    // Hàm cập nhật vé
    const onUpdate = async (data: FormTicket, id: number | string) => {
        try {
            await updateFlight(data, id);
            alert("Cập nhật vé thành công");
            const updatedTickets = await getAllFlights();
            setTickets(updatedTickets.data);
            navigate("/tickets");
        } catch (error) {
            console.error("Error updating ticket:", error);
        }
    };

    return (
        <ticketCT.Provider value={{ tickets, onAdd, onDelete, onUpdate }}>
            {children}
        </ticketCT.Provider>
    );
};

export default TicketContext;

import { router } from "@inertiajs/react";
import React from "react";

const PopupTodo = ({ todoProps, setShowConfirm }) => {
    const handleDelete = () => {
        router.post(`/todo/delete/${todoProps.id}`, {
            _method: "delete",
            onSuccess: () => {
                setShowConfirm(false);
            },
        });
    };

    return (
        <section className="w-full fixed left-0 top-0 flex flex-col justify-center items-center h-screen">
            <div
                className="w-full fixed bg-black/70 left-0 top-0 h-screen"
                onClick={() => setShowConfirm(false)}
            ></div>
            <div className="bg-white relative rounded-md">
                <header className="border-b py-2 px-6 font-bold text-xl">
                    Confirmation
                </header>
                <div className="p-6">
                    <h4>
                        Apakah kamu yakin mau hapus data{" "}
                        <strong>{todoProps.name}</strong>?
                    </h4>

                    <div className="flex gap-2 mt-2 justify-end items-center">
                        <button
                            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md"
                            onClick={handleDelete}
                        >
                            Ya, Hapus
                        </button>
                        <button
                            className="px-4 py-2 text-sm bg-red-600 text-white rounded-md"
                            onClick={() => setShowConfirm(false)}
                        >
                            Batal
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopupTodo;

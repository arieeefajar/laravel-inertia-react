import AdminLayout from "@/Layouts/AdminLayout";
import { usePage, useForm, router } from "@inertiajs/react";
import React, { useState } from "react";

const Edit = ({ todo }) => {
    const { flash, errors } = usePage().props;
    const { data, setData, post } = useForm({
        name: todo.name,
    });

    const [processing, setProcessing] = useState(false);

    const handleUpadate = (e) => {
        setProcessing(true);
        e.preventDefault();
        router.post(`/todo/edit/${todo.id}`, {
            _method: "patch",
            name: data.name,
        });
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <h2 className="font-semibold text-4xl my-8 text-center">
                    Edit Todo : {todo.name}
                </h2>

                {flash.message && (
                    <div className="py-2 px-4 rounded-md bg-green-300 text-center mb-6">
                        {flash.message}
                    </div>
                )}

                <form onSubmit={handleUpadate}>
                    <div className="mb-6">
                        <div className="flex gap-4 items-center">
                            <input
                                type="text"
                                placeholder="Enter todo here..."
                                className="px-4 py-2 rounded-md grow"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />

                            <button className="py-2 px-4 rounded-md bg-indigo-500 text-white">
                                {processing ? "Updating..." : "Update"}
                            </button>
                        </div>

                        {errors.name && (
                            <p className="text-red-700 text-sm">
                                {errors.name}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default Edit;

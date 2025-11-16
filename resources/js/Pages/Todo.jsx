import Pagination from "@/Components/Pagination";
import PopupTodo from "@/Components/PopupTodo";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsPencilSquare } from "react-icons/bs";
import {
    FaRegTrashAlt,
    FaRegCheckCircle,
    FaRegTimesCircle,
} from "react-icons/fa";

const Todo = ({ todos }) => {
    const { flash, errors } = usePage().props;
    const [showConfirm, setShowConfirm] = useState(false);
    const [todoProps, setTodoProps] = useState({
        id: "",
        name: "",
    });
    const { data, setData, reset } = useForm({
        name: "",
    });

    const storeTodo = (e) => {
        e.preventDefault();
        router.post("/todo", data, {
            onSuccess: () => {
                reset();
            },
        });
    };

    useEffect(() => {
        flash.message && toast.success(flash.message);
    }, [flash]);

    const handleComplete = (id, name, isCompleted) => {
        let title = document.getElementById(id);
        title.innerHTML = "Processing...";
        router.patch(
            `/todo/edit-complete/${id}`,
            {
                is_completed: !isCompleted,
            },
            {
                onSuccess: () => {
                    title.innerHTML = name;
                },
            }
        );
    };

    const handleShowConfirmation = (id, name) => {
        setShowConfirm(true);
        setTodoProps({
            id: id,
            name: name,
        });
    };

    return (
        <>
            <Head title="Todo" />
            <AdminLayout>
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-semibold text-4xl my-8 text-center">
                        Todo App
                    </h2>

                    <form onSubmit={storeTodo}>
                        <div className="mb-6">
                            <div className="flex gap-4 items-center">
                                <input
                                    type="text"
                                    placeholder="Enter todo here..."
                                    className="px-4 py-2 rounded-md grow"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    value={data.name}
                                />

                                <button className="py-2 px-4 rounded-md bg-indigo-500 text-white">
                                    Add
                                </button>
                            </div>

                            {errors.name && (
                                <p className="text-red-700 text-sm">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                    </form>
                    <div className="flex flex-col gap-4">
                        {todos.data.map((todo, i) => (
                            <div
                                key={i}
                                className={`flex justify-between items-center py-3 px-6 ${
                                    todo.is_completed
                                        ? "bg-green-100"
                                        : "bg-red-100"
                                } rounded-md`}
                            >
                                <h3 id={todo.id}>{todo.name}</h3>
                                <div className="flex items-center justify-center gap-2">
                                    {todo.is_completed ? (
                                        <FaRegTimesCircle
                                            className="cursor-pointer text-red-600"
                                            onClick={() =>
                                                handleComplete(
                                                    todo.id,
                                                    todo.name,
                                                    todo.is_completed
                                                )
                                            }
                                        />
                                    ) : (
                                        <FaRegCheckCircle
                                            className="cursor-pointer"
                                            onClick={() =>
                                                handleComplete(
                                                    todo.id,
                                                    todo.name,
                                                    todo.is_completed
                                                )
                                            }
                                        />
                                    )}
                                    <Link href={`/todo/edit/${todo.id}`}>
                                        <BsPencilSquare />
                                    </Link>{" "}
                                    |{" "}
                                    <FaRegTrashAlt
                                        className="cursor-pointer"
                                        onClick={() =>
                                            handleShowConfirmation(
                                                todo.id,
                                                todo.name
                                            )
                                        }
                                    />
                                    {showConfirm && (
                                        <PopupTodo
                                            todoProps={todoProps}
                                            setShowConfirm={setShowConfirm}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex justify-end items-center">
                        <Pagination todos={todos} />
                    </div>
                </div>
            </AdminLayout>
        </>
    );
};

export default Todo;

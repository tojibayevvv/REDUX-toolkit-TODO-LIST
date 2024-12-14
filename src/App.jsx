import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, editData, getData } from "./redux/todo";
import { list } from "postcss";

const App = () => {
  const { data } = useSelector((state) => state.todoSlice);
  const dispatch = useDispatch();

  const [active, setActive] = useState(false);
  const [newValue, setNewValue] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const submit = (e) => {
    dispatch(getData(e));
    console.log(e);
    reset();
  };

  return (
    <div className="w-[90%] mx-auto">
      <form
        className="flex items-start justify-center mt-5 gap-3"
        onSubmit={handleSubmit(submit)}
      >
        <div className="">
          <input
            name="todo"
            {...register("todo", {
              required: "Iltimos shart kiriting!",
            })}
            type="text"
            className="w-[300px] pl-4 h-10"
          />
          {errors.todo && <p className="text-red-800">{errors.todo.message}</p>}
        </div>
        <button>Send</button>
      </form>

      {data.map((value) => (
        <div
          className="mt-8 w-[65%] mx-auto flex justify-between"
          key={value.id}
        >
          {active ? (
            <input
              name="newData"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
          ) : (
            <p>{value.todo}</p>
          )}
          <div className="flex gap-5">
            <button onClick={() => dispatch(deleteData(value.id))}>
              Delete
            </button>
            {active ? (
              <button
                onClick={() => {
                  dispatch(editData({ id: value.id, list: newValue }));
                  setActive(false);
                }}
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setActive(true);
                  setNewValue(value);
                }}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

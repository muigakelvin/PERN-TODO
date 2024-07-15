import React, { Fragment, useState } from "react";

function EditTodos({ todo }) {
  const [description, setDescription] = useState(todo.description);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todo/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      console.log("Todo updated successfully");

      // Optionally, update your state or perform other actions
      // For example, you might have a callback function to update the list of todos
      // updateTodos(); // Assuming you have a function to update todos

      // Close the modal
      const modal = document.getElementById(`id${todo.todo_id}`);
      if (modal) {
        modal.modal("hide"); // Bootstrap modal method to close the modal
      }
    } catch (error) {
      console.error("Error updating todo:", error.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      <div className="modal" id={`id${todo.todo_id}`} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <form onSubmit={handleEdit}>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-warning"
                  data-dismiss="modal"
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EditTodos;

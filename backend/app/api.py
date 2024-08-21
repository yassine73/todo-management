from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Define the CORS origins => the allowed methods and responses ...
origins = [
    "http://localhost:5173",
    "localhost:5173/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

# Get Route
@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"Message": "welcome to FastAPI"}


todos = [
 {
     "id":1,
     "item": "Create Backend"
 },
 {
     "id":2,
     "item": "Create Frontend"
 },
 {
     "id":3,
     "item": "Learn Python"
 },
 {
     "id":4,
     "item": "Learn React"
 },
]

# Get All Todos
@app.get("/todo", tags=["todos"])
async def list_todos():
    return {"todos": todos}



# Create Todo
@app.post("/todo", tags=["todos"])
async def insert_Todo(todo: dict) -> dict:
    todos.append(todo)
    return {"data": "Added!"}


# Update Todo
@app.put("/todo/{_id}", tags=["todos"])
async def update_todo(_id: int, todo: dict) -> dict:
    for Todo in todos:
        if Todo["id"] == _id:
            Todo["item"] = todo["item"]
            return {"data": "updated!"}
    raise HTTPException(status_code=404, detail="Not Found!")

# Get Todo
@app.get("/todo/{_id}", tags=["todos"])
async def show_todo(_id: int):
    for Todo in todos:
        if Todo["id"] == _id:
            return {"todo": Todo}
    raise HTTPException(status_code=404, detail="Not Found!")

# Delete Todo
@app.delete("/todo/{_id}", tags=["todos"])
async def delete_todo(_id: int):
    for Todo in todos:
        if Todo["id"] == _id:
            todos.remove(Todo)
            return {"data": "Deleted!"}
    raise HTTPException(status_code=404, detail="Not Found!")

    